import { create } from 'zustand';

import type { Chat, ChatName, Message } from '@none/shared';

type ChatNames = Pick<ChatName, 'publicId' | 'name' | 'members'>[];

interface ChatStore {
    chats: Record<string, Chat>;

    chatNames: ChatNames;

    chatStack: string[];

    setChats: (newChats: ChatName[]) => void;

    addChat: (publicId: string, newChat: Chat) => void;

    addMessage: (chatPublicId: string, message: Message) => void;

    setChatMessages: (chatPublicId: string, newMessageList: Message[]) => void;

    addChatToStack: (chatPublicId: string) => void;
    deleteChatFromStack: (chatPublicId: string) => void;

    setChatNames: (newChat: ChatNames) => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
    chats: {},

    chatNames: [],

    chatStack: [],

    setChats: (newChats) =>
        set({
            chats: Object.fromEntries(
                newChats.map((chat) => [
                    chat.publicId,
                    { ...chat, messageList: [] },
                ])
            ),
        }),

    addChat: (publicId, newChat) =>
        set((state) => ({ chats: { ...state.chats, [publicId]: newChat } })),

    addMessage: (chatPublicId, message) =>
        set((state) => ({
            chats: {
                ...state.chats,

                [chatPublicId]: {
                    ...state.chats[chatPublicId],
                    messageList: [
                        ...state.chats[chatPublicId].messageList,
                        message,
                    ],
                },
            },
        })),

    addChatToStack: (chatPublicId) =>
        set((state) => ({ chatStack: [...state.chatStack, chatPublicId] })),
    deleteChatFromStack: (chatPublicId) =>
        set((state) => ({
            chatStack: state.chatStack.filter((chat) => chat !== chatPublicId),
        })),

    setChatMessages: (chatPublicId, newMessageList) =>
        set((state) => ({
            chats: {
                ...state.chats,
                [chatPublicId]: {
                    ...state.chats[chatPublicId],

                    messageList: newMessageList,
                },
            },
        })),

    setChatNames: (newChats) => set({ chatNames: newChats }),
}));
