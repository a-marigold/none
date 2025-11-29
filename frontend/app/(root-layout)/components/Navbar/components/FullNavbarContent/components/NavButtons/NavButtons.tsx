'use client';

import { useModalStore } from '@/store/ModalStore/useModalStore';
import { useHotkeyStore } from '@/store/HotkeyStore';

import SearchModal from '@modals/SearchModal';

import PrimaryLink from '@/UI/PrimaryLink';
import PrimaryButton from '@/UI/PrimaryButton';

import navStyles from './NavButtons.module.scss';

export default function NavButtons() {
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    const openMainModal = useModalStore((state) => state.openMainModal);

    const hotkeys = useHotkeyStore((state) => state.hotkeys);
    const openNewChatHotkey = hotkeys.find(
        (hotkey) => hotkey.name === 'openNewChat'
    );

    const searchHotkey = hotkeys.find((hotkey) => hotkey.name === 'search');

    return (
        <div className={navStyles['nav-buttons-block']}>
            <PrimaryLink
                href='/'
                title='New chat'
                subtitle={openNewChatHotkey?.key || 'Ctrl + Alt + N'}
                aria-label='Open new chat'
                prefetch
                isActive={false}
                icon={
                    <svg width={20} height={20} color='var(--font-color)'>
                        <use href='#chat-icon' />
                    </svg>
                }
            />

            <PrimaryButton
                title='Search'
                subtitle={searchHotkey?.key || 'Ctrl + Shift + K'}
                aria-label='Search chats'
                icon={
                    <svg width={20} height={20} color='var(--font-color)'>
                        <use href='#search-icon' />
                    </svg>
                }
                onClick={() =>
                    openMainModal(
                        <SearchModal closeMainModal={closeMainModal} />
                    )
                }
            />
        </div>
    );
}
