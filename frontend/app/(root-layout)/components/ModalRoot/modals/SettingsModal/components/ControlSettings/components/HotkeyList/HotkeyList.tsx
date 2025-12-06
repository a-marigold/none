'use client';

import hotkeyStyles from './HotkeyList.module.scss';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { Hotkey } from '@/types/Hotkey';

import HotkeySetting from './HotkeySetting';

export default function HotkeyList() {
    const hotkey = useHotkeyStore((state) => state.hotkeys);
    const updateHotkeyKey = useHotkeyStore((state) => state.updateHotkeyKey);

    const hotkeyList: Hotkey[] = [];
    hotkey.forEach((hotkey) => {
        hotkeyList.push(hotkey);
    });

    return (
        <ul className={hotkeyStyles['hotkey-list']}>
            {hotkeyList.map((hotkey) => (
                <HotkeySetting
                    key={hotkey.name}
                    title={hotkey.name}
                    hotkeyKey={hotkey.key}
                    onBlur={(event) => {
                        updateHotkeyKey(hotkey.name, event.target.value);
                    }}
                />
            ))}
        </ul>
    );
}
