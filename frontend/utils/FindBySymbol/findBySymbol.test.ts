import { describe, it, expect } from 'vitest';

import { findBySymbol } from './findBySymbol';

describe('findBySymbol', () => {
    it('should return undefined if there is not a word with the symbol in string', () => {
        const testString = 'hello, lorem';

        expect(findBySymbol(testString, '@')).toBeUndefined();
    });

    it('should return undefined if there is a word with the symbol in string, but the word is less that `minWordLength` agrument', () => {
        const testString = '#wo 10, 112, #sds like hello';

        expect(findBySymbol(testString, '#', 3)).toBeUndefined();
    });

    it('should return the first word of string even there is many words with the symbol', () => {
        const testString =
            '&hello? How are you? Do you hear me? &No.. &i do not exist';
        expect(findBySymbol(testString, '&')).toBe('&hello?');
    });
});
