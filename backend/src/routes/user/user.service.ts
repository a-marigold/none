import type { FastifyRequest } from 'fastify';
import type { PrismaClient } from '@/generated/prisma/client/client';
import type { MultipartFile } from '@fastify/multipart';

import { ApiError } from '@none/shared';

import { UpdateUserSchema } from '@none/shared';
import type { SafeUser, UpdateUser } from '@none/shared';

import { preparePrismaData } from '@/utils/preparePrismaData';
import { validateDataBySchema } from '@/utils/validateDataBySchema';
import { checkFileSize } from '@/utils/checkFileFunctions';

export async function validateUserDataFromParts(
    parts: FastifyRequest['parts']
): Promise<Partial<UpdateUser> & { avatarFile?: MultipartFile }> {
    let avatarFile: MultipartFile | undefined = undefined;

    let userData: UpdateUser | undefined = undefined;

    for await (const part of parts()) {
        if (part.type === 'file') {
            if ((await checkFileSize(part)) > 2001) {
                throw new ApiError('Image size should be max 2mb', 16);
            }

            avatarFile = part;
        } else if (part.type === 'field' && part.fieldname === 'userData') {
            if (!(typeof part.value === 'string')) {
                throw new ApiError('Invalid content struct', 409);
            }

            if (!validateDataBySchema(part.value, UpdateUserSchema)) {
                throw new ApiError('Invalid user data', 409);
            }

            userData = part.value;
        }
    }

    return {
        userName: userData?.userName,
        fullName: userData?.fullName,
        avatarFile,
    };
}

export async function updateUserByUserName(
    prisma: PrismaClient,
    userName: string,
    data: Partial<SafeUser>
): Promise<SafeUser | never> {
    return preparePrismaData(
        await prisma.user.update({
            where: { userName },
            data,

            select: {
                userName: true,

                fullName: true,

                email: true,

                avatar: true,
            },
        })
    );
}
