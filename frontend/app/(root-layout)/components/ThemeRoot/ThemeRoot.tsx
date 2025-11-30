'use client';

import { useEffect } from 'react';

import { useSettingsStore } from '@/store/SettingsStore';

import { themeMap } from '@/constants/themeList';

export default function ThemeRoot() {
    const currentTheme = useSettingsStore((state) => state.currentTheme);

    useEffect(() => {
        document.body.classList.remove(...Object.values(themeMap));

        document.body.classList.add(themeMap[currentTheme]);
    }, [currentTheme]);

    return null;
}
