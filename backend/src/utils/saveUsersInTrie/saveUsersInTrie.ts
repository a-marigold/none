import type { PrismaClient } from '@/generated/prisma/client/client';

import type { UserTrie } from '@/lib/UserTrie';

import { findPublicUsers } from '@/routes/auth';

export async function saveUsersInTrie(
    prisma: PrismaClient,

    userTrie: UserTrie
) {
    const publicUsers = await findPublicUsers(prisma);

    publicUsers.forEach((user) => {
        userTrie.insert(user.userName, user);
    });
}
