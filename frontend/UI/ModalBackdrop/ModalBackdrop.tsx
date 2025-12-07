'use client';

import type { ReactNode } from 'react';

import modalStyles from './ModalBackdrop.module.scss';

interface ModalBackdropProps {
    backdropType?: 'empty' | 'blur';

    onClose?: () => void;

    dataTestid?: string;

    children: ReactNode;
}

export default function ModalBackdrop({
    backdropType = 'blur',
    onClose,

    dataTestid,

    children,
}: ModalBackdropProps) {
    return (
        <div
            className={`${modalStyles['modal-backdrop']} ${
                modalStyles[`type-${backdropType}`]
            }`}
            data-testid={dataTestid}
            onClick={onClose}
        >
            {children}
        </div>
    );
}
