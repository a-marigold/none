'use client';

import { useRouter } from 'next/navigation';

import { useModalStore } from '@/store/ModalStore';

import type { Hotkey } from '@/types/Hotkey';

import SearchModal from '@modals/SearchModal';
import SettingsModal from '@modals/SettingsModal';

export function useHotkeyConfig() {
    const openMainModal = useModalStore((state) => state.openMainModal);
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    const router = useRouter();

    const config: Hotkey[] = [
        {
            name: 'search',
            key: 'Ctrl + Shift + K',
            callback: () => {
                openMainModal(<SearchModal closeMainModal={closeMainModal} />);
            },
        },
        {
            name: 'settings',
            key: 'Ctrl + Shift + S',
            callback: () => {
                openMainModal(
                    <SettingsModal closeMainModal={closeMainModal} />
                );
            },
        },
        {
            name: 'openNewChat',
            key: 'Ctrl + Alt + N',
            callback: () => {
                router.replace('/');
            },
        },
        {
            name: 'closeMainModal',
            key: 'Escape',
            callback: closeMainModal,
        },
    ];

    return config;
}
