'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/store/AuthStore';
import { useChatStore } from '@/store/ChatStore';
import { useChatStack } from '@/hooks/useChatStack';

import { getChatMessages } from '@/lib/api/ChatApiClient';
import { stream } from '@/lib/stream';

import { MessageMine, MessageOther } from './components';

import messageStyles from './MessageList.module.scss';

export default function MessageList() {
    const chatPublicId = usePathname().split('/').filter(Boolean).at(-1);

    const userName = useAuthStore((state) => state.user?.userName);

    const chatMessages = useChatStore(
        (state) => state.messageMap[chatPublicId || '']
    );
    const addMessage = useChatStore((state) => state.addMessage);

    const { has, appendChat } = useChatStack();

    useEffect(() => {
        async function setMessages() {
            if (!chatPublicId) return;

            if (!has(chatPublicId)) {
                const messages = await getChatMessages(chatPublicId);

                appendChat(chatPublicId, messages);
            }
        }

        setMessages();

        stream.onmessage('newChatMessage', (data) => {
            if (chatPublicId) {
                addMessage(chatPublicId, data);
            }
        });
    }, []);

    console.log(chatMessages);

    return (
        <div className={messageStyles['message-list']}>
            {chatMessages?.map((message) =>
                message.sender === userName ? (
                    <MessageMine key={message.id}>{message.data}</MessageMine>
                ) : (
                    <MessageOther key={message.id}>{message.data}</MessageOther>
                )
            )}
        </div>
    );
}
