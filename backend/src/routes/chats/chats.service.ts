import type { PrismaClient } from '@/generated/prisma/client/client';

import { preparePrismaData } from '@/utils/preparePrismaData/preparePrismaData';

import type { Chat, Message } from '@none/shared';

export async function getChatsByUserName(
    prisma: PrismaClient,

    userName: string
): Promise<Chat[] | undefined> {
    const user = await prisma.user.findUnique({
        where: { userName },

        include: {
            chats: {
                include: {
                    members: {
                        select: {
                            userName: true,
                            fullName: true,
                            avatar: true,
                        },
                    },
                    messageList: true,
                },
            },
        },
    });

    return preparePrismaData(user?.chats);
}

export async function createChatWithMembers(
    prisma: PrismaClient,

    chat: Chat
): Promise<Chat> {
    const newChat = await prisma.chat.create({
        data: {
            publicId: crypto.randomUUID(),
            name: chat.name,
            members: {
                connect: chat.members.map((member) => ({
                    userName: member.userName,
                })),
            },
        },

        include: {
            members: {
                select: { userName: true, fullName: true, avatar: true },
            },

            messageList: true,
        },
    });

    return preparePrismaData(newChat);
}

export async function getMessagesByChatPublicId(
    prisma: PrismaClient,
    userName: string,
    chatPublicId: string,
    cursor: number | null,
    limit: number
): Promise<Message[]> {
    const messages = await prisma.message.findMany({
        where: {
            chat: { members: { some: { userName } }, publicId: chatPublicId },
        },
        orderBy: { id: 'desc' },
        take: limit,
        cursor: cursor
            ? {
                  id: cursor,
              }
            : undefined,
        skip: cursor ? 1 : undefined,
    });
    return preparePrismaData(messages);
}

export async function addMessageToChat(
    prisma: PrismaClient,
    message: Message
): Promise<{
    message: Message;
    members: { userName: string }[];
}> {
    const newMessage = await prisma.message.create({
        data: message,
        include: {
            chat: { select: { members: { select: { userName: true } } } },
        },
    });

    return {
        message: preparePrismaData(newMessage),
        members: newMessage.chat.members,
    };
}
