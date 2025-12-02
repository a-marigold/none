'use client';

import { useState, useRef } from 'react';
import type { TextareaHTMLAttributes, RefObject } from 'react';

import { useToolTip } from '@/hooks/useToolTip';

import { useRegisterHotkey } from '@/hooks/useRegisterHotkey';

import { resizeTextarea } from '@/utils/ResizeTextarea';

import textStyles from './ChatTextArea.module.scss';

interface ChatTextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerRef?: RefObject<HTMLDivElement | null>;

    state: string;

    ariaLabel: string;

    badge?: {
        text: string;

        bgColor: string;

        fontColor: string;
    };

    sendFunction: () => void;
}
export default function ChatTextArea({
    containerRef,

    state,

    ariaLabel,

    badge,

    className,

    sendFunction,

    ...attributes
}: ChatTextAreaProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isBounded, setIsBounded] = useState(false);

    useRegisterHotkey({
        name: 'sendMessage',
        key: 'Enter',
        callback: (event) => {
            if (!textAreaRef.current) return;

            if (
                !event?.shiftKey &&
                state &&
                textAreaRef.current === document.activeElement
            ) {
                sendFunction();
            }
        },
    });

    const isEmpty = !state.trim();

    const toolTip = useToolTip();

    return (
        <div
            ref={containerRef}
            className={`${textStyles['chat-input-block']} ${className ?? ''}`}
            aria-label={ariaLabel}
            onClick={() => {
                textAreaRef.current?.focus();
            }}
        >
            <textarea
                ref={textAreaRef}
                rows={1}
                placeholder='Message'
                {...attributes}
                className={`${textStyles['chat-input']}
                    ${isBounded ? textStyles['bounded'] : ''}`}
                value={state}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                    }
                }}
                onChange={(event) => {
                    attributes.onChange?.(event);

                    resizeTextarea(event.target);

                    if (event.target.scrollHeight >= 319) {
                        setIsBounded(true);
                    }
                }}
            />

            <div className={textStyles['tools-block']}>
                {badge?.text && (
                    <div className={textStyles['badge-block']}>
                        <span
                            className={textStyles['badge']}
                            style={{
                                backgroundColor: badge.bgColor,
                                color: badge.fontColor,
                            }}
                        >
                            {badge.text}
                        </span>
                    </div>
                )}

                <div className={textStyles['buttons-group']}>
                    {/* 
                        Here is deprecated LabelledElement, now need to use useToolTip hook! 

                    <LabelledElement
                        title='Enable the microphone'
                        position='top'
                    >
                        <button
                            className={textStyles['empty-filled-button']}
                            aria-label='Enable the microphone'
                        >
                            <svg
                                width={20}
                                height={20}
                                color='var(--font-color)'
                            >
                                <use href='#microphone-icon' />
                            </svg>
                        </button>
                    </LabelledElement> */}

                    <button
                        className={textStyles['send-button']}
                        color='var(--dark-foreground-color)'
                        disabled={isEmpty}
                        aria-label='Send message'
                        onPointerEnter={(event) => {
                            toolTip.show({
                                title: isEmpty
                                    ? 'The message is empty'
                                    : 'Send message',

                                relativeElement: event.currentTarget,
                                position: 'top',
                            });
                        }}
                        onPointerLeave={toolTip.hide}
                        onClick={sendFunction}
                    >
                        <svg width={20} height={20}>
                            <use href='#send-arrow-icon' />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
