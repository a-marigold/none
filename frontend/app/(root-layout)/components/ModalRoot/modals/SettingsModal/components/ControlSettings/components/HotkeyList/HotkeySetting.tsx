import type { InputHTMLAttributes } from 'react';

import hotkeyStyles from './HotkeyList.module.scss';

interface HotkeySettingProps {
    title: string;

    hotkeyKey: string;

    onBlur: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}
export default function HotkeySetting({
    title,

    hotkeyKey,
    onBlur,
}: HotkeySettingProps) {
    return (
        <li className={hotkeyStyles['hotkey-setting']}>
            <span className={hotkeyStyles['setting-title']}>{title}</span>
            <input
                type='text'
                placeholder='Input a shortcut'
                className={hotkeyStyles['setting-input']}
                defaultValue={hotkeyKey}
                aria-label={`Input a hotkeys for ${title}`}
                onBlur={onBlur}
            />
        </li>
    );
}
