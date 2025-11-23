type PreparePrismaData<T> = T extends null
    ? undefined
    : T extends (infer U)[]
    ? PreparePrismaData<U>[]
    : T extends object
    ? { [K in keyof T]: PreparePrismaData<T[K]> }
    : T extends bigint
    ? number
    : T;

/**
 * Prepares prisma data to javascript usage.
 * Converts every `null` to `undefined` and every `bigint` to `number`.
 *
 * @param {unknown} value - data from prisma to prepare.
 *
 *
 * @returns prepared data without `null` and without `bigint`
 *
 *
 */
export function preparePrismaData<T>(value: T): PreparePrismaData<T> {
    if (value === null) return undefined as PreparePrismaData<T>;

    if (Array.isArray(value)) {
        return value.map((item) =>
            preparePrismaData(item)
        ) as PreparePrismaData<T>;
    }

    if (typeof value === 'bigint') {
        return Number(value) as PreparePrismaData<T>;
    }
    if (typeof value === 'object') {
        const result: Record<string, any> = {};

        for (const key in value) {
            result[key] = preparePrismaData(value[key]);
        }

        return result as PreparePrismaData<T>;
    }

    return value as PreparePrismaData<T>;
}
