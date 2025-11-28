import { validateStreamMessage, validateStreamData } from '@none/shared';

import type {
    StreamMessage,
    StreamErrorData,
    StreamType,
    StreamMap,
} from '@none/shared';

type ListenerCallback<T extends StreamType> = (data: StreamMap[T]) => void;

type Listener<T extends StreamType = StreamType> = {
    [K in T]: {
        type: K;

        callback: ListenerCallback<K>;
    };
}[T];
class Stream {
    #socket: WebSocket | null = null;

    #listeners: Listener[] = [];

    #listenMessage = (event: MessageEvent) => {
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
                    // @ts-expect-error - TS cannot infer this due to runtime narrowing

                    listener.callback(incomingMessage.data);
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log('__SERVER_STREAM_ERROR__:  ', error.message);
            }
        }
    };

    open(url: string) {
        this.#socket = new WebSocket(url);

        this.#socket.onopen = () => {
            const initialMessage: StreamMessage = {
                type: 'authorizeQuery',

                data: { message: 'authorize' },
            };

            this.#socket?.send(JSON.stringify(initialMessage));
        };

        this.#socket.addEventListener('message', this.#listenMessage);

        this.#socket.addEventListener('close', () => {
            this.#socket?.removeEventListener('message', this.#listenMessage);
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

        callback: ListenerCallback<T>
    ) {
        if (!this.#socket) return;

        // @ts-expect-error - TS cannot infer callback type
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
