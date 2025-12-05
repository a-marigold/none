'use client';

import { useEffect } from 'react';

import { useHotkeyStore } from '@/store/HotkeyStore';

import { useHotkeys } from '@/hooks/useHotkeys';

import { useHotkeyConfig } from './useHotkeyConfig';

export default function HotkeyRoot() {
    const registerHotkey = useHotkeyStore((state) => state.registerHotkey);

    const unregisterHotkey = useHotkeyStore((state) => state.unregisterHotkey);

    useHotkeys();

    const config = useHotkeyConfig();

    useEffect(() => {
        config.forEach((hotkey) => {
            registerHotkey(hotkey.name, hotkey.key, hotkey.callback);
        });

        return () => {
            config.forEach((hotkey) => {
                unregisterHotkey(hotkey.name);
            });
        };
    }, [config]);

    return null;
}
