'use client';

import { useMemo, useCallback } from 'react';
import type { MouseEvent } from 'react';

import { useModalStore } from '@/store/ModalStore';
import { useChatStore } from '@/store/ChatStore';
import { useMiniChatStore } from '@/store/MiniChatStore/useMiniChatStore';

import { useSendSearchQuery } from '@/hooks/useSendSearchQuery';

import DropDownModal from '@/UI/DropDownModal';

import type { DropDownModalProps } from '@/UI/DropDownModal';

import MemoPrimaryButton from '@/UI/PrimaryButton/memo';

import modalStyles from './BadgeModal.module.scss';

type BadgeModalProps = Pick<
    DropDownModalProps,
    'relativeElement' | 'posY' | 'posX' | 'shiftX' | 'shiftY'
>;

export default function BadgeModal({ ...dropDownProps }: BadgeModalProps) {
    const chatNames = useChatStore((state) => state.chatNames);

    const receiver = useMiniChatStore((state) => state.receiver);
    const setReceiver = useMiniChatStore((state) => state.setReceiver);

    const filteredChatNames = useMemo(
        () =>
            chatNames.filter((chat) =>
                !receiver
                    ? true
                    : chat.name
                          .split(' ')
                          .join('')
                          .toLocaleLowerCase()
                          .includes(receiver.toLowerCase())
            ),
        [chatNames, receiver]
    );

    const closeMainModal = useModalStore((state) => state.closeMainModal);
    const buttonHandler = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setReceiver(event.currentTarget.dataset.chatName || '');
            closeMainModal();
        },
        [setReceiver, closeMainModal]
    );

    const { users } = useSendSearchQuery(receiver);

    return (
        <DropDownModal
            {...dropDownProps}
            zIndex={60}
            childrenDirection='horizontal'
            topChildren={
                <div>
                    {filteredChatNames.length ? (
                        filteredChatNames.map((chat) => (
                            <MemoPrimaryButton
                                key={chat.publicId}
                                title={chat.name}
                                aria-label=''
                                role='option'
                                data-chat-name={chat.name}
                                onClick={buttonHandler}
                            />
                        ))
                    ) : (
                        <div className={modalStyles['empty-list']}>
                            <p className={modalStyles['empty-text']}>
                                Nothing found in your chats
                            </p>
                        </div>
                    )}
                </div>
            }
            bottomChildren={
                <div>
                    {users.length ? (
                        filteredChatNames.map((chat) => (
                            <MemoPrimaryButton
                                key={chat.publicId}
                                title={chat.name}
                                aria-label=''
                                role='option'
                                data-chat-name={chat.name}
                                onClick={buttonHandler}
                            />
                        ))
                    ) : (
                        <div className={modalStyles['empty-list']}>
                            <p className={modalStyles['empty-text']}>
                                User with this user name not found
                            </p>
                        </div>
                    )}
                </div>
            }
            onClose={closeMainModal}
        />
    );
}
