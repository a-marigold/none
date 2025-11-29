type HotkeyName =
    | 'search'
    | 'settings'
    | 'closeMainModal'
    | 'openNewChat'
    | 'sendMessage';

export type Hotkey = {
    name: HotkeyName;
    key: string;
    callback: (event?: KeyboardEvent) => void;
};
