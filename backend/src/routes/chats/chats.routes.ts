import type { FastifyInstance, RouteHandlerMethod } from 'fastify';

import {
    ApiResponseSchema,
    ChatSchema,
    MessageSchema,
    ChatNameSchema,
} from '@none/shared';
import { array, object, string } from 'zod';

import {
    createChat,
    getUserChatNames,
    getChatMessages,
} from './chats.controller';

export async function chatRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.auth);

    app.route({
        method: 'GET',
        url: '/chats',
        schema: {
            response: {
                200: array(ChatNameSchema),
                404: ApiResponseSchema,
                500: ApiResponseSchema,
            },
        },

        handler: getUserChatNames as RouteHandlerMethod,
    });

    app.route({
        method: 'POST',
        url: '/chats',
        schema: {
            body: ChatSchema,
            response: {
                201: ChatSchema,
                404: ApiResponseSchema,
                500: ApiResponseSchema,
            },
        },
        handler: createChat as RouteHandlerMethod,
    });

    app.route({
        method: 'GET',
        url: '/chats/:publicId/messages',
        schema: {
            params: object({ publicId: string() }),

            querystring: object({
                cursor: string().optional(),
                limit: string(),
            }),

            response: {
                200: array(MessageSchema),
            },
        },
        onRequest: app.auth,
        handler: getChatMessages as RouteHandlerMethod,
    });
}
