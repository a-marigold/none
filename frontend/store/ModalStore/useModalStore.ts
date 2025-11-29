'use client';

import { create } from 'zustand';

import type { ReactNode } from 'react';

export interface ModalStore {
    mainModal: ReactNode | null;
    subModal: ReactNode | null;

    openMainModal: (modalComponent: ReactNode) => void;

    closeMainModal: () => void;

    openSubModal: (modalComponent: ReactNode) => void;
    closeSubModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
    mainModal: null,
    subModal: null,

    openMainModal: (modalComponent) => set({ mainModal: modalComponent }),
    closeMainModal: () => set({ mainModal: null }),

    openSubModal: (modalComponent) => set({ subModal: modalComponent }),
    closeSubModal: () => set({ subModal: null }),
}));
