// TODO: Add external chat length (in settings)

import { useCallback } from 'react';

import { useChatStore } from '@/store/ChatStore';

import type { Message } from '@none/shared';

export function useChatStack() {
    const chatStack = useChatStore((state) => state.chatStack);

    const addChatToStack = useChatStore((state) => state.addChatToStack);

    const deleteChatFromStack = useChatStore(
        (state) => state.deleteChatFromStack
    );

    const setChatMessages = useChatStore((state) => state.setChatMessages);

    const _deleteFirstChat = useCallback(() => {
        deleteChatFromStack(chatStack[0]);
        setChatMessages(chatStack[0], []);
    }, [deleteChatFromStack, setChatMessages, chatStack]);

    const has = useCallback(
        (chatPublicId: string) => {
            return !!chatStack.find((publicId) => publicId === chatPublicId);
        },
        [chatStack]
    );

    const appendChat = useCallback(
        (chatPublicId: string, chatMessages: Message[]) => {
            if (has(chatPublicId)) return;

            if (chatStack.length === 3) {
                _deleteFirstChat();
            }

            addChatToStack(chatPublicId);
            setChatMessages(chatPublicId, chatMessages);
        },
        [
            has,
            addChatToStack,
            setChatMessages,
            _deleteFirstChat,
            chatStack.length,
        ]
    );

    return { stack: chatStack, appendChat, has };
}
