import {
    validateStreamError,
    validateStreamMessage,
} from '@/utils/StreamHelpers';

import type { StreamMessage, StreamErrorData } from '@none/shared';

class Stream {
    #socket: WebSocket | null = null;

    open(url: string) {
        this.#socket = new WebSocket(url);

        this.#socket.onopen = () => {
            const initialMessage: StreamMessage = {
                type: 'initial',

                data: { message: 'initial' },
            };

            this.#socket?.send(JSON.stringify(initialMessage));
        };
    }

    close() {
        if (!this.#socket) return;

        this.#socket.close();
    }

    send<T extends object>(type: StreamMessage['type'], data: T) {
        if (!this.#socket) return;

        const prepareData: StreamMessage = { type, data };

        this.#socket.send(JSON.stringify(prepareData));
    }

    onmessage(
        type: StreamMessage['type'],

        callback: (data: StreamMessage['data']) => void
    ) {
        if (!this.#socket) return;

        this.#socket.addEventListener('message', (event) => {
            try {
                const parseData = JSON.parse(event.data);

                if (!validateStreamMessage(parseData)) {
                    throw new Error('Server has sent an invalid message.'); // TODO: add separated error constructor
                }

                if (type === parseData.type) {
                    callback(parseData.data);
                }
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message); // TODO: Temporarily
                }
            }
        });
    }

    onerror(callback: (data: StreamErrorData) => void) {
        if (!this.#socket) return;

        this.onmessage('error', (data) => {
            try {
                if (!validateStreamError(data)) {
                    throw new Error('Unexpceted server error');
                }

                callback(data);
            } catch (error) {
                if (error instanceof Error) {
                }
            }
        });
    }
}

export const stream = new Stream();
