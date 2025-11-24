import type { FastifyRequest, FastifyReply } from 'fastify';

import type { PrismaClient } from '@/generated/prisma/client/client';

import type Redis from 'ioredis';
import type { UserTrie } from '@/lib/UserTrie';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;

        redis: Redis;

        auth(request: FastifyRequest, reply: FastifyReply): Promise<void>;

        userTrie: UserTrie;
    }
}
declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { userName: string };
        user: { userName: string };
    }
}
