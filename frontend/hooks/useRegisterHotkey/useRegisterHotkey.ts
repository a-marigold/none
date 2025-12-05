import { useEffect } from 'react';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { Hotkey } from '@/types/Hotkey';

/**
 * Registers a hotkey in `useEffect` and unregisters the hotkey in cleanup of the `useEffect`.
 * Used to register hotkeys manually in react components.
 *
 * @param {Hotkey} hotkey
 */
export function useRegisterHotkey({ name, key, callback }: Hotkey) {
    const registerHotkey = useHotkeyStore((state) => state.registerHotkey);

    const unregisterHotkey = useHotkeyStore((state) => state.unregisterHotkey);

    useEffect(() => {
        registerHotkey(name, key, callback);

        return () => {
            unregisterHotkey(name);
        };
    }, [name, key, callback]);
}
