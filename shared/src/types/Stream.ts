import {
    object,
    record,
    string,
    any,
    enum as zenum,
    literal,
    infer as zinfer,
} from 'zod';

const StreamTypeSchema = zenum([
    'newChatMessage',
    'editMessage',

    'deleteMessage',

    'error',

    'initial',

    'searchUsers',
]);

export const StreamMessageSchema = object({
    type: StreamTypeSchema,

    data: record(string(), any()),
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
