'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/store/AuthStore';
import { useChatStore } from '@/store/ChatStore';

import { stream } from '@/lib/stream';
import { validateChatMessage } from '@/utils/StreamHelpers';

import { MessageMine, MessageOther } from './components';

import messageStyles from './MessageList.module.scss';

export default function MessageList() {
    const chatId = usePathname().split('/').filter(Boolean).at(-1);

    const userName = useAuthStore((state) => state.user?.userName);

    const chatMessages = useChatStore(
        (state) => state.chats[chatId || '']?.messageList
    );
    const addMessage = useChatStore((state) => state.addMessage);

    useEffect(() => {
        stream.onmessage('newChatMessage', (data) => {
            if (validateChatMessage(data) && chatId) {
                addMessage(chatId, data);
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
