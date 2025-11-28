import { validateStreamMessage, validateStreamData } from '@none/shared';

import type {
    StreamMessage,
    StreamErrorData,
    StreamType,
    StreamMap,
} from '@none/shared';

type Listener<T extends StreamType = StreamType> = {
    [K in T]: {
        type: K;
        callback: (data: StreamMap[K]) => void;
    };
}[T];
class Stream {
    #socket: WebSocket | null = null;

    #listeners: Listener[] = [];

    #listenMessage(event: MessageEvent) {
        try {
            const incomingMessage = JSON.parse(event.data);

            if (!validateStreamMessage(incomingMessage)) {
                throw new Error('Server has sent an invalid message');
            }

            this.#listeners.forEach((listener) => {
                if (
                    listener.type === incomingMessage.type &&
                    validateStreamData(listener.type, incomingMessage.data)
                ) {
                    listener.callback(incomingMessage.data);
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log('__SERVER_STREAM_ERROR__:  ', error.message);
            }
        }
    }

    open(url: string) {
        this.#socket = new WebSocket(url);

        this.#socket.onopen = () => {
            const initialMessage: StreamMessage = {
                type: 'authorizeQuery',

                data: { message: 'authorize' },
            };

            this.#socket?.send(JSON.stringify(initialMessage));
        };

        this.#socket.addEventListener(
            'message',
            this.#listenMessage.bind(this)
        );

        this.#socket.addEventListener('close', () => {
            this.#socket?.removeEventListener(
                'message',
                this.#listenMessage.bind(this)
            );
        });
    }

    close() {
        if (!this.#socket) return;

        this.#socket.close();
    }

    send<T extends StreamType>(type: T, data: StreamMap[T]) {
        if (!this.#socket) return;

        const prepareData: StreamMessage = { type, data };

        this.#socket.send(JSON.stringify(prepareData));
    }

    onmessage<T extends StreamType>(
        type: T,

        callback: (data: StreamMap[T]) => void
    ) {
        if (!this.#socket) return;

        this.#listeners.push({ type, callback });
    }

    onerror(callback: (data: StreamErrorData) => void) {
        if (!this.#socket) return;

        this.onmessage('error', (data) => {
            try {
                if (!validateStreamData('error', data)) {
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
