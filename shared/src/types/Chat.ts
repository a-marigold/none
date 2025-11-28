import { object, string, uuid, array, number, infer as zinfer } from 'zod';

import { UserSchema } from './User';

export const MessageSchema = object({
    id: number().optional(),
    sender: string(),
    chatPublicId: uuid(),

    data: string(),

    createdAt: number(),
});

export const ChatSchema = object({
    id: number().optional(),

    publicId: uuid().optional(),

    name: string(),

    members: array(
        UserSchema.pick({
            userName: true,
            fullName: true,
            avatar: true,
        }).partial({ fullName: true })
    ),

    messageList: array(MessageSchema),
});

export const ChatListSchema = array(ChatSchema);

export type Chat = zinfer<typeof ChatSchema>;

export type Message = zinfer<typeof MessageSchema>;
