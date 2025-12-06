import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemeName } from '@/types/Theme';

// TODO: remove the settings persistance in DB

interface SettingsStore {
    showNavbar: boolean;
    setShowNavbar: (value: boolean) => void;

    currentTheme: ThemeName;

    setCurrentTheme: (theme: ThemeName) => void;

    chatStackLength: number;

    setChatStackLength: (value: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            showNavbar: false,

            setShowNavbar: (value) => set({ showNavbar: value }),

            currentTheme: 'ChatGPT',

            setCurrentTheme: (theme) => set({ currentTheme: theme }),

            chatStackLength: 3,
            setChatStackLength: (value) => set({ chatStackLength: value }),
        }),
        {
            name: 'settings-store',
            partialize: (state) => ({
                currentTheme: state.currentTheme,
                chatStackLength: state.chatStackLength,
            }),
        }
    )
);
