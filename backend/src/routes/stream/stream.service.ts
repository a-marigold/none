import type {
    StreamMessage,
    StreamErrorData,
    StreamType,
    StreamMap,
} from '@none/shared';

/**
 * @param {string} message - a message that will be passed in errorMessage.data.message. That is optional.
 *
 * @returns Stringified error message.
 *
 * @example
 * ```typescript
 *
 *
 * createBaseError({message: 'Hello World!'}); // JSON string outpur: "{"type":"error","data":{"message":"Hello World!"}}"
 * ```
 */
export function createBaseError(data: StreamErrorData) {
    const errorMessage: StreamMessage = {
        type: 'error',

        data,
    };

    return JSON.stringify(errorMessage);
}

/**
 * @param {string} message - a message that will be passed in errorMessage.data.message. That is optional.
 *
 * @returns Stringified stream message.
 *
 * @example
 * ```typescript
 * createStreamMessage('newChatMessage', { sender: 'me', chatId: '1016182123', data: 'Hello to you' }); // Output: "{"type":"error","data":{...}}"
 * ```
 */
export function createStreamMessage<T extends StreamType>(
    type: T,
    data: StreamMap[T]
) {
    const streamMessage: StreamMessage = {
        type,

        data,
    };

    return JSON.stringify(streamMessage);
}

export const baseError = createBaseError({
    message: 'You have sent invalid message.',
});
