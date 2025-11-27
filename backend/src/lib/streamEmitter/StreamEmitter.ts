import type { FastifyRequest } from 'fastify';
import type WebSocket from 'ws';
import type { JWT, FastifyJWT } from '@fastify/jwt';

import {
    validateStreamMessage,
    baseError,
    createStreamMessage,
} from '@/routes/stream';

import type { Cookies } from '@none/shared';

import type {
    StreamType,
    StreamMessage,
    SafeUser,
    AuthorizeResponse,
} from '@none/shared';

type ServerContext = Pick<FastifyRequest['server'], 'prisma' | 'userTrie'>;

interface Listener {
    type: StreamType;

    callback: (connection: {
        data: StreamMessage['data'];
        send: WebSocket['send'];
        server: ServerContext;
    }) => void;
}

type StreamUser = Pick<SafeUser, 'userName'> & {
    incognito: boolean;
    connection: WebSocket;
};

class StreamEmitter {
    #listeners: Listener[] = [];

    users: Map<string, StreamUser> = new Map();

    #authorizeUser(
        connection: WebSocket,
        jwt: JWT,
        accessToken: string | undefined
    ): void {
        const authorizeIncognito = () => {
            const userName = crypto.randomUUID();

            const connectionId = crypto.randomUUID();

            this.users.set(connectionId, {
                userName,
                incognito: true,
                connection,
            });

            const streamMessage = createStreamMessage<AuthorizeResponse>(
                'authorizeResponse',
                { connectionId, incognito: true }
            );

            return connection.send(streamMessage);
        };

        if (!accessToken) {
            return authorizeIncognito();
        }

        try {
            const user: FastifyJWT['payload'] = jwt.verify(accessToken);
            const connectionId = crypto.randomUUID();

            const streamMessage = createStreamMessage<AuthorizeResponse>(
                'authorizeResponse',

                { connectionId, incognito: false }
            );

            return connection.send(streamMessage);
        } catch {
            return authorizeIncognito();
        }
    }

    initialize(connection: WebSocket, request: FastifyRequest): void {
        const cookies = request.cookies as Cookies;

        const accessToken = cookies.accessToken;

        this.#authorizeUser(connection, request.server.jwt, accessToken);

        request.server.jwt.verify;

        const serverContext: ServerContext = {
            prisma: request.server.prisma,
            userTrie: request.server.userTrie,
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
            } catch (error) {
                return connection.send(baseError);
            }
        });
    }

    on(type: Listener['type'], callback: Listener['callback']): void {
        this.#listeners.push({ type, callback });
    }
}

export const streamEmitter = new StreamEmitter();
