import fastifyPlugin from 'fastify-plugin';

import { UserTrie } from '@/lib/UserTrie/userTrie';

import { saveUsersInTrie } from '@/utils/saveUsersInTrie';

export default fastifyPlugin(async (app) => {
    const userTrie = new UserTrie();

    await saveUsersInTrie(app.prisma, userTrie);

    app.decorate('userTrie', userTrie);

    const updateInterval = setInterval(() => {
        saveUsersInTrie(app.prisma, userTrie);
    }, 12 * 60 * 1000);

    app.addHook('onClose', async () => {
        clearInterval(updateInterval);
    });
});
