'use client';

import { useToolTipStore } from '@/store/ToolTipStore';

import { ToolTipProps } from '@/UI/ToolTip';

/**
 * Used to show and hide tooltip, for example, in handlers.
 * Uses `useToolTipStore` and `setProps` inside.
 *
 *
 * @returns
 *
 *
 * `show` - function, that receive tooltip props and shows the tooltip.
 *
 * `hide` - function, that just hide the tooltip.
 */
export function useToolTip() {
    const setProps = useToolTipStore((state) => state.setProps);

    const show = (props: ToolTipProps) => {
        setProps(props);
    };

    const hide = () => {
        setProps(null);
    };

    return { show, hide };
}
