import type { InputHTMLAttributes } from 'react';

import hotkeyStyles from './HotkeyList.module.scss';

interface HotkeySettingProps {
    title: string;

    hotkeyKey: string;

    onFocus: InputHTMLAttributes<HTMLInputElement>['onFocus'];
    onBlur: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}
export default function HotkeySetting({
    title,

    hotkeyKey,

    onFocus,
    onBlur,
}: HotkeySettingProps) {
    return (
        <li className={hotkeyStyles['hotkey-setting']}>
            <span className={hotkeyStyles['setting-title']}>{title}</span>

            <input
                type='text'
                className={hotkeyStyles['setting-input']}
                defaultValue={hotkeyKey}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </li>
    );
}
