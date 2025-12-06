type HotkeyName =
    | 'Search'
    | 'Settings'
    | 'Close Main Modal'
    | 'Open New Chat'
    | 'Send Message';

export type Hotkey = {
    name: HotkeyName;
    key: string;
    callback: (event?: KeyboardEvent) => void;
};
