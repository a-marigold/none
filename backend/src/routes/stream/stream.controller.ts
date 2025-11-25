import type { FastifyRequest } from 'fastify';

import type { WebSocket } from 'ws';

import { streamEmitter } from '@/lib/streamEmitter';

import {
    validateStreamMessage,
    validateChatMessage,
    validateSearchQuery,
    createBaseError,
    createStreamMessage,
    baseError,
} from './stream.service';

import type { Message, SearchUser } from '@none/shared';

export async function stream(connection: WebSocket, request: FastifyRequest) {
    streamEmitter.initialize(connection, request);

    connection.on('message', (data) => {
        const parseData = JSON.parse(data.toString());

        if (!validateStreamMessage(parseData)) {
            return connection.send(baseError);
        }
    });
}

streamEmitter.on('newChatMessage', ({ data, send }) => {
    if (!validateChatMessage(data)) {
        return send(createBaseError('Invalid chat message struct'));
    }

    const streamMessage = createStreamMessage<Message>('newChatMessage', {
        ...data,
        sender: '__TEMPORARY_USER__', // TODO: temporarily
    });

    return send(streamMessage);
});

streamEmitter.on('searchUsersQuery', ({ data, send, request }) => {
    if (!validateSearchQuery(data)) {
        return send(baseError);
    }

    const users = request.server.userTrie.searchByPrefix(data.query);

    const streamMessage = createStreamMessage<SearchUser[]>(
        'searchUsersResponse',
        users
    );

    return send(streamMessage);
});
