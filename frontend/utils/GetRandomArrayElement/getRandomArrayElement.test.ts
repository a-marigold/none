import { vi, describe, it, expect, afterEach } from 'vitest';

import { getRandomArrayElement } from './getRandomArrayElement';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('getRandomArrayElement', () => {
    const testArray = [6, 10, 16];

    it('should return the first element if Math.random returns 0', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0);

        expect(getRandomArrayElement(testArray)).toBe(6);
    });

    it('should return the last element if Math.random returns 0.999', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.999);

        expect(getRandomArrayElement(testArray)).toBe(16);
    });
    it('should return nothing if an array is empty', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.6);

        expect(getRandomArrayElement([])).toBeUndefined();
    });
});
