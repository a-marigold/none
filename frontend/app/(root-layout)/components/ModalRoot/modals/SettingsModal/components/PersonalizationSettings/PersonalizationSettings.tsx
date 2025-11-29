'use client';

import { useAuthStore } from '@/store/AuthStore';

import settingStyles from './PersonalizationSettings.module.scss';

import SettingsList from '../SettingList';
import type { SettingProps } from '../SettingList';

import SelectButton from '@/UI/SelectButton';

export default function PersonalizationSettings() {
    const user = useAuthStore((state) => state.user);

    const personalizationSettingList: SettingProps[] = [
        {
            title: 'Theme',
            actionChild: <SelectButton title='__current_theme__' />,
        },
    ];

    return (
        <div className={settingStyles['personalization-setting-content']}>
            <SettingsList settingList={personalizationSettingList} />
        </div>
    );
}
