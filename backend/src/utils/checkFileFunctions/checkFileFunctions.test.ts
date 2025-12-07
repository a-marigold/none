import { vi, describe, it, expect } from 'bun:test';

import type { MultipartFile } from '@fastify/multipart';

import { checkFileSize } from './checkFileFunction';
function createMockFile(chunks: (Buffer | Uint8Array)[]) {
    return {
        file: {
            async *[Symbol.asyncIterator]() {
                for (const chunk of chunks) {
                    await new Promise((resolve) => setTimeout(resolve, 1));
                    yield chunk;
                }
            },
        },
    } as MultipartFile;
}

describe('checkFileSize', () => {
    it('should sum of bytes correctly', async () => {
        const testFile = createMockFile([
            Buffer.from([12]),
            Buffer.from([12]),
            Buffer.from([12]),
            Buffer.from([12]),
            Buffer.from([12]),
            Buffer.from([12]),
        ]);

        await expect(checkFileSize(testFile)).resolves.toBe(6);
    });

    it('should return 0 if the buffer is empty', async () => {
        const testFile = createMockFile([]);

        await expect(checkFileSize(testFile)).resolves.toBe(0);
    });
});
