type HotkeyName =
    | 'search'
    | 'settings'
    | 'closeModal'
    | 'openNewChat'
    | 'sendMessage';

export type Hotkey = {
    name: HotkeyName;
    key: string;
    callback: (event?: KeyboardEvent) => void;
};
