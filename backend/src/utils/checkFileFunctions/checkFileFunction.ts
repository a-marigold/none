import type { MultipartFile } from '@fastify/multipart';

export async function checkFileSize(file: MultipartFile) {
    let size = 0;
    for await (const chunk of file.file) {
        size += chunk.length;
    }

    return size;
}
