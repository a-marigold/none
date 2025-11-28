import type { ZodType } from 'zod';

import { StreamErrorDataSchema, StreamDataSchema } from './Stream';
import { MessageSchema } from '../Chat';
import { SearchUsersQuerySchema, SearchUserDataSchema } from './SearchUsers';
import { AuthorizeQuerySchema, AuthorizeResponseSchema } from './Authorize';

import type { StreamErrorData } from './Stream';
import type { Message } from '../Chat';
import type { SearchUserData, SearchUsersQuery } from './SearchUsers';
import type { AuthorizeQuery, AuthorizeResponse } from './Authorize';

export type StreamMap = {
    newChatMessage: Message;

    editMessage: unknown;

    deleteMessage: unknown;

    error: StreamErrorData;

    authorizeQuery: AuthorizeQuery;
    authorizeResponse: AuthorizeResponse;

    searchUsersQuery: SearchUsersQuery;
    searchUsersResponse: SearchUserData;
};
export type StreamType = keyof StreamMap;

export const StreamSchemasMap: Record<StreamType, ZodType> = {
    newChatMessage: MessageSchema,
    editMessage: StreamDataSchema,
    deleteMessage: StreamDataSchema,

    error: StreamErrorDataSchema,

    authorizeQuery: AuthorizeQuerySchema,
    authorizeResponse: AuthorizeResponseSchema,

    searchUsersQuery: SearchUsersQuerySchema,
    searchUsersResponse: SearchUserDataSchema,
};
