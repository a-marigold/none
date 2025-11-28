import { boolean, object, string, infer as zInfer } from 'zod';

//

export const AuthorizeQuerySchema = object({
    message: string(),
});

export const AuthorizeResponseSchema = object({
    connectionId: string(),

    incognito: boolean(),
});

export type AuthorizeQuery = zInfer<typeof AuthorizeQuerySchema>;

export type AuthorizeResponse = zInfer<typeof AuthorizeResponseSchema>;
