import { create } from 'zustand';

import type { Theme } from '@/types/Theme';

interface SettingsStore {
    showNavbar: boolean;
    setShowNavbar: (value: boolean) => void;

    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
    showNavbar: false,

    setShowNavbar: (value) => set({ showNavbar: value }),

    theme: 'ChatGPT',

    setTheme: (theme) => set({ theme }),
}));
