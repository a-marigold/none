'use client';

import { useCopyFlag } from '@/hooks/useCopyFlag/useCopyFlag';

import { useToolTip } from '@/hooks/useToolTip';

import { useAuthStore } from '@/store/AuthStore';

import { useModalStore } from '@/store/ModalStore/useModalStore';

import type { BasicModalProps } from '@/types/ModalProps';

import SettingsModal from '@modals/SettingsModal';

import type { DropDownModalProps } from '@/UI/DropDownModal';

import DropDownModal from '@/UI/DropDownModal';

import PrimaryButton from '@/UI/PrimaryButton';

export type ProfileModalProps = Pick<
    DropDownModalProps,
    'relativeElement' | 'posY' | 'posX' | 'shiftX' | 'shiftY'
> &
    BasicModalProps;

export default function ProfileModal({
    closeMainModal,

    ...dropDownProps
}: ProfileModalProps) {
    const openMainModal = useModalStore((state) => state.openMainModal);

    const userName = useAuthStore((state) => state.user?.userName);

    const { copyFlag: nameCopyFlag, setCopyFlag: setNameCopyFlag } =
        useCopyFlag(2);

    const toolTip = useToolTip();

    const nameToolTipTitle = nameCopyFlag ? 'Copied!' : 'Copy your username';

    return (
        <DropDownModal
            {...dropDownProps}
            onClose={closeMainModal}
            topChildren={
                <>
                    <PrimaryButton
                        title={userName || ''}
                        aria-label='Copy your usernames'
                        role='menuitem'
                        onPointerEnter={(event) => {
                            toolTip.show({
                                title: nameToolTipTitle,

                                relativeElement: event.currentTarget,
                                position: 'top',
                            });
                        }}
                        onPointerLeave={toolTip.hide}
                        onClick={(event) => {
                            navigator.clipboard.writeText(userName || '');
                            if (!nameCopyFlag) {
                                setNameCopyFlag(true);
                            }

                            toolTip.show({
                                title: 'Copied!',

                                relativeElement: event.currentTarget,
                                position: 'top',
                            });
                        }}
                        icon={
                            <svg
                                width={20}
                                height={20}
                                color='var(--secondary-font-color)'
                            >
                                <use href='#profile-icon' />
                            </svg>
                        }
                    />

                    <PrimaryButton
                        title='Settings'
                        aria-label='Open settings window'
                        role='menuitem'
                        onClick={() => {
                            openMainModal(
                                <SettingsModal
                                    closeMainModal={closeMainModal}
                                />
                            );
                        }}
                        icon={
                            <svg
                                width={20}
                                height={20}
                                color='var(--secondary-font-color)'
                            >
                                <use href='#gear-icon' />
                            </svg>
                        }
                    />
                </>
            }
            bottomChildren={
                <>
                    <PrimaryButton
                        title='Log Out'
                        aria-label='Log out from your profile'
                        role='menuitem'
                        icon={
                            <svg
                                width={20}
                                height={20}
                                color='var(--secondary-font-color)'
                            >
                                <use href='#logout-icon' />
                            </svg>
                        }
                    />
                </>
            }
        />
    );
}
