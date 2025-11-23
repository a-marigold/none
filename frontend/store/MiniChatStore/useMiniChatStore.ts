import { create } from 'zustand';

interface MiniChatStore {
    redirectedChat: string;
    setRedirectedChat: (chatPublicId: string) => void;

    message: string;
    setMessage: (newMessage: string) => void;

    receiver: string;
    setReceiver: (newReceiver: string) => void;
}

export const useMiniChatStore = create<MiniChatStore>()((set) => ({
    message: '',
    redirectedChat: '',
    receiver: '',

    setRedirectedChat: (chatPublicId) => set({ redirectedChat: chatPublicId }),

    setMessage: (newMessage) => set({ message: newMessage }),

    setReceiver: (newReceiver) => set({ receiver: newReceiver }),
}));
