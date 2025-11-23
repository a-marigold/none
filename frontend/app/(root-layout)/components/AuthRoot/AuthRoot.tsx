'use client';

import { useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { getUserData, refreshAccessToken } from '@/lib/api/AuthApiClient';

import { useAuthStore } from '@/store/AuthStore';

export default function AuthRoot() {
    const setUser = useAuthStore((state) => state.setUser);

    const { data: userData, isError: isUserError } = useQuery({
        queryKey: ['auth'],
        queryFn: getUserData,
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
        } else if (isUserError) {
            setUser({});
        }
    }, [userData, isUserError]);

    return null;
}
