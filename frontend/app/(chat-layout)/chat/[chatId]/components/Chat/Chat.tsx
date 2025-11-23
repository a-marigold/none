'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/store/AuthStore';
import { useChatStore } from '@/store/ChatStore';
import { useMiniChatStore } from '@/store/MiniChatStore';

import { stream } from '@/lib/stream';
import type { Message } from '@none/shared';

import { cleanString } from '@/utils/CleanString/cleanString';

import MessageList from '../MessageList';
import ChatTextArea from '@/UI/ChatTextArea';
import chatStyles from '../../Chat.module.scss';

export default function Chat() {
    const [message, setMessage] = useState('');

    const userName = useAuthStore((state) => state.user?.userName);

    const addMessage = useChatStore((state) => state.addMessage);

    const chatPublicId = usePathname().split('/').filter(Boolean).at(-1);

    const redirectedChat = useMiniChatStore((state) => state.redirectedChat);
    const redirectedMessage = useMiniChatStore((state) => state.message);

    function handleAddMessage() {
        if (userName && chatPublicId) {
            const newMessage: Message = {
                createdAt: Date.now(),
                chatId: chatPublicId,
                sender: userName,
                data: message,
            };

            addMessage(chatPublicId, newMessage);

            stream.send('newChatMessage', newMessage);
        }
    }

    useEffect(() => {
        if (chatPublicId === redirectedChat) {
            setMessage(cleanString('@', redirectedMessage));
        }
    }, [redirectedChat]);

    return (
        <>
            <div className={chatStyles['chat-box']}>
                <MessageList />
            </div>

            <ChatTextArea
                className={chatStyles['message-input']}
                ariaLabel='Input a message'
                state={message}
                onChange={(event) => setMessage(event.target.value)}
                sendFunction={handleAddMessage}
            />
        </>
    );
}
