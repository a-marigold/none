import { apiOrigin } from '@/utils/GetApiOrigin';

import { handleApiError } from '@/utils/HandleApiError';

import type { RegisterData } from '@none/shared';
import type { SafeUser } from '@none/shared';

export async function checkUser(userName: string) {
    const response = await fetch(
        `${apiOrigin}/auth/check-user/${userName}`,

        {
            method: 'GET',
        }
    );

    await handleApiError(response);
}

export async function register(userData: RegisterData) {
    const prepareUser = JSON.stringify(userData);

    const response = await fetch(`${apiOrigin}/auth/register`, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        credentials: 'include',

        body: prepareUser,
    });

    await handleApiError(response);
}

export async function getUserData() {
    const response = await fetch(`${apiOrigin}/auth/me`, {
        method: 'GET',

        credentials: 'include',
    });

    await handleApiError(response);

    const data: SafeUser = await response.json();

    return data;
}

export async function refreshAccessToken() {
    const response = await fetch(`${apiOrigin}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    });

    await handleApiError(response);

    return {};
}

export async function loginWithUserName(userName: string, password: string) {
    const prepareUser = JSON.stringify({ userName, password });

    const response = await fetch(`${apiOrigin}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: prepareUser,
    });

    await handleApiError(response);
}
