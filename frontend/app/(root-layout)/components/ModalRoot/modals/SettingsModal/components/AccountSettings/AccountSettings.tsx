'use client';

import { Controller, useForm } from 'react-hook-form';

import { useAuthStore } from '@/store/AuthStore';

import Image from 'next/image';

import { accountInputList, type AccountInput } from './accountInputList';

import SettingInput from '@/UI/SettingInput';
import AccessButton from '@/UI/AccessButton';

import accountStyles from './AccountSettings.module.scss';

export default function AccountSettings() {
    const userName = useAuthStore((state) => state.user?.userName);
    const fullName = useAuthStore((state) => state.user?.fullName);
    const avatar = useAuthStore((state) => state.user?.avatar);

    const { control, handleSubmit } = useForm<Record<AccountInput, string>>({
        defaultValues: {
            'user-name': userName,

            'full-name': fullName,
        },
    });

    return (
        <div className={accountStyles['account-settings']}>
            <div className={accountStyles['image-block']}>
                <Image
                    src={avatar || '/globe.svg'}
                    alt='Profile avatar'
                    width={128}
                    height={128}
                />

                <div className={accountStyles['camera-icon-block']}>
                    <svg width={18} height={18} color='var(--font-color)'>
                        <use href='#camera-icon' />
                    </svg>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(() => alert(''))}
                className={accountStyles['account-form']}
            >
                <div className={accountStyles['input-group']}>
                    {accountInputList.map((inputProps) => (
                        <Controller
                            name={inputProps.htmlId}
                            control={control}
                            render={(fieldControl) => (
                                <SettingInput
                                    {...inputProps}
                                    key={inputProps.htmlId}
                                    value={fieldControl.field.value}
                                />
                            )}
                        />
                    ))}
                </div>

                <p className={accountStyles['notice']}>
                    Your profile helps users recognize you
                </p>

                <AccessButton
                    title='Save changes'
                    aria-label='Save your account changes'
                    className={accountStyles['access-button']}
                    size='small'
                />
            </form>
        </div>
    );
}
