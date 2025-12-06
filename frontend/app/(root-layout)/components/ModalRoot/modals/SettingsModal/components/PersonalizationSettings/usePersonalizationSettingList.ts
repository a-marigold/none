import { useMemo } from 'react';

import { useSettingsStore } from '@/store/SettingsStore';

import type { SettingProps } from '../SettingList';
import type { PrimaryButtonProps } from '@/UI/PrimaryButton';

import { themeMap } from '@/constants/themeList';
import type { ThemeName } from '@/types/Theme';

export function usePersonalizationSettingList(): SettingProps[] {
    const currentTheme = useSettingsStore((state) => state.currentTheme);

    const setCurrentTheme = useSettingsStore((state) => state.setCurrentTheme);

    return useMemo(
        () => [
            {
                title: 'Color scheme',
                description: 'Beta',
                buttonOptions: {
                    title: currentTheme,
                    'aria-label': 'Open theme selection modal',
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
        [currentTheme, setCurrentTheme]
    );
}
