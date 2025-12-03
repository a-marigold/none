import type { FastifyRequest, FastifyReply } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';

import { ApiError } from '@none/shared';
import type { ApiResponse, SafeUser, UpdateUser } from '@none/shared';

import { getUserDataFromParts, updateUserByUserName } from './user.service';

export async function updateUser(
    request: FastifyRequest,
    reply: FastifyReply<{ Reply: SafeUser | ApiResponse }>
) {
    const userName = request.user.userName;

    try {
        const userData = await getUserDataFromParts(request.parts);

        const updateUser = await updateUserByUserName(
            request.server.prisma,
            userName,
            userData
        );

        return reply.code(200).send(updateUser);
    } catch (error) {
        if (error instanceof ApiError) {
            return reply
                .code(error.code)
                .send({ code: error.code, message: error.message });
        }

        return reply
            .code(500)
            .send({ code: 500, message: 'Internal server error' });
    }
}
