'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModalStore } from '@/store/ModalStore';

import { ApiError } from '@none/shared';
import { loginWithUserName } from '@/lib/api/AuthApiClient';

import { LoginDataSchema } from '@none/shared';
import type { LoginData } from '@none/shared';

import AuthForm from '@/app/authorization/(components)/AuthForm';

import { loginInputList } from './loginInputList';

import PrimaryInput from '@/UI/PrimaryInput';

export default function LoginForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(LoginDataSchema),
        defaultValues: {
            userName: '',
            password: '',
        },
    });

    const router = useRouter();
    const queryClient = useQueryClient();

    async function submit(userData: LoginData) {
        try {
            await loginWithUserName(userData.userName, userData.password);

            queryClient.invalidateQueries({ queryKey: ['auth'] });

            router.push('/');
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.code === 404) {
                    setError('userName', { message: error.message });
                } else if (error.code === 403) {
                    setError('password', { message: error.message });
                }
            }
        }
    }

    const closeMainModal = useModalStore((state) => state.closeMainModal);
    useEffect(() => {
        closeMainModal(); // Needed for close AuthModal that is already opened
    }, []);

    return (
        <AuthForm
            title='Enter your password'
            noValidate
            isLoading={isSubmitting}
            onSubmit={handleSubmit(submit)}
        >
            {loginInputList.map((input) => (
                <Controller
                    key={input.name}
                    control={control}
                    name={input.name}
                    render={({ field, fieldState }) => (
                        <PrimaryInput
                            htmlId={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            autoComplete={input.autoComplete}
                            aria-label={input.ariaLabel}
                            errorText={fieldState.error?.message}
                            isValid={!fieldState.error?.message}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                            value={field.value}
                        />
                    )}
                />
            ))}
        </AuthForm>
    );
}
