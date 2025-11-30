'use client';

import { usePersonalizationSettingList } from './usePersonalizationSettingList';

import SettingsList from '../SettingList';

export default function PersonalizationSettings() {
    const personalizationSettingList = usePersonalizationSettingList();

    return <SettingsList settingList={personalizationSettingList} />;
}
