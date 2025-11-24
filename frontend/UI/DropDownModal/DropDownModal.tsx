'use client';

import { useEffect, useRef } from 'react';

import type { ReactNode } from 'react';

import { calculateModalPosition } from './calculateModalPosition';

import type { ModalPosY, ModalPosX } from './calculateModalPosition';

import modalStyles from './DropDownModal.module.scss';

export interface DropDownModalProps {
    relativeElement: HTMLElement;

    topChildren: ReactNode;
    bottomChildren?: ReactNode;
    childrenDirection?: 'vertical' | 'horizontal';

    zIndex?: number;

    posY?: ModalPosY;
    posX?: ModalPosX;

    shiftX?: number;
    shiftY?: number;

    onClose: () => void;
}

export default function DropDownModal({
    relativeElement,

    topChildren,
    bottomChildren,
    childrenDirection = 'vertical',

    zIndex = 1000,

    posY = 'top',
    posX = 'center',

    shiftX,
    shiftY,

    onClose,
}: DropDownModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleCalculateModalPosition = () => {
        if (modalRef.current) {
            calculateModalPosition(
                relativeElement,
                modalRef.current,
                posY,
                posX,

                shiftX,
                shiftY
            );
        }
    };

    useEffect(() => {
        handleCalculateModalPosition();

        window.addEventListener('scroll', handleCalculateModalPosition);
        window.addEventListener('resize', handleCalculateModalPosition);

        const elementObserver = new ResizeObserver(
            handleCalculateModalPosition
        );

        elementObserver.observe(relativeElement);

        return () => {
            window.removeEventListener('scroll', handleCalculateModalPosition);
            window.removeEventListener('resize', handleCalculateModalPosition);

            elementObserver.disconnect();
        };
    }, [relativeElement]);

    return (
        <div
            className={modalStyles['modal-backdrop']}
            onClick={onClose}
            style={{ zIndex }}
        >
            <div
                role='menu'
                ref={modalRef}
                className={`${modalStyles['drop-down-modal']} ${modalStyles[childrenDirection]}`}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {topChildren}

                {bottomChildren && (
                    <>
                        <div className={modalStyles['divider-block']}>
                            <div className={modalStyles['divider']} />
                        </div>

                        {bottomChildren}
                    </>
                )}
            </div>
        </div>
    );
}
