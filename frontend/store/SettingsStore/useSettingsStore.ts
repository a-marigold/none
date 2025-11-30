import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemeName } from '@/types/Theme';

interface SettingsStore {
    showNavbar: boolean;
    setShowNavbar: (value: boolean) => void;

    currentTheme: ThemeName;
    setCurrentTheme: (theme: ThemeName) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            showNavbar: false,

            setShowNavbar: (value) => set({ showNavbar: value }),

            currentTheme: 'ChatGPT',

            setCurrentTheme: (theme) => set({ currentTheme: theme }),
        }),
        {
            name: 'settings-store',
            partialize: (state) => ({ currentTheme: state.currentTheme }),
        }
    )
);
