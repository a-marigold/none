import { apiOrigin } from '@/utils/GetApiOrigin';

import { handleApiError } from '@/utils/HandleApiError';

import type { Chat } from '@none/shared';

export async function getChats() {
    const response = await fetch(`${apiOrigin}/chats`, {
        method: 'GET',

        credentials: 'include',
    });

    await handleApiError(response);

    const data: Chat[] = await response.json();

    return data;
}

export async function createChat(chat: Chat) {
    const prepareChat = JSON.stringify(chat);

    const response = await fetch(`${apiOrigin}/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: prepareChat,
    });

    await handleApiError(response);

    const data: Chat = await response.json();

    return data;
}
