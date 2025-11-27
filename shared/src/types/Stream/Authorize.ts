import { boolean, object, string, infer as zInfer } from 'zod';

//

const AuthorizeQuerySchema = object({
    message: string(),
});

const AuthorizeResponseSchema = object({
    connectionId: string(),

    incognito: boolean(),
});

export type AuthorizeQuery = zInfer<typeof AuthorizeQuerySchema>;

export type AuthorizeResponse = zInfer<typeof AuthorizeResponseSchema>;
