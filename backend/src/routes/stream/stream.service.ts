import type { ZodType } from 'zod';

import {
    StreamMessageSchema,
    SearchQuerySchema,
    MessageSchema,
} from '@none/shared';
import type { StreamMessage, StreamErrorData } from '@none/shared';

export function validateStreamMessage(data: object): data is StreamMessage {
    return StreamMessageSchema.safeParse(data).success;
}

export function validateStreamData<T extends object>(
    data: object,
    schema: ZodType<T>
): data is T {
    return schema.safeParse(data).success;
}

export function validateChatMessage(data: object) {
    return validateStreamData(data, MessageSchema);
}

export function validateSearchQuery(data: object) {
    return validateStreamData(data, SearchQuerySchema);
}

/**
 * @param {string} message - a message that will be passed in errorMessage.data.message. That is optional.
 *
 * @returns Stringified error message.
 *
 * @example
 * ```typescript
 * createBaseError(); // JSON string output: "{"type":"error","data":{"message":"You have send invalid message."}}"
 *
 * createBaseError('Hello World!'); // JSON string outpur: "{"type":"error","data":{"message":"Hello World!"}}"
 * ```
 */
export function createBaseError(message: string) {
    const errorMessage: StreamMessage<StreamErrorData> = {
        type: 'error',

        data: {
            message,
        },
    };

    return JSON.stringify(errorMessage);
}

export function searchManyUsers(query: string) {}

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
export function createStreamMessage<T extends StreamMessage['data']>(
    type: StreamMessage['type'],
    data: T
) {
    const streamMessage: StreamMessage = {
        type,
        data,
    };

    return JSON.stringify(streamMessage);
}

export const baseError = createBaseError('You have sent invalid message.');
