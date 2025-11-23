import { useEffect } from 'react';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { Hotkey } from '@/types/Hotkey';

export function useRegisterHotkey({ name, key, callback }: Hotkey) {
    const registerHotkey = useHotkeyStore((state) => state.registerHotkey);

    const unregisterHotkey = useHotkeyStore((state) => state.unregisterHotkey);

    useEffect(() => {
        registerHotkey(name, key, callback);

        return () => {
            unregisterHotkey(name);
        };
    }, []);
}
