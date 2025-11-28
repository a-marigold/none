import { StreamMessageSchema, StreamSchemasMap } from '../types/Stream';

import type { StreamMessage, StreamType, StreamMap } from '../types/Stream';

export function validateStreamMessage(
    message: unknown
): message is StreamMessage {
    return StreamMessageSchema.safeParse(message).success;
}

export function validateStreamData<T extends StreamType>(
    type: T,

    data: unknown
): data is StreamMap[T] {
    return StreamSchemasMap[type].safeParse(data).success;
}
