import { create } from 'zustand';

import type { ClientUser } from '@/types/ClientUser';

interface AuthStore {
    user: ClientUser | null;
    setUser: (userData: ClientUser | null) => void;

    authorized: boolean | null;
    setAuthorized: (value: boolean | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    user: null,

    authorized: null,

    setUser: (userData) =>
        set((state) => {
            if (userData === null) {
                return { user: null };
            }

            if (Object.keys(userData).length === 0) {
                return { user: {} };
            }

            return {
                user: state.user ? { ...state.user, ...userData } : userData,
            };
        }),

    setAuthorized: (value) => set({ authorized: value }),
}));
