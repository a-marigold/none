import { object, record, string, any, literal, infer as zinfer } from 'zod';

import type { StreamType, StreamMap } from './StreamMap';

const StreamTypeSchema = literal<StreamType[]>([
    'newChatMessage',

    'editMessage',

    'deleteMessage',

    'error',

    'authorizeQuery',
    'authorizeResponse',

    'searchUsersQuery',
    'searchUsersResponse',
]);

export const StreamDataSchema = record(string(), any());

export const StreamMessageSchema = object({
    type: StreamTypeSchema,

    data: StreamDataSchema,
});

export const StreamErrorDataSchema = object({
    message: string(),
});

export type StreamMessage<T extends StreamType> = Omit<
    zinfer<typeof StreamMessageSchema>,
    'data'
> & {
    data: StreamMap[T];
};

export type StreamErrorData = zinfer<typeof StreamErrorDataSchema>;
