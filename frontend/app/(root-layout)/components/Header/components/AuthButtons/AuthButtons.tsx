'use client';

import { useModalStore } from '@/store/ModalStore';

import AuthModal from '@modals/AuthModal';

import AccessButton from '@/UI/AccessButton';
import type { AccessButtonProps } from '@/UI/AccessButton/AccessButton';

import headerStyles from './AuthButtons.module.scss';

const authButtonList: {
    title: string;
    variant: AccessButtonProps['variant'];

    size: AccessButtonProps['size'];

    ariaLabel: string;
}[] = [
    {
        title: 'Login',
        variant: 'filled',
        size: 'small',

        ariaLabel: 'Login or register',
    },
    {
        title: 'Register for free',
        variant: 'empty-filled',

        size: 'small',

        ariaLabel: 'Login or register',
    },
];

export default function AuthButtons() {
    const openMainModal = useModalStore((state) => state.openMainModal);
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    return (
        <div role='group' className={headerStyles['auth-button-group']}>
            {authButtonList.map((button) => (
                <AccessButton
                    key={button.title}
                    title={button.title}
                    variant={button.variant}
                    size={button.size}
                    aria-label={button.ariaLabel}
                    onClick={() =>
                        openMainModal(
                            <AuthModal closeMainModal={closeMainModal} />
                        )
                    }
                />
            ))}
        </div>
    );
}
