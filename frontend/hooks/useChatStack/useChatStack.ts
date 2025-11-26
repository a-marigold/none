// TODO: Add external chat length (in settings)

import { useChatStore } from '@/store/ChatStore';

import type { Message } from '@none/shared';

export function useChatStack() {
    const chatStack = useChatStore((state) => state.chatStack);

    const addChatToStack = useChatStore((state) => state.addChatToStack);

    const deleteChatFromStack = useChatStore(
        (state) => state.deleteChatFromStack
    );

    const setChatMessages = useChatStore((state) => state.setChatMessages);

    function appendChat(chatPublicId: string, chatMessages: Message[]) {
        if (has(chatPublicId)) return;

        if (chatStack.length === 3) {
            _deleteFirstChat();
        }

        addChatToStack(chatPublicId);
        setChatMessages(chatPublicId, chatMessages);
    }

    function has(chatPublicId: string) {
        return !!chatStack.find((publicId) => publicId === chatPublicId);
    }

    function _deleteFirstChat() {
        deleteChatFromStack(chatStack[0]);
        setChatMessages(chatStack[0], []);
    }

    return { stack: chatStack, appendChat, has };
}
