'use clinet';

import { useToolTip } from '@/hooks/useToolTip';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { BasicModalProps } from '@/types/ModalProps';

import ModalBackdrop from '@/UI/ModalBackdrop';

import LargeLink from '@/UI/LargeLink/LargeLink';

import searchStyles from './SearchModal.module.scss';

export default function SearchModal({ closeMainModal }: BasicModalProps) {
    const hotkeys = useHotkeyStore((state) => state.hotkeys);
    const closeMainModalHotkey = hotkeys.find(
        (hotkey) => hotkey.name === 'closeMainModal'
    )?.key;

    const toolTip = useToolTip();

    return (
        <ModalBackdrop onClose={closeMainModal} backdropType='empty'>
            <div
                role='dialog'
                aria-modal='true'
                className={searchStyles['search-modal']}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={searchStyles['input-block']}>
                    <input
                        type='text'
                        placeholder='Find in chats...'
                        className={searchStyles['search-input']}
                    />

                    <button
                        className={searchStyles['close-button']}
                        onMouseEnter={(event) => {
                            toolTip.show({
                                title: `Close the search window`,
                                subtitle: closeMainModalHotkey,

                                relativeElement: event.currentTarget,
                                position: 'left',
                            });
                        }}
                        onMouseLeave={toolTip.hide}
                        onClick={closeMainModal}
                        aria-label={`Close the search window ${closeMainModalHotkey}`}
                    >
                        <svg
                            className={searchStyles['cross-icon']}
                            width={20}
                            height={20}
                        >
                            <use href='#cross-icon' />
                        </svg>
                    </button>
                </div>

                <div className={searchStyles['chat-box']}>
                    <LargeLink
                        href='/'
                        title='New chat'
                        aria-label='Open new chat'
                        icon={
                            <svg width={20} height={20}>
                                <use href='#chat-icon' />
                            </svg>
                        }
                        onClick={closeMainModal}
                    />

                    <div className={searchStyles['chat-list']}></div>
                </div>
            </div>
        </ModalBackdrop>
    );
}
