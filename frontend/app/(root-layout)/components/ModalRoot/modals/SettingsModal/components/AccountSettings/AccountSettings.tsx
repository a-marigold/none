'use client';

import { Controller, useForm } from 'react-hook-form';

import { accountInputList } from './accountInputList';

import SettingInput, { type SettingInputProps } from '@/UI/SettingInput';
import AccessButton from '@/UI/AccessButton';

import accountStyles from './AccountSettings.module.scss';

export default function AccountSettings() {
    const { control, handleSubmit } = useForm();

    return (
        <div className={accountStyles['account-settings']}>
            <div className={accountStyles['image-block']}></div>

            <form className={accountStyles['account-form']}>
                {accountInputList.map((inputProps) => (
                    // <Controller control={control}  />
                    <SettingInput key={inputProps.htmlId} {...inputProps} />
                ))}
            </form>

            <p className={accountStyles['notice']}>
                Your profile helps users recognize you
            </p>

            <AccessButton
                title='Save changes'
                aria-label='Save your account changes'
                size='small'
                onClick={() => {
                    alert();
                }}
            />
        </div>
    );
}
