'use client';

import { useRef } from 'react';

import { useToolTip } from '@/hooks/useToolTip';

import type { MessagePropsType, ToolButtonType } from './MessageTypes';

import { toolButtonHandler } from './toolButtonHandler';

import messageStyles from './Message.module.scss';

export const toolButtonList: ToolButtonType[] = [
    {
        icon: (
            <svg width={20} height={20}>
                <use href='#clipboard-icon' />
            </svg>
        ),
        handler: 'copy',
        ariaLabel: 'Copy message',
    },

    {
        icon: (
            <svg width={20} height={20}>
                <use href='#like-icon' />
            </svg>
        ),
        handler: 'like',
        ariaLabel: 'Like message',
    },

    {
        icon: (
            <svg width={20} height={20}>
                <use href='#dislike-icon' />
            </svg>
        ),
        handler: 'dislike',
        ariaLabel: 'Dislike message',
    },
];

export function MessageOther({ children }: MessagePropsType) {
    const messageRef = useRef<HTMLDivElement>(null);

    const toolTip = useToolTip();

    return (
        <div
            className={`${messageStyles['message-block']} ${messageStyles['other']}`}
        >
            <div ref={messageRef} className={messageStyles['message-other']}>
                {children}
            </div>

            <div className={messageStyles['tool-buttons-block']}>
                {toolButtonList.map((button, index) => (
                    <button
                        key={index}
                        className={messageStyles['tool-button']}
                        aria-label={button.ariaLabel}
                        onPointerEnter={(event) => {
                            toolTip.show({
                                title: button.ariaLabel,

                                relativeElement: event.currentTarget,
                                position: 'bottom',
                            });
                        }}
                        onPointerLeave={toolTip.hide}
                        onClick={() => {
                            toolButtonHandler(
                                button.handler,
                                messageRef.current
                            );
                        }}
                    >
                        {button.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
