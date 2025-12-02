'use client';

import { useAuthStore } from '@/store/AuthStore';
import { useModalStore } from '@/store/ModalStore/useModalStore';

import ProfileModal from '@modals/ProfileModal';

import Image from 'next/image';

import blockStyles from './ProfileBlock.module.scss';

export default function ProfileBlock() {
    const openMainModal = useModalStore((state) => state.openMainModal);
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    const userName = useAuthStore((state) => state.user?.userName);
    const avatar = useAuthStore((state) => state.user?.avatar);

    return (
        <div className={blockStyles['profile-block']}>
            <button
                className={blockStyles['profile-button']}
                aria-label='Open profile'
                onClick={(event) => {
                    openMainModal(
                        <ProfileModal
                            relativeElement={event.currentTarget}
                            closeMainModal={closeMainModal}
                        />
                    );
                }}
            >
                <Image
                    src={avatar || '/globe.svg'}
                    alt=''
                    width={24}
                    height={24}
                    className={blockStyles['profile-image']}
                />

                <div className={blockStyles['name-block']}>
                    <span className={blockStyles['name']}> {userName} </span>
                </div>
            </button>
        </div>
    );
}
