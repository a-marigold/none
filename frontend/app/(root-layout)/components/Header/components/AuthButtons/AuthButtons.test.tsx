import { vi, describe, it, expect, beforeEach } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import ModalRoot from '../../../ModalRoot';
import AuthButtons from './AuthButtons';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),

        prefetch: vi.fn(),
    }),
}));

beforeEach(() => {
    render(
        <>
            <ModalRoot />

            <AuthButtons />
        </>
    );
});

describe('AuthModal', () => {
    it('should open when the auth-button clicked', () => {
        expect(screen.queryByTestId('auth-modal')).toBeNull();

        fireEvent.click(screen.getByTestId('login-button'));

        expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    });

    it('should not close when the modal backdrop clicked', () => {
        fireEvent.click(screen.getByTestId('auth-modal-backdrop'));

        expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    });
});
