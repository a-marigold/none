import { create } from 'zustand';

import type { ToolTipProps } from '@/UI/ToolTip';

interface ToolTipStore {
    props: ToolTipProps | null;

    setProps: (props: ToolTipStore['props']) => void;
}
export const useToolTipStore = create<ToolTipStore>()((set) => ({
    props: null,
    setProps: (props) => set({ props }),
}));
