'use client';

import { useEffect } from 'react';

import { useSettingsStore } from '@/store/SettingsStore';

import { themeList } from '@/constants/themeList';

export default function ThemeRoot() {
    const theme = useSettingsStore((state) => state.theme);

    useEffect(() => {
        document.body.classList.remove(...themeList);

        document.body.classList.add(theme);
    }, [theme]);

    return null;
}
