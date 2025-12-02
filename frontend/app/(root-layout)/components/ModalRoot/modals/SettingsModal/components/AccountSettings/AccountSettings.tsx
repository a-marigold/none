'use client';

import { Controller, useForm } from 'react-hook-form';

import { useAuthStore } from '@/store/AuthStore';

import { accountInputList, type AccountInput } from './accountInputList';

import ImageInput from '@/UI/ImageInput';
import SettingInput from '@/UI/SettingInput';

import AccessButton from '@/UI/AccessButton';

import accountStyles from './AccountSettings.module.scss';

export default function AccountSettings() {
    const userName = useAuthStore((state) => state.user?.userName);
    const fullName = useAuthStore((state) => state.user?.fullName);
    const avatar = useAuthStore((state) => state.user?.avatar);

    const setUser = useAuthStore((state) => state.setUser);

    const { control, handleSubmit, formState } = useForm<
        Record<AccountInput, string>
    >({
        defaultValues: {
            userName,

            fullName,
        },
    });

    return (
        <div className={accountStyles['account-settings']}>
            <ImageInput
                src={avatar || '/globe.svg'}
                alt='Your profile avatar'
                size={128}
                onChange={(event) => {
                    if (event.target.files) {
                        setUser({
                            avatar: URL.createObjectURL(event.target.files[0]),
                        });
                    }
                }}
            />

            <form
                onSubmit={handleSubmit(() => alert(''))}
                className={accountStyles['account-form']}
            >
                <div className={accountStyles['input-group']}>
                    {accountInputList.map((inputProps) => (
                        <Controller
                            key={inputProps.htmlId}
                            name={inputProps.htmlId}
                            control={control}
                            render={(fieldControl) => (
                                <SettingInput
                                    {...inputProps}
                                    value={fieldControl.field.value}
                                    onChange={(event) => {
                                        fieldControl.field.onChange(
                                            event.target.value
                                        );
                                    }}
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
                    disabled={formState.isSubmitting}
                />
            </form>
        </div>
    );
}
