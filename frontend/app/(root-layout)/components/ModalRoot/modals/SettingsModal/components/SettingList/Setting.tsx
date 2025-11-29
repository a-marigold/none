import type { ReactNode } from 'react';

import settingStyles from './SettingsList.module.scss';

export type SettingProps = {
    title: string;
    description?: string;

    actionChild: ReactNode;
};
export default function Setting({
    title,
    description,
    actionChild,
}: SettingProps) {
    return (
        <li className={settingStyles['setting']}>
            <div className={settingStyles['setting-head']}>
                <span className={settingStyles['setting-title']}>{title}</span>

                {actionChild}
            </div>

            {description && (
                <p className={settingStyles['setting-description']}>
                    {description}
                </p>
            )}
        </li>
    );
}
