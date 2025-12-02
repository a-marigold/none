'use client';

import { useToolTip } from '@/hooks/useToolTip';

import { useModalStore } from '@/store/ModalStore/useModalStore';

import Image from 'next/image';

import ProfileModal from '@modals/ProfileModal';

import cutnavStyles from '../CutNavbarContent.module.scss';

export default function CutProfileBlock() {
    const openMainModal = useModalStore((state) => state.openMainModal);

    const closeMainModal = useModalStore((state) => state.closeMainModal);

    const toolTip = useToolTip();

    return (
        <div className={cutnavStyles['profile-block']}>
            <button
                className={`${cutnavStyles['nav-button']} ${cutnavStyles['profile-button']}`}
                aria-label='Open profile'
                onPointerEnter={(event) => {
                    toolTip.show({
                        title: 'Open profile',
                        relativeElement: event.currentTarget,
                        position: 'right',
                    });
                }}
                onPointerLeave={toolTip.hide}
                onClick={(event) => {
                    openMainModal(
                        <ProfileModal
                            relativeElement={event.currentTarget}
                            posX='left'
                            closeMainModal={closeMainModal}
                        />
                    );
                }}
            >
                <Image src={'/globe.svg'} width={24} height={24} alt='' />
            </button>
        </div>
    );
}
