'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { useToolTip } from '@/hooks/useToolTip';

import { useSettingsStore } from '@/store/SettingsStore';

import { mediaBreakpoints } from '@/constants/mediaBreakpoints';

import { AnimatePresence, motion } from 'framer-motion';

import Link from 'next/link';

import NavButtons from './components/NavButtons';
import ChatList from './components/ChatList';

import ProfileBlock from './components/ProfileBlock';

import navStyles from '../../Navbar.module.scss';
import fullnavStyles from './FullNavbarContent.module.scss';

export default function FullNavbarContent() {
    const setShowNavbar = useSettingsStore((state) => state.setShowNavbar);

    const maxWidthMatches = useMediaQuery(
        `max-width: ${mediaBreakpoints.small}px`
    );

    const toolTip = useToolTip();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.59 }}
                className={navStyles['navbar-content']}
            >
                <div className={fullnavStyles['head']}>
                    <div className={fullnavStyles['brand-block']}>
                        <Link
                            href='/'
                            aria-label='Go to home page'
                            className={fullnavStyles['home-link']}
                        >
                            <svg
                                width={17}
                                height={16}
                                color='var(--font-color)'
                            >
                                <use href='#none-letter-icon' />
                            </svg>
                        </Link>

                        <button
                            className={navStyles['sidebar-button']}
                            onPointerEnter={(event) => {
                                toolTip.show({
                                    title: 'Close navigation panel',

                                    relativeElement: event.currentTarget,
                                    position: 'right',
                                });
                            }}
                            onPointerLeave={toolTip.hide}
                            onClick={() => {
                                setShowNavbar(false);
                                toolTip.hide();
                            }}
                            aria-label='Close navigation panel'
                        >
                            {maxWidthMatches ? (
                                <svg
                                    width={20}
                                    height={20}
                                    color='var(--secondary-font-color)'
                                >
                                    <use href='#cross-icon' />
                                </svg>
                            ) : (
                                <svg
                                    width={20}
                                    height={20}
                                    color='var(--secondary-font-color)'
                                >
                                    <use href='#sidebar-toggle-icon' />
                                </svg>
                            )}
                        </button>
                    </div>

                    <NavButtons />
                </div>
                <ChatList />

                <ProfileBlock />
            </motion.div>
        </AnimatePresence>
    );
}
