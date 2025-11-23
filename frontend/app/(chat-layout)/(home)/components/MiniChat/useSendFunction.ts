import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/AuthStore';
import { useChatStore } from '@/store/ChatStore';
import { useMiniChatStore } from '@/store/MiniChatStore';

import { createChat } from '@/lib/api/ChatApiClient';

import { Chat } from '@none/shared';

export function useSendFunction() {
    const chatNames = useChatStore((state) => state.chatNames);

    const addChat = useChatStore((state) => state.addChat);

    const setRedirectedChat = useMiniChatStore(
        (state) => state.setRedirectedChat
    );

    const userName = useAuthStore((state) => state.user?.userName);
    const receiver = useMiniChatStore((state) => state.receiver);

    const router = useRouter();

    return async (chat: Omit<Chat, 'members'>) => {
        const findChatWithMember = chatNames.find((chatName) =>
            chatName.members.find((member) => member.userName === receiver)
        );

        if (findChatWithMember?.publicId && userName) {
            setRedirectedChat(findChatWithMember.publicId);

            router.push(findChatWithMember.publicId);
        } else if (!findChatWithMember && userName) {
            const prepareChat: Chat = {
                ...chat,
                members: [{ userName }, { userName: receiver }],
            };

            try {
                const newChat = await createChat(prepareChat);

                addChat(newChat);

                if (newChat.publicId) {
                    setRedirectedChat(newChat.publicId);

                    router.push(`/chat/${newChat.publicId}`);
                }
            } catch (error) {
                alert(error); // TODO: temporarily
            }
        } else if (!userName && !findChatWithMember) {
            // TODO: logic for unauthorized users
        }
    };
}
