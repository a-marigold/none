'use client';

import Image from 'next/image';

import { useModalStore } from '@/store/ModalStore/useModalStore';

import ProfileModal from '@modals/ProfileModal';

import LabelledElement from '@/UI/LabelledElement';

import cutnavStyles from '../CutNavbarContent.module.scss';

export default function CutProfileBlock() {
    const openMainModal = useModalStore((state) => state.openMainModal);

    const closeMainModal = useModalStore((state) => state.closeMainModal);

    return (
        <div className={cutnavStyles['profile-block']}>
            <LabelledElement title='Open profile' position='right'>
                <button
                    className={`${cutnavStyles['nav-button']} ${cutnavStyles['profile-button']}`}
                    aria-label='Open profile'
                    onClick={(event) =>
                        openMainModal(
                            <ProfileModal
                                relativeElement={event.currentTarget}
                                posX='left'
                                closeMainModal={closeMainModal}
                            />
                        )
                    }
                >
                    <Image src={'/globe.svg'} width={24} height={24} alt='' />
                </button>
            </LabelledElement>
        </div>
    );
}
