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
        if (chatStack.find((chat) => chat === chatPublicId)) return;

        if (chatStack.length === 3) {
            _deleteFirstChat();
        }

        addChatToStack(chatPublicId);
    }

    function _deleteFirstChat() {
        deleteChatFromStack(chatStack[0]);
        setChatMessages(chatStack[0], []);
    }

    return { appendChat };
}
