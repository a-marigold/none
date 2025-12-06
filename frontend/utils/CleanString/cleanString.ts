/**
 * Cleans found first or last word with symbol in string and returns cleaned string.
 *
 * @param {string} symbol
 * @param {string} string
 *
 * @returns
 * String without word that was with symbol.
 *
 * @example
 * ```typescript
 * cleanString('@', '@hello Some string and letters'); // Output: 'Some string and letters'
 *
 *
 *
 * cleanString('#', 'Some string and letters #Hello'); // Output: 'Some string and letters'
 *
 *
 *
 * ```
 */

export function cleanString(symbol: string, string: string): string {
    const words = string.trim().split(' ');

    if (words[0].startsWith(symbol)) {
        return words.slice(1).filter(Boolean).join(' ');
    } else if (words[words.length - 1].startsWith(symbol)) {
        return words
            .slice(0, words.length - 1)

            .filter(Boolean)
            .join(' ');
    }

    return string;
}
