import type { FastifyRequest } from 'fastify';
import type WebSocket from 'ws';
import type { JWT, FastifyJWT } from '@fastify/jwt';

import { validateStreamMessage } from '@none/shared';
import type { StreamType, StreamMessage, SafeUser } from '@none/shared';

import { baseError, createStreamMessage } from '@/routes/stream';

import type { Cookies } from '@none/shared';

type StreamUser = Pick<SafeUser, 'userName'> & {
    incognito: boolean;
    connection: WebSocket;
};
type ServerContext =
    | Pick<FastifyRequest['server'], 'prisma' | 'userTrie'> & {
          connections: Map<string, StreamUser>;
      };

interface Listener {
    type: StreamType;

    callback: (connection: {
        data: StreamMessage['data'];
        send: WebSocket['send'];
        server: ServerContext;
    }) => void;
}

class StreamEmitter {
    #listeners: Listener[] = [];

    #connections: Map<string, StreamUser> = new Map();

    #authorizeUser(
        connection: WebSocket,
        jwt: JWT,
        accessToken: string | undefined
    ): void {
        const authorizeIncognito = () => {
            const userName = crypto.randomUUID();

            const connectionId = crypto.randomUUID();

            this.#connections.set(connectionId, {
                userName,
                incognito: true,
                connection,
            });

            const streamMessage = createStreamMessage('authorizeResponse', {
                connectionId,
                incognito: true,
            });

            return connection.send(streamMessage);
        };

        if (!accessToken) {
            return authorizeIncognito();
        }

        try {
            const user: FastifyJWT['payload'] = jwt.verify(accessToken);
            const connectionId = crypto.randomUUID();

            this.#connections.set(connectionId, {
                userName: user.userName,

                connection: connection,
                incognito: false,
            });

            const streamMessage = createStreamMessage('authorizeResponse', {
                connectionId,
                incognito: false,
            });

            return connection.send(streamMessage);
        } catch {
            return authorizeIncognito();
        }
    }

    initialize(connection: WebSocket, request: FastifyRequest): void {
        const cookies = request.cookies as Cookies;
        const accessToken = cookies.accessToken;

        this.#authorizeUser(connection, request.server.jwt, accessToken);

        const serverContext: ServerContext = {
            prisma: request.server.prisma,
            userTrie: request.server.userTrie,

            connections: this.#connections,
        };

        connection.on('message', (data) => {
            try {
                const parseData = JSON.parse(data.toString());

                if (!validateStreamMessage(parseData)) {
                    return connection.send(baseError);
                }

                this.#listeners.forEach((listener) => {
                    if (listener.type === parseData.type) {
                        listener.callback({
                            data: parseData.data,
                            send: connection.send.bind(connection),
                            server: serverContext,
                        });
                    }
                });
            } catch {
                return connection.send(baseError);
            }
        });
    }

    on(type: Listener['type'], callback: Listener['callback']): void {
        this.#listeners.push({ type, callback });
    }
}

export const streamEmitter = new StreamEmitter();
