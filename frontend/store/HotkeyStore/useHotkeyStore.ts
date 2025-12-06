'use client';

import { create } from 'zustand';

import type { Hotkey } from '@/types/Hotkey';

interface HotkeyStore {
    hotkeys: Map<Hotkey['name'], Hotkey>;

    registerHotkey: (
        name: Hotkey['name'],

        key: Hotkey['key'],

        callback: Hotkey['callback']
    ) => void;

    updateHotkeyKey: (name: Hotkey['name'], key: Hotkey['key']) => void;

    unregisterHotkey: (name: Hotkey['name']) => void;
}

export const useHotkeyStore = create<HotkeyStore>()((set) => ({
    hotkeys: new Map(),

    registerHotkey: (name, key, callback) =>
        set((state) => {
            const newHotkeys = new Map(state.hotkeys);
            newHotkeys.set(name, { name, key, callback });

            return {
                hotkeys: newHotkeys,
            };
        }),

    updateHotkeyKey: (name, key) =>
        set((state) => {
            const getHotkey = state.hotkeys.get(name);

            const newHotkeys = new Map(state.hotkeys);

            if (getHotkey) {
                newHotkeys.set(name, { ...getHotkey, key });
            }

            return { hotkeys: newHotkeys };
        }),

    unregisterHotkey: (name) =>
        set((state) => {
            const newHotkeys = new Map(state.hotkeys);
            newHotkeys.delete(name);

            return {
                hotkeys: newHotkeys,
            };
        }),
}));
