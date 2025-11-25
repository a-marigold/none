import type { FastifyRequest } from 'fastify';
import type WebSocket from 'ws';

import { validateStreamMessage, baseError } from '@/routes/stream';

import type { StreamType, StreamMessage } from '@none/shared';

type ServerContext = Pick<FastifyRequest['server'], 'prisma' | 'userTrie'>;

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

    initialize(connection: WebSocket, request: FastifyRequest) {
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

    on(type: Listener['type'], callback: Listener['callback']) {
        this.#listeners.push({ type, callback });
    }
}

export const streamEmitter = new StreamEmitter();
