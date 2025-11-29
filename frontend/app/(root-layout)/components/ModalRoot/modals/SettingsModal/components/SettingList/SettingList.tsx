import Setting, { type SettingProps } from './Setting';

import listStyles from './SettingsList.module.scss';

interface SettingsListProps {
    settingList: SettingProps[];
}

export default function SettingsList({ settingList }: SettingsListProps) {
    return (
        <ul className={listStyles['setting-list']}>
            {settingList.map((setting, index) => (
                <Setting
                    key={index}
                    title={setting.title}
                    description={setting.description}
                    actionChild={setting.actionChild}
                />
            ))}
        </ul>
    );
}
