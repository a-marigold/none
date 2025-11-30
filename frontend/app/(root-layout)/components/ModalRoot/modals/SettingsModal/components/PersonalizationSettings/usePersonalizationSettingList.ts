import { useMemo } from 'react';

import { useSettingsStore } from '@/store/SettingsStore';

import type { SettingProps } from '../SettingList';
import type { PrimaryButtonProps } from '@/UI/PrimaryButton';

import { themeMap } from '@/constants/themeList';
import type { ThemeName } from '@/types/Theme';

export function usePersonalizationSettingList() {
    const currentTheme = useSettingsStore((state) => state.currentTheme);
    const setCurrentTheme = useSettingsStore((state) => state.setCurrentTheme);

    return useMemo<SettingProps[]>(
        () => [
            {
                title: 'Color scheme',
                buttonOptions: {
                    title: currentTheme,
                    childrenPropList: Object.keys(
                        themeMap
                    ).map<PrimaryButtonProps>((theme) => ({
                        title: theme,
                        'aria-label': `Change theme to ${theme}`,
                        onClick: () => {
                            setCurrentTheme(theme as ThemeName);
                        },
                    })),
                },
            },
        ],
        []
    );
}
