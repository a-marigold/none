import type { PrismaClient } from '@/generated/prisma/client/client';
import type { SafeUser } from '@none/shared';

import { preparePrismaData } from '@/utils/preparePrismaData';

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
