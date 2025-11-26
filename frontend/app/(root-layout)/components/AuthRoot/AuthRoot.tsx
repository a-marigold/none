'use client';

import { useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { clientGetUserData, refreshAccessToken } from '@/lib/api/AuthApiClient';

import { useAuthStore } from '@/store/AuthStore';

import type { ClientUser } from '@/types/ClientUser';

export default function AuthRoot() {
    const setUser = useAuthStore((state) => state.setUser);

    const setAuthorized = useAuthStore((state) => state.setAuthorized);

    const { data: userData, isError: isUserError } = useQuery({
        queryKey: ['auth'],
        queryFn: clientGetUserData,
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: 20 * 60 * 1000,
    });

    const { mutate: handleRefresh } = useMutation({
        mutationFn: refreshAccessToken,
        retry: false,
    });

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            handleRefresh();
        }, 11 * 60 * 1000);

        function refreshOnFocus() {
            handleRefresh();
        }

        window.addEventListener('focus', refreshOnFocus);

        return () => {
            clearInterval(refreshInterval);
            window.removeEventListener('focus', refreshOnFocus);
        };
    }, []);

    useEffect(() => {
        if (userData) {
            setUser(userData);
            setAuthorized(true);
        } else if (isUserError) {
            setUser({});
            setAuthorized(false);
        }
    }, [userData, isUserError]);

    return null;
}
