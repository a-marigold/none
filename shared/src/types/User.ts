import { boolean, object, string, infer as zinfer } from 'zod';

export const UserSchema = object({
    fullName: string(),
    userName: string(),
    avatar: string().optional(),

    public: boolean().optional(),

    email: string().optional(),
    password: string(),
});

export type User = zinfer<typeof UserSchema>;

export const SafeUserSchema = UserSchema.omit({ password: true });

export type SafeUser = zinfer<typeof SafeUserSchema>;
