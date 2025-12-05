'use client';

import { useToolTip } from '@/hooks/useToolTip';

import { useModalStore } from '@/store/ModalStore/useModalStore';
import { useHotkeyStore } from '@/store/HotkeyStore';

import SearchModal from '@modals/SearchModal';

import Link from 'next/link';

import cutnavStyles from '../CutNavbarContent.module.scss';

export default function CutNavButtons() {
    const openMainModal = useModalStore((state) => state.openMainModal);

    const closeMainModal = useModalStore((state) => state.closeMainModal);

    const hotkeys = useHotkeyStore((state) => state.hotkeys);

    const openNewChatHotkey = hotkeys.get('openNewChat')?.key;

    const searchHotkey = hotkeys.get('search')?.key;

    const toolTip = useToolTip();

    return (
        <div className={cutnavStyles['nav-buttons-block']}>
            <Link
                href='/'
                prefetch
                className={cutnavStyles['nav-button']}
                aria-label={`Open new chat ${openNewChatHotkey}`}
                onPointerEnter={(event) => {
                    toolTip.show({
                        title: 'Open new chat',
                        subtitle: openNewChatHotkey,

                        relativeElement: event.currentTarget,
                        position: 'right',
                    });
                }}
                onPointerLeave={toolTip.hide}
            >
                <svg width={20} height={20} color='var(--font-color)'>
                    <use href='#chat-icon' />
                </svg>
            </Link>

            <button
                className={cutnavStyles['nav-button']}
                aria-label={`Search ${searchHotkey}`}
                onPointerEnter={(event) => {
                    toolTip.show({
                        title: 'Search',
                        subtitle: searchHotkey,

                        relativeElement: event.currentTarget,
                        position: 'right',
                    });
                }}
                onPointerLeave={toolTip.hide}
                onClick={() =>
                    openMainModal(
                        <SearchModal closeMainModal={closeMainModal} />
                    )
                }
            >
                <svg width={20} height={20} color='var(--font-color)'>
                    <use href='#search-icon' />
                </svg>
            </button>
        </div>
    );
}
