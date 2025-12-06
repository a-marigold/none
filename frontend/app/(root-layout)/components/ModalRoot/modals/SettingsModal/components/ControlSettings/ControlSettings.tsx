'use client';

import { useControlSettingList } from './useControlSettingList';

import HotkeyList from './components/HotkeyList';
import SettingsList from '../SettingList';

import controlStyles from './ControlSettings.module.scss';

export default function ControlSettings() {
    const controlSettingList = useControlSettingList();

    return (
        <div className={controlStyles['control-settings']}>
            <HotkeyList />
            <SettingsList settingList={controlSettingList} />
        </div>
    );
}
