import { array, object, string, infer as zInfer } from 'zod';

import { SafeUserSchema } from '../User';

export const SearchUsersQuerySchema = object({ query: string() });

export const SearchUserSchema = SafeUserSchema.pick({
    userName: true,
    fullName: true,
    avatar: true,
});
export const SearchUserDataSchema = object({ users: array(SearchUserSchema) });

export type SearchUsersQuery = zInfer<typeof SearchUsersQuerySchema>;

export type SearchUser = zInfer<typeof SearchUserSchema>;

export type SearchUserData = zInfer<typeof SearchUserDataSchema>;
