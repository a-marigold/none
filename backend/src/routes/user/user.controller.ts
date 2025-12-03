import type { FastifyRequest, FastifyReply } from 'fastify';

import type { ApiResponse, SafeUser } from '@none/shared';

import { updateUserByUserName } from './user.service';

export async function updateUser(
    request: FastifyRequest<{ Body: SafeUser }>,

    reply: FastifyReply<{ Reply: SafeUser | ApiResponse }>
) {
    const userName = request.user.userName;

    try {
        const updateUser = await updateUserByUserName(
            request.server.prisma,
            userName,
            request.body
        );

        return reply.code(200).send(updateUser);
    } catch (error) {
        return reply
            .code(500)
            .send({ code: 500, message: 'Internal server error' });
    }
}
