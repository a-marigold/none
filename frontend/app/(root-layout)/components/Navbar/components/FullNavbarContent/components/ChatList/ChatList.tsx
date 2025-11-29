'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useChatStore } from '@/store/ChatStore';

import { getChats } from '@/lib/api/ChatApiClient';

import MemoPrimaryLink from '@/UI/PrimaryLink/memo';

import navStyles from './ChatList.module.scss';
export default function ChatList() {
    const setChats = useChatStore((state) => state.setChats);

    const setChatNames = useChatStore((state) => state.setChatNames);

    useEffect(() => {
        async function handleGetChats() {
            try {
                const chats = await getChats();
                setChats(chats);

                setChatNames(
                    Object.values(chats).map(({ name, publicId, members }) => ({
                        name,

                        publicId,

                        members,
                    }))
                );
                console.log(chats);
            } catch {
                setChats([]);
            }
        }
        handleGetChats();
    }, []);

    const chatNames = useChatStore((state) => state.chatNames);

    const [showChatList, setShowChatList] = useState(true);

    const pathname = usePathname();

    const currentChatId = pathname.split('/').filter(Boolean).at(-1);

    return (
        <div
            className={navStyles['chats-box']}
            onClick={() => {
                setShowChatList((prev) => !prev);
            }}
        >
            <div className={navStyles['title-block']}>
                <p className={navStyles['title']}>Your chats</p>

                <svg
                    width={12}
                    height={12}
                    className={`${navStyles['arrow-icon']} ${
                        !showChatList && navStyles['active']
                    }`}
                >
                    <use href='#arrow-icon' />
                </svg>
            </div>

            {showChatList && (
                <ul
                    className={navStyles['chat-list']}
                    onClick={(event) => event.stopPropagation()}
                >
                    {chatNames.map((chat) => (
                        <li
                            key={chat.publicId}
                            className={navStyles['chat-link']}
                        >
                            <MemoPrimaryLink
                                replace
                                shallow
                                prefetch={false}
                                title={chat.name}
                                href={`/chat/${chat.publicId}`}
                                isActive={currentChatId === chat.publicId}
                                aria-label={`Open ${chat.name} chat`}
                                data-chat-public-id={chat.publicId}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
