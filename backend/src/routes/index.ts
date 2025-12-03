import type { FastifyInstance } from 'fastify';

import { authRoutes } from './auth';
import { cronRoutes } from './cron';
import { streamRoutes } from './stream';
import { chatRoutes } from './chats';
import { userRoutes } from './user/user.routes';

export async function routes(app: FastifyInstance) {
    app.register(authRoutes);
    app.register(cronRoutes);
    app.register(streamRoutes);

    app.register(chatRoutes);

    app.register(userRoutes);
}
