'use client';

import { useState, useEffect } from 'react';

import { stream } from '@/lib/stream';

import type { SearchUser } from '@none/shared';

/**
 * Creates a subscribe on state and sends queryState on websocket 'searchUsers' every state change.
 * Uses debounce.
 * @param {string} queryState - query state that will be sent to websocket connection
 *
 *
 *
 * @example
 * ```tsx
 * const [string, setString] = useState('');
 *
 * const {users, error} = useSendSearchQuery(string); // every `string` change the effect will send this string to search
 *
 * return error ? (
 *     <p> {error} </p> )
 *     : (
 *         <ul> {users.map((user) => <li> {user.name} </li>)} </ul>
 *     )
 * ```
 */

export function useSendSearchQuery(queryState: string) {
    const [users, setUsers] = useState<SearchUser[]>([]);

    useEffect(() => {
        stream.send('searchUsersQuery', { query: queryState });
    }, [queryState]);

    useEffect(() => {
        stream.onmessage('searchUsersResponse', (data) => {
            setUsers(data.users);
        });

        return () => {
            setUsers([]);
        };
    }, []);

    return { users };
}
