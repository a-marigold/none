import { describe, it, expect } from 'vitest';

import { getApiOrigin } from './getApiOrigin';

describe('getApiOrigin', () => {
    const testEnvOrigin = 'https://server.domain.com/';

    const testLocalOrigin = 'https://localhost:3000/';

    it('should return the local origin if the env origin is not defined', () => {
        expect(getApiOrigin(undefined, testLocalOrigin)).toBe(testLocalOrigin);
    });

    it('should return the env origin without leading slash if it is defined', () => {
        expect(getApiOrigin(testEnvOrigin, testLocalOrigin)).toBe(
            testEnvOrigin.slice(0, -1)
        );
    });
});
