'use client';

import { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { useSettingsStore } from '@/store/SettingsStore';

import { mediaBreakpoints } from '@/constants/mediaBreakpoints';

import FullNavbarContent from './components/FullNavbarContent';
import CutNavbarContent from './components/CutNavbarContent';

import navStyles from './Navbar.module.scss';

export default function Navbar() {
    const showNavbar = useSettingsStore((state) => state.showNavbar);
    const setShowNavbar = useSettingsStore((state) => state.setShowNavbar);
    const maxWidthMatches = useMediaQuery(
        `max-width: ${mediaBreakpoints.small}px`
    );

    useEffect(() => {
        document.documentElement.classList.toggle(
            'navbar-opened',
            showNavbar && maxWidthMatches
        );

        return () => {
            document.documentElement.classList.remove('navbar-opened');
        };
    }, [showNavbar, maxWidthMatches]);

    if (maxWidthMatches) {
        return (
            <>
                <AnimatePresence>
                    {showNavbar && (
                        <motion.div
                            initial={{
                                x: '-100%',
                                transition: { duration: 0.12 },
                            }}
                            animate={{ x: '0' }}
                            exit={{
                                x: '-100%',
                                transition: { duration: 0.1 },
                            }}
                            transition={{
                                type: 'tween',
                            }}
                            className={`${navStyles['navbar']} ${navStyles['full-navbar']}`}
                        >
                            <FullNavbarContent />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showNavbar && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.16 }}
                            className={navStyles['navbar-backdrop']}
                            onClick={() => {
                                setShowNavbar(false);
                            }}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }

    return (
        <div
            className={`${navStyles['navbar']} ${
                showNavbar ? navStyles['full-navbar'] : navStyles['cut-navbar']
            }`}
        >
            {showNavbar ? <FullNavbarContent /> : <CutNavbarContent />}
        </div>
    );
}
