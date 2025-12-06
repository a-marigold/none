/**
 * @param {string} string - text for search
 * @param {string} symbol - symbol as a string, word with which it will be found
 * @param {number} minWordLength - min length for found word
 *
 * @returns First or last word with symbol found in string. Finds word that starts with symbol.
 *
 * **Can return _undefined_**
 *
 * @example
 * ```typescript
 * findBySymbol('$aword Lorem ipsum dolor $lastword', '$') // Output: `@aword`
 * findBySymbol('Lorem ipsum dolor #lastword', '#') // Output: `#lastword`
 * ```
 */

export function findBySymbol(
    string: string,
    symbol: string,
    minWordLength: number = 0
): string | undefined {
    const firstWord = string.split(' ').filter(Boolean)[0];

    const lastWord = string.split(' ').filter(Boolean).at(-1);

    if (firstWord?.startsWith(symbol) && firstWord.length > minWordLength) {
        return firstWord;
    } else if (
        lastWord?.startsWith(symbol) &&
        lastWord.length > minWordLength
    ) {
        return lastWord;
    }
}
