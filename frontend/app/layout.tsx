import type { Metadata, Viewport } from 'next';
import { Geist, Inter } from 'next/font/google';

import Provider from './provider';

import StreamRoot from './(root-layout)/components/StreamRoot';
import AuthRoot from './(root-layout)/components/AuthRoot';
import HotkeyRoot from '@/app/(root-layout)/components/HotkeyRoot';
import ThemeRoot from './(root-layout)/components/ThemeRoot/ThemeRoot';
import ToolTipRoot from './(root-layout)/components/ToolTipRoot';
import SvgSprites from '@/UI/SvgSprites';

import './globals.scss';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const interVariable = Inter({
    variable: '--font-inter-variable',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'None',
    description: 'None messenger',

    metadataBase: new URL('https://none-m.vercel.app'),

    icons: {
        icon: [{ url: '/icon0.svg', sizes: 'any' }],
        apple: '/apple-icon.png',
    },

    manifest: '/manifest.json',

    openGraph: {
        title: 'None',
        description: 'None messenger',
        url: 'https://none-m.vercel.app',
        images: [
            {
                url: 'https://none-m.vercel.app/opengraph-image.png',
                width: 251,
                height: 100,
                alt: 'None messenger',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};
export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,

    userScalable: false,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='en'
            className={`${geistSans.variable} ${interVariable.variable}`}
        >
            <body>
                <Provider>
                    <AuthRoot />

                    <ThemeRoot />

                    <ToolTipRoot />

                    <StreamRoot />
                    <HotkeyRoot />

                    <SvgSprites />

                    {children}
                </Provider>
            </body>
        </html>
    );
}
