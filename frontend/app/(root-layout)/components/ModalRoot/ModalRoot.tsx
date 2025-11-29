'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/store/ModalStore';

import {
    lockElementScroll,
    unlockElementScroll,
} from '@/utils/LockElementScroll';

export default function ModalRoot() {
    const mainModal = useModalStore((state) => state.mainModal);

    const subModal = useModalStore((state) => state.subModal);

    useEffect(() => {
        if (mainModal) {
            lockElementScroll(document.body);
        }

        return () => {
            unlockElementScroll(document.body);
        };
    }, [mainModal]);

    if (!mainModal) return null;

    return (
        <>
            {mainModal}
            {subModal}
        </>
    );
}
