'use client';

import { useRef } from 'react';

import { useToolTip } from '@/hooks/useToolTip';

import type { MessagePropsType, ToolButtonType } from './MessageTypes';

import { toolButtonHandler } from './toolButtonHandler';

import messageStyles from './Message.module.scss';

export const toolButtonlist: ToolButtonType[] = [
    {
        icon: (
            <svg width={20} height={20}>
                <use href='#clipboard-icon' />
            </svg>
        ),
        ariaLabel: 'Copy message',

        handler: 'copy',
    },

    {
        icon: (
            <svg width={20} height={20}>
                <use href='#edit-icon' />
            </svg>
        ),
        ariaLabel: 'Edit message',

        handler: 'edit',
    },
];
export function MessageMine({ children }: MessagePropsType) {
    const messageRef = useRef<HTMLDivElement>(null);

    const toolTip = useToolTip();

    return (
        <div
            className={`${messageStyles['message-block']} ${messageStyles['mine']}`}
        >
            <div ref={messageRef} className={messageStyles['message-mine']}>
                {children}
            </div>

            <div className={messageStyles['tool-buttons-block']}>
                {toolButtonlist.map((button, index) => (
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
