import type { ReactNode } from 'react';

import listStyles from './SettingsList.module.scss';

export type Setting = {
    title: string;
    description?: string;

    actionChild: ReactNode;
};

interface SettingsListProps {
    settingList: Setting[];
}
export default function SettingsList({ settingList }: SettingsListProps) {
    return (
        <ul className={listStyles['setting-list']}>
            {settingList.map((setting) => (
                <li className={listStyles['setting']}>
                    <div className={listStyles['setting-head']}>
                        <span className={listStyles['setting-title']}>
                            {setting.title}
                        </span>

                        {setting.actionChild}
                    </div>

                    {setting.description && (
                        <p className={listStyles['setting-description']}>
                            {setting.description}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    );
}
