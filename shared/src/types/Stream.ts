import { object, record, string, any, literal, infer as zinfer } from 'zod';

const StreamTypeSchema = literal([
    'newChatMessage',

    'editMessage',

    'deleteMessage',

    'error',

    'initial',

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

export type StreamType = zinfer<typeof StreamTypeSchema>;

export type StreamMessage<T extends object = Record<string, any>> = Omit<
    zinfer<typeof StreamMessageSchema>,
    'data'
> & { data: T };

export type StreamErrorData = zinfer<typeof StreamErrorDataSchema>;
