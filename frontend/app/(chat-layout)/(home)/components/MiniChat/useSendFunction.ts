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

    const authorized = useAuthStore((state) => state.authorized);
    const userName = useAuthStore((state) => state.user?.userName);
    const receiver = useMiniChatStore((state) => state.receiver);

    const router = useRouter();

    return async (chat: Omit<Chat, 'members'>) => {
        const findChatWithMember = chatNames.find((chatName) =>
            chatName.members.find((member) => member.userName === receiver)
        );

        if (findChatWithMember?.publicId && authorized) {
            setRedirectedChat(findChatWithMember.publicId);

            router.push(`/chat/${findChatWithMember.publicId}`);
        } else if (!findChatWithMember && authorized && userName) {
            const prepareChat: Chat = {
                ...chat,
                members: [{ userName }, { userName: receiver }],
            };

            try {
                const newChat = await createChat(prepareChat);

                if (newChat.publicId) {
                    addChat(newChat.publicId, newChat);

                    setRedirectedChat(newChat.publicId);

                    router.push(`/chat/${newChat.publicId}`);
                }
            } catch (error) {
                alert(error); // TODO: temporarily
            }
        } else if (!authorized) {
            // TODO: add logic for unauthorized users
        }
    };
}
