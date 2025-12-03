import cloudinary from '@/plugins/cloudinary';
import type { MultipartFile } from '@fastify/multipart';
import type { UploadApiResponse } from 'cloudinary';

import { ApiError } from '@none/shared';

import { CLOUDINARY_FOLDER_NAME } from '@/constants/cloudinaryFolderName';

export async function uploadImage(
    file: MultipartFile
): Promise<UploadApiResponse | undefined | never> {
    const buffer = await file.toBuffer();
    return new Promise((resolve) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: CLOUDINARY_FOLDER_NAME,
            },
            (error, result) => {
                if (error) {
                    throw new ApiError('Error with uploading image', 500);
                }
                resolve(result);
            }
        );

        stream.end(buffer);
    });
}
