import controlStyles from './ControlSettings.module.scss';

import { useHotkeyStore } from '@/store/HotkeyStore';

export default function HotkeyList() {
    const hotkey = useHotkeyStore((state) => state.hotkeys);

    return <div className={controlStyles['hotkey-list']}></div>;
}
