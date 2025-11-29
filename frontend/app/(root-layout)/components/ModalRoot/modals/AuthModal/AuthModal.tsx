'use client';

import { useEffect, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import type { BasicModalProps } from '@/types/ModalProps';

import { authVariantList, authVariantHandler } from './authVariantList';

import ModalBackdrop from '@/UI/ModalBackdrop';

import AccessButton from '@/UI/AccessButton';
import SecondaryButton from '@/UI/SecondaryButton';

import authStyles from './AuthModal.module.scss';

export default function AuthModal({ closeMainModal }: BasicModalProps) {
    const router = useRouter();
    useEffect(() => {
        router.prefetch('/authorization/log-in');

        router.prefetch('/authorization/create-account');
    }, [router]);
    const [isPending, startTransition] = useTransition();

    return (
        <ModalBackdrop>
            <div
                role='dialog'
                aria-modal='true'
                className={`${authStyles['auth-modal']} ${
                    isPending ? authStyles['pending'] : ''
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={authStyles['head']}>
                    <button
                        className={authStyles['close-button']}
                        onClick={closeMainModal}
                    >
                        <svg width={20} height={20} color='var(--font-color)'>
                            <use href='#cross-icon' />
                        </svg>
                    </button>
                </div>
                <div className={authStyles['main-content']}>
                    <h1 className={authStyles['title']}>Login or register</h1>

                    <div className={authStyles['auth-content']}>
                        <div className={authStyles['oauth-list']}>
                            {authVariantList.map((variant) => (
                                <SecondaryButton
                                    key={variant.type}
                                    title={variant.title}
                                    icon={variant.icon}
                                    aria-label={variant.title}
                                    onClick={() => {
                                        authVariantHandler(variant.type);
                                    }}
                                />
                            ))}
                        </div>

                        <div className={authStyles['divider-block']}>
                            <div className={authStyles['divider']} />
                            <span className={authStyles['divider-text']}>
                                OR
                            </span>
                            <div className={authStyles['divider']} />
                        </div>

                        <SecondaryButton
                            title='Log in'
                            onClick={() => {
                                startTransition(() => {
                                    router.push('/authorization/log-in');
                                });
                            }}
                            aria-label='Log in with user name and password'
                        />

                        <AccessButton
                            title='Register'
                            aria-label='Sign in with user name and password'
                            onClick={() => {
                                startTransition(() => {
                                    router.push(
                                        '/authorization/create-account'
                                    );
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </ModalBackdrop>
    );
}
