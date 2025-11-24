import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { UserTrie } from '@/lib/UserTrie/userTrie';
import { preparePrismaData } from '@/utils/preparePrismaData';

export default fastifyPlugin(async (app) => {
    const userTrie = new UserTrie();

    const users = await app.prisma.user.findMany({
        where: {
            public: true,
        },
        select: { userName: true, fullName: true, avatar: true },
    });

    const prepareUsers = preparePrismaData(users);

    prepareUsers.forEach((user) => {
        userTrie.insert(user.userName, user);
    });

    app.decorate('userTrie', userTrie);

    const updateInterval = setInterval(async () => {
        const users = await app.prisma.user.findMany({
            where: { public: true },
        });

        const prepareUsers = preparePrismaData(users);

        prepareUsers.forEach((user) => {
            userTrie.insert(user.userName, user);
        });
    }, 12 * 60 * 1000);

    app.addHook('onClose', async () => {
        clearInterval(updateInterval);
    });
});
