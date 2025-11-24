'use client';

import { useEffect } from 'react';

import { stream } from '@/lib/stream';

import type { SearchQuery } from '@none/shared';

/**
 * Creates a subscribe on state and sends queryState on websocket 'searchUsers' every state change.
 * Uses debounce
 * @param {string} queryState - query state that will will be sent to websocket connection
 *
 *
 *
 * @example
 * ```typescript
 * const [string, setString] = useState('');
 *
 * const sendSearchQuery = useSendSearchQuery(string); // every `string` change the effect will send this string to search
 * ```
 */

export function useSendSearchQuery(queryState: string) {
    useEffect(() => {
        stream.send<SearchQuery>('searchUsers', { query: queryState });
    }, [queryState]);
}
