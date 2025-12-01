import { create } from 'zustand';

import type { ToolTipProps } from '@/UI/LabelledElement';

interface ToolTipStore {
    props: ToolTipProps | null;

    setProps: (props: ToolTipProps) => void;
}
export const useToolTipStore = create<ToolTipStore>()((set) => ({
    props: null,
    setProps: (props) => set({ props }),
}));
