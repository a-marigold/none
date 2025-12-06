import HotkeyList from './components/HotkeyList';

import controlStyles from './ControlSettings.module.scss';

export default function ControlSettings() {
    return (
        <div className={controlStyles['control-settings']}>
            <HotkeyList />
        </div>
    );
}
