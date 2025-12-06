'use client';

import hotkeyStyles from './HotkeyList.module.scss';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { Hotkey } from '@/types/Hotkey';

import HotkeySetting from './HotkeySetting';

export default function HotkeyList() {
    const hotkey = useHotkeyStore((state) => state.hotkeys);

    const hotkeyList: Hotkey[] = [];
    hotkey.forEach((hotkey) => {
        hotkeyList.push(hotkey);
    });

    return (
        <ul className={hotkeyStyles['hotkey-list']}>
            {hotkeyList.map((hotkey) => {
                console.log(hotkey.key);

                return (
                    <HotkeySetting
                        key={hotkey.name}
                        title={hotkey.name}
                        hotkeyKey={hotkey.key}
                        onFocus={() => {}}
                        onBlur={() => {}}
                    />
                );
            })}
        </ul>
    );
}
