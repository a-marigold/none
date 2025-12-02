'use client';

import { useToolTipStore } from '@/store/ToolTipStore';

import { ToolTipProps } from '@/UI/ToolTip';

// TODO: add docs
/**
 *
 * @returns
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
