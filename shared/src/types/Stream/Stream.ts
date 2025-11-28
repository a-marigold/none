import {
    object,
    record,
    string,
    any,
    literal,
    unknown,
    infer as zinfer,
} from 'zod';

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

export const StreamMessageSchema = object({
    type: StreamTypeSchema,

    data: unknown(),
});

export const StreamErrorDataSchema = object({
    message: string(),
});

export type StreamMessage = zinfer<typeof StreamMessageSchema>;

export type StreamErrorData = zinfer<typeof StreamErrorDataSchema>;
