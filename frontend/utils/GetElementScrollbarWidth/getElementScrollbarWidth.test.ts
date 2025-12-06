import { describe, it, expect } from 'vitest';

import { getElementScrollbarWidth } from './getElementScrollbarWidth';

describe('getElementScrollbarWidth', () => {
    it('should return 0 if width of the element equals 0', () => {
        const element = { offsetWidth: 0, clientWidth: 0 } as HTMLElement;

        expect(getElementScrollbarWidth(element)).toBe(0);
    });

    it('should return an accurate difference between offsetWidth and clientWidth of the element', () => {
        const element = { offsetWidth: 120, clientWidth: 100 } as HTMLElement;

        expect(getElementScrollbarWidth(element)).toBe(20);
    });

    it('should return 0 if offsetWidth and clientWidth of the element equal', () => {
        const element = { offsetWidth: 160, clientWidth: 160 } as HTMLElement;

        expect(getElementScrollbarWidth(element)).toBe(0);
    });
});
