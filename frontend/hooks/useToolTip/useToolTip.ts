'use client';

import { useToolTipStore } from '@/store/ToolTipStore';

import { ToolTipProps } from '@/UI/ToolTip';

export function useToolTip(props: ToolTipProps) {
    const setProps = useToolTipStore((state) => state.setProps);

    const onMouseEnter = () => {
        setProps(props);
    };

    const onMouseLeave = () => {
        setProps(null);
    };

    return { onMouseEnter, onMouseLeave };
}
