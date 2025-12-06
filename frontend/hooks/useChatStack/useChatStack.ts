// TODO: Add external chat length (in settings)

import { useCallback } from 'react';
import { useSettingsStore } from '@/store/SettingsStore';

import { useChatStore } from '@/store/ChatStore';

import type { Message } from '@none/shared';

export function useChatStack() {
    const chatStackLength = useSettingsStore((state) => state.chatStackLength);

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
            return chatStack.includes(chatPublicId);
        },
        [chatStack]
    );

    const appendChat = useCallback(
        (chatPublicId: string, chatMessages: Message[]) => {
            if (has(chatPublicId)) return;

            if (chatStack.length >= chatStackLength) {
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
            chatStackLength,
        ]
    );

    return { stack: chatStack, appendChat, has };
}
