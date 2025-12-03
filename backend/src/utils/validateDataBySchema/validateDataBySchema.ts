import type { ZodType } from 'zod';

/**
 * Validates `data` by zod `schema`. Uses safeParse.
 *
 * @param {unknown} data - Data to check.
 * @param {ZodType} schema - Schema that will parse the `data`.
 *
 * @returns
 * Assertion that `data` satisfies the type in `schema`
 */
export function validateDataBySchema<T>(
    data: unknown,
    schema: ZodType<T>
): data is T {
    return schema.safeParse(data).success;
}
