import type { PrismaClient } from '@/generated/prisma/client/client';

import { preparePrismaData } from '@/utils/preparePrismaData/preparePrismaData';

import type { Chat } from '@none/shared';

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
