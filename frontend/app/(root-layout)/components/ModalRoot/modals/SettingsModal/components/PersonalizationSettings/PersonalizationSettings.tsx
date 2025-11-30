'use client';

import { usePersonalizationSettingList } from './usePersonalizationSettingList';

import SettingsList from '../SettingList';

import settingStyles from './PersonalizationSettings.module.scss';

export default function PersonalizationSettings() {
    const personalizationSettingList = usePersonalizationSettingList();

    return (
        <div className={settingStyles['personalization-setting-content']}>
            <SettingsList settingList={personalizationSettingList} />
        </div>
    );
}
