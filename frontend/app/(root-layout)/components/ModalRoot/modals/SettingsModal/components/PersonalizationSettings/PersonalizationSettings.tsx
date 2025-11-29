'use client';

import { useMemo } from 'react';

import settingStyles from './PersonalizationSettings.module.scss';

import SettingsList from '../SettingList';
import type { SettingProps } from '../SettingList';

export default function PersonalizationSettings() {
    const personalizationSettingList: SettingProps[] = [
        {
            title: 'Theme',
            buttonOptions: useMemo(
                () => ({
                    title: '__CURRENT_THEME__',
                    dropDownChildren: 'hello',
                }),
                []
            ),
        },
    ];

    return (
        <div className={settingStyles['personalization-setting-content']}>
            <SettingsList settingList={personalizationSettingList} />
        </div>
    );
}
