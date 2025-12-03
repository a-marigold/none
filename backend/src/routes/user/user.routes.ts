import type { FastifyInstance, RouteHandlerMethod } from 'fastify';
import { ApiResponseSchema, SafeUserSchema } from '@none/shared';

import { updateUser } from './user.controller';

export async function userRoutes(app: FastifyInstance) {
    app.route({
        method: 'PATCH',
        url: '/user',
        schema: {
            response: {
                200: SafeUserSchema,
                500: ApiResponseSchema,
            },
        },
        onRequest: app.auth,
        handler: updateUser as RouteHandlerMethod,
    });
}
