import type { FastifyRequest } from 'fastify';

import type { WebSocket } from 'ws';

import { streamEmitter } from '@/lib/streamEmitter';

import {
    createBaseError,
    createStreamMessage,
    baseError,
} from './stream.service';

import { validateStreamData } from '@none/shared';

export async function stream(connection: WebSocket, request: FastifyRequest) {
    streamEmitter.initialize(connection, request);
}

streamEmitter.on('newChatMessage', ({ data, send, server }) => {
    if (!validateStreamData('newChatMessage', data)) {
        return send(
            createBaseError({ message: 'Invalid chat message struct' })
        );
    }

    const streamMessage = createStreamMessage('newChatMessage', {
        ...data,
        sender: '__TEMPORARY_USER__', // TODO: temporarily
    });

    return send(streamMessage);
});

streamEmitter.on('searchUsersQuery', ({ data, send, server }) => {
    if (!validateStreamData('searchUsersQuery', data)) {
        return send(baseError);
    }

    const users = server.userTrie.searchByPrefix(data.query);

    const streamMessage = createStreamMessage('searchUsersResponse', { users });

    return send(streamMessage);
});
