'use client';

import { create } from 'zustand';

import type { ReactNode } from 'react';

export interface ModalStore {
    currentModal: ReactNode | null;

    openModal: (modalComponent: ReactNode) => void;

    closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
    currentModal: null,

    openModal: (modalComponent) => set({ currentModal: modalComponent }),
    closeModal: () => set({ currentModal: null }),
}));
