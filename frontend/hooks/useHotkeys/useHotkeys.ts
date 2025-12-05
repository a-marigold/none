// TODO: Add keydown || keyup choice

'use client';

import { useEffect, useRef } from 'react';

import { useHotkeyStore } from '@/store/HotkeyStore';

function hotkeyMatches(key: string, event: KeyboardEvent) {
    const parts = key
        .toLocaleLowerCase()

        .split('+')

        .map((part) => part.trim());

    const hasCtrl = parts.includes('ctrl');
    const hasAlt = parts.includes('alt');
    const hasShift = parts.includes('shift');

    const plainKeys = parts.filter(
        (part) => !['ctrl', 'shift', 'alt'].includes(part)
    );

    const specialMatch =
        (!hasCtrl || event.ctrlKey) &&
        (!hasAlt || event.altKey) &&
        (!hasShift || event.shiftKey);

    const plainMatch =
        plainKeys.length === 0 ||
        plainKeys.some((key) => key === event.key.toLowerCase());

    return specialMatch && plainMatch;
}

/**
 * The function that activate hotkeys and they listeners. Used in Root.
 *
 * @returns {void}
 */
export function useHotkeys(): void {
    const hotkeys = useHotkeyStore((state) => state.hotkeys);
    const hotkeysRef = useRef<typeof hotkeys>(hotkeys);

    useEffect(() => {
        hotkeysRef.current = hotkeys;
    }, [hotkeys]);

    useEffect(() => {
        function listenHotkeys(event: KeyboardEvent) {
            hotkeysRef.current.forEach(({ key, callback }) => {
                if (hotkeyMatches(key, event)) {
                    callback(event);
                }
            });
        }

        document.addEventListener('keydown', listenHotkeys);

        return () => {
            document.removeEventListener('keydown', listenHotkeys);
        };
    }, []);
}
