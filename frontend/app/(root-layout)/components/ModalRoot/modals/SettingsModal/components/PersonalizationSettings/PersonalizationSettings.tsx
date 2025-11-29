'use client';

import { useMemo } from 'react';

import { useModalStore } from '@/store/ModalStore';

import settingStyles from './PersonalizationSettings.module.scss';

import SettingsList from '../SettingList';
import type { SettingProps } from '../SettingList';

export default function PersonalizationSettings() {
    const openModal = useModalStore((state) => state.openModal);

    const personalizationSettingList: SettingProps[] = [
        {
            title: 'Theme',
            buttonOptions: useMemo(
                () => ({
                    title: '__CURRENT_THEME__',
                    dropDownChildren: 'penis?',
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
