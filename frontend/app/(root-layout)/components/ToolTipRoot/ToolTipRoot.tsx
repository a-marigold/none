'use client';

import { useToolTipStore } from '@/store/ToolTipStore';

import ToolTip from '@/UI/ToolTip';

export default function ToolTipRoot() {
    const toolTipProps = useToolTipStore((state) => state.props);

    return toolTipProps ? <ToolTip {...toolTipProps} /> : null;
}
