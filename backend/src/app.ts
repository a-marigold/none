import Fastify from 'fastify';

import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import {
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';

import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';
import redisPlugin from './plugins/redis';
import prismaPlugin from './plugins/prisma';
import authPlugin from './plugins/auth';
import userTriePlugin from './plugins/userTrie';

import { Cookie } from '@none/shared';

import { routes } from './routes';

export async function buildApp() {
    const app = Fastify({
        logger: process.env.PRODUCTION === 'false',
    }).withTypeProvider<ZodTypeProvider>();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(fastifyCors, {
        origin: ['https://none-m.vercel.app', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PATCH'],
        credentials: true,
    });
    app.register(fastifyCookie);
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || '',
        cookie: {
            cookieName: Cookie.AccessToken,
            signed: false,
        },
    });
    app.register(fastifyWebsocket);

    app.register(prismaPlugin);
    app.register(redisPlugin);

    app.register(authPlugin);

    app.register(userTriePlugin);

    await app.ready();

    app.register(routes);

    return app;
}
