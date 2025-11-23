import type { ZodType } from 'zod';

import {
    StreamMessageSchema,
    StreamErrorDataSchema,
    MessageSchema,
} from '@none/shared';
import type { StreamMessage } from '@none/shared';

export function validateStreamMessage(
    message: object
): message is StreamMessage {
    const parseMessage = StreamMessageSchema.safeParse(message);

    return parseMessage.success;
}

export function validateStreamData<T extends object>(
    data: object,

    schema: ZodType<T>
): data is T {
    const parseData = schema.safeParse(data);

    return parseData.success;
}

export function validateStreamError(data: object) {
    return validateStreamData(data, StreamErrorDataSchema);
}

export function validateChatMessage(data: object) {
    return validateStreamData(data, MessageSchema);
}
