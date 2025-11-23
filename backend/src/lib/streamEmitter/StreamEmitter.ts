import type WebSocket from 'ws';

import { validateStreamMessage, baseError } from '@/routes/stream';

// !
import { createBaseError } from '@/routes/stream';

import type { StreamType, StreamMessage } from '@none/shared';

interface Listener {
    type: StreamType;
    callback: (data: StreamMessage['data'], send: WebSocket['send']) => void;
}

class StreamEmitter {
    #listeners: Listener[] = [];

    initialize(connection: WebSocket) {
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
                        listener.callback(parseData.data, connection.send);
                    }
                });
            } catch {
                return connection.send(createBaseError('json error'));
            }
        });
    }

    on(type: Listener['type'], callback: Listener['callback']) {
        this.#listeners.push({ type, callback });
    }
}

export const streamEmitter = new StreamEmitter();
