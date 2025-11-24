import type { FastifyRequest } from 'fastify';
import type WebSocket from 'ws';

import { validateStreamMessage, baseError } from '@/routes/stream';

// !
import { createBaseError } from '@/routes/stream';

import type { StreamType, StreamMessage } from '@none/shared';

interface Listener {
    type: StreamType;
    callback: (connection: {
        data: StreamMessage['data'];
        send: WebSocket['send'];
        request: FastifyRequest;
    }) => void;
}

class StreamEmitter {
    #listeners: Listener[] = [];

    initialize(connection: WebSocket, request: FastifyRequest) {
        connection.on('message', (data) => {
            try {
                const parseData = JSON.parse(data.toString());

                if (!validateStreamMessage(parseData)) {
                    return connection.send(
                        createBaseError('stream message error')
                    );
                }

                this.#listeners.forEach((listener) => {
                    if (listener.type === parseData.type) {
                        listener.callback({
                            data: parseData.data,
                            send: connection.send,
                            request,
                        });
                    }
                });
            } catch (error) {
                return connection.send(
                    createBaseError(`Error: ${error}  'json error';
                        Received data: ${data}`)
                );
            }
        });
    }

    on(type: Listener['type'], callback: Listener['callback']) {
        this.#listeners.push({ type, callback });
    }
}

export const streamEmitter = new StreamEmitter();
