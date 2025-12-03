'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthStore } from '@/store/AuthStore';

import { ApiError, SafeUserSchema } from '@none/shared';

import { partlyUpdateAccount, updateUserAvatar } from '@/lib/api/AuthApiClient';

import { accountInputList, type AccountInput } from './accountInputList';

import ImageInput from '@/UI/ImageInput';
import SettingInput from '@/UI/SettingInput';

import AccessButton from '@/UI/AccessButton';

import accountStyles from './AccountSettings.module.scss';

type AccountFormFields = Record<AccountInput, string>;

export default function AccountSettings() {
    const userName = useAuthStore((state) => state.user?.userName);
    const fullName = useAuthStore((state) => state.user?.fullName);

    const avatar = useAuthStore((state) => state.user?.avatar);

    const setUser = useAuthStore((state) => state.setUser);

    const { control, handleSubmit, formState, setError } =
        useForm<AccountFormFields>({
            resolver: zodResolver(
                SafeUserSchema.pick({
                    userName: true,

                    fullName: true,
                })
            ),

            defaultValues: {
                userName,

                fullName,
            },
        });

    async function submit(data: AccountFormFields) {
        try {
            const updateUser = await partlyUpdateAccount(data);

            setUser(updateUser);
        } catch (error) {
            if (error instanceof ApiError) {
                setError('root', { message: error.message });
            }
        }
    }

    async function handleUpdateUserAvatar(avatar: File) {
        try {
            const updateUser = await updateUserAvatar(avatar);

            setUser({ avatar: updateUser.avatar });
        } catch (error) {
            if (error instanceof ApiError) {
                alert(error.message); // TODO: temporarily
            }
        }
    }

    return (
        <div className={accountStyles['account-settings']}>
            <ImageInput
                src={avatar || '/globe.svg'}
                alt='Your profile avatar'
                size={128}
                onChange={(event) => {
                    if (event.target.files) {
                        handleUpdateUserAvatar(event.target.files[0]);
                    }
                }}
            />

            <form
                onSubmit={handleSubmit(submit)}
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
                                    isValid={
                                        !fieldControl.fieldState.error ||
                                        !fieldControl.formState.errors.root
                                    }
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
