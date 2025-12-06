import { describe, it, expect } from 'vitest';

import { cleanString } from './cleanString';

describe('cleanString', () => {
    it('should make nothing if the string does not contain the symbol', () => {
        const testString = 'Some string without symbol';

        expect(cleanString('@', testString)).toBe(testString);
    });

    it('should make nothing if the string contains the symbol in the middle and not in the end or beginning', () => {
        const testString = 'Some with @symbol in the middle';

        expect(cleanString('@', testString)).toBe(testString);
    });

    it('should return new string without only first word if the first and the last words both contain symbol', () => {
        const testString = '@firstWord Some string @lastWord ';

        expect(cleanString('@', testString)).toBe('Some string @lastWord');
    });
});
