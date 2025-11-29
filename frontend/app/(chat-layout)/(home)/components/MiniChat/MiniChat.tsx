'use client';

import { useEffect, useRef } from 'react';

import { useModalStore } from '@/store/ModalStore/useModalStore';
import { useAuthStore } from '@/store/AuthStore';
import { useMiniChatStore } from '@/store/MiniChatStore';

import { useSendFunction } from './useSendFunction';

import { findBySymbol } from '@/utils/FindBySymbol';
import { getRandomArrayElement } from '@/utils/GetRandomArrayElement';

import { badgeColorList } from '@/constants/badgeColorList';

import BadgeModal from '@modals/BadgeModal';

import ChatTextArea from '@/UI/ChatTextArea';

export default function Chat() {
    const message = useMiniChatStore((state) => state.message);
    const setMessage = useMiniChatStore((state) => state.setMessage);

    const receiver = useMiniChatStore((state) => state.receiver);

    const setReceiver = useMiniChatStore((state) => state.setReceiver);

    const openMainModal = useModalStore((state) => state.openMainModal);
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    useEffect(() => {
        if (receiver && textareaRef.current) {
            openMainModal(
                <BadgeModal
                    relativeElement={textareaRef.current}
                    posY='bottom'
                    posX='left'
                    shiftY={10}
                />
            );
        } else {
            closeMainModal();
        }
    }, [receiver]);

    const currentBadgeColors = getRandomArrayElement(badgeColorList);

    const textareaRef = useRef<HTMLDivElement>(null);

    const sendFunction = useSendFunction();

    return (
        <>
            <ChatTextArea
                ariaLabel='Input a message'
                state={message}
                containerRef={textareaRef}
                onChange={(event) => {
                    setMessage(event.target.value);

                    const badgeText = findBySymbol(event.target.value, '@');

                    setReceiver(badgeText?.split('@')[1].trim() || '');
                }}
                badge={{
                    text: receiver ? `@${receiver}` : '',
                    bgColor: currentBadgeColors.bgColor,
                    fontColor: currentBadgeColors.fontColor,
                }}
                sendFunction={() => {
                    sendFunction({
                        name: 'New Chat',

                        messageList: [],
                    });
                }}
            />
        </>
    );
}
