import { object, string, infer as zInfer } from 'zod';

export const SearchQuerySchema = object({ query: string() });

export type SearchQuery = zInfer<typeof SearchQuerySchema>;
