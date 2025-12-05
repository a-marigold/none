'use client';

import { useState, useEffect } from 'react';

/**
 * Hook for subscribing to CSS media query changes
 *
 * @param {string} query - Query string in format- "min-width: 1000px", "max-width 1600px"
 *
 * @example
 * ```tsx
 *   const isDesktop = useMediaQuery('max-width: 1600px');
 *
 *   return (
 *      <div>
 *          {isDesktop ? 'Desktop view' : 'Mobile view'}
 *      </div>
 *   );
 * }
 * ```
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia(`(${query})`).matches
    );

    useEffect(() => {
        const mediaQuery =
            typeof window !== 'undefined' && window.matchMedia(`(${query})`);
        if (!mediaQuery) {
            return;
        }

        function checkMediaQuery(event: MediaQueryListEvent) {
            if (event.matches) {
                setMatches(true);
            } else {
                setMatches(false);
            }
        }

        mediaQuery.addEventListener('change', checkMediaQuery);

        return () => {
            mediaQuery.removeEventListener('change', checkMediaQuery);
        };
    }, [query]);

    return matches;
}
