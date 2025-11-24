import { array, object, string, infer as zInfer } from 'zod';

import { SafeUserSchema } from './User';

export const SearchQuerySchema = object({ query: string() });

export const SearchUserSchema = SafeUserSchema.pick({
    userName: true,
    fullName: true,
    avatar: true,
});
export const SearchUserListSchema = array(SearchUserSchema);

export type SearchQuery = zInfer<typeof SearchQuerySchema>;

export type SearchUser = zInfer<typeof SearchUserSchema>;
