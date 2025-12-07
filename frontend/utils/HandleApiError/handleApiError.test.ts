import { describe, it, expect } from 'vitest';

import { ApiError } from '@none/shared';
import type { ApiResponse } from '@none/shared';

import { handleApiError } from './handleApiError';

describe('handleApiError', () => {
    it('should not throw an error if the response is good', async () => {
        const testResponse = { ok: true } as Response;

        const handleError = handleApiError(testResponse);

        await expect(handleError).resolves.toBeUndefined();
    });
    it('should throw an error if the response is not ok', async () => {
        const testResponse = {
            ok: false,
            json: () =>
                Promise.resolve({
                    code: 502,
                    message: 'Bad Gateway',
                } as ApiResponse),
        } as Response;

        const handleError = handleApiError(testResponse);

        await expect(handleError).rejects.toThrowError('Bad Gateway');
    });
});
