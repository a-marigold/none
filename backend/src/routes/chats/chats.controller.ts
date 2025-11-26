import type { FastifyRequest, FastifyReply } from 'fastify';

import { ApiError } from '@none/shared';
import type { ApiResponse, Chat, Message } from '@none/shared';

import { checkUserExistence } from '../auth';
import {
    getChatsByUserName,
    createChatWithMembers,
    getMessagesByChatPublicId,
} from './chats.service';

export async function getUserChats(
    request: FastifyRequest,
    reply: FastifyReply<{ Reply: ApiResponse | Chat[] }>
) {
    const userName = request.user.userName;

    try {
        const chats = await getChatsByUserName(request.server.prisma, userName);

        if (!chats) {
            return reply.code(404).send({
                code: 404,
                message: 'This user does not have any chat',
            });
        }

        return reply.code(200).send(chats);
    } catch {
        return reply
            .code(500)

            .send({ code: 500, message: 'Internal server error' });
    }
}

export async function createChat(
    request: FastifyRequest<{ Body: Chat }>,

    reply: FastifyReply<{ Reply: ApiResponse | Chat }>
) {
    const userName = request.user.userName;

    const chat = request.body;

    try {
        const checkMembers: Chat['members'] = (
            await Promise.all(
                chat.members.map((member) =>
                    checkUserExistence(request.server.prisma, member.userName)
                )
            )
        ).map((member) => ({
            userName: member.userName,
            fullName: member.fullName,
            avatar: member.avatar,
        }));

        const findInitiatorUser = checkMembers.find(
            (member) => member.userName === userName
        );

        if (!findInitiatorUser) {
            throw new ApiError('Initiator not found in members', 404);
        }

        const newChat = await createChatWithMembers(
            request.server.prisma,
            chat
        );

        return reply.code(201).send(newChat);
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

export async function getChatMessages(
    request: FastifyRequest<{
        Params: { publicId: string };
        Querystring: { cursor: string | undefined; limit: string };
    }>,
    reply: FastifyReply<{ Reply: Message[] | ApiResponse }>
) {
    const cursor = request.query.cursor ? Number(request.query.cursor) : null;
    const limit = Number(request.query.limit);
    const chatPublicId = request.params.publicId;

    const userName = request.user.userName;

    try {
        await checkUserExistence(request.server.prisma, userName);
    } catch (error) {
        if (error instanceof ApiError && error.code === 404) {
            return reply.code(404).send({ code: 404, message: error.message });
        } else {
            return reply
                .code(500)
                .send({ code: 500, message: 'Internal server error' });
        }
    }

    const messages = await getMessagesByChatPublicId(
        request.server.prisma,
        userName,
        chatPublicId,
        cursor,
        limit
    );

    return reply.code(200).send(messages);
}
