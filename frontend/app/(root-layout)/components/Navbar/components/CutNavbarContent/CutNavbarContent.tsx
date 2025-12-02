'use client';

import { useToolTip } from '@/hooks/useToolTip';

import { useSettingsStore } from '@/store/SettingsStore';

import { AnimatePresence, motion } from 'framer-motion';

import CutNavButtons from './components/CutNavButtons';
import CutProfileBlock from './components/CutProfileBlock';

import navStyles from '../../Navbar.module.scss';
import cutnavStyles from './CutNavbarContent.module.scss';

export default function CutNavbarContent() {
    const setShowNavbar = useSettingsStore((state) => state.setShowNavbar);

    const toolTip = useToolTip();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={navStyles['navbar-content']}
            >
                <div className={cutnavStyles['head']}>
                    <button
                        className={`${navStyles['sidebar-button']} ${cutnavStyles['sidebar-button']}`}
                        onPointerEnter={(event) => {
                            toolTip.show({
                                title: 'Open navigation panel',

                                relativeElement: event.currentTarget,
                                position: 'right',
                            });
                        }}
                        onPointerLeave={toolTip.hide}
                        onClick={() => setShowNavbar(true)}
                        aria-label='Open navigation panel'
                    >
                        <svg
                            width={20}
                            height={20}
                            color='var(--font-color)'
                            className={cutnavStyles['sidebar-toggle-icon']}
                        >
                            <use href='#sidebar-toggle-icon' />
                        </svg>

                        <svg
                            width={17}
                            height={16}
                            color='var(--font-color)'
                            className={cutnavStyles['none-letter-icon']}
                        >
                            <use href='#none-letter-icon' />
                        </svg>
                    </button>

                    <CutNavButtons />
                </div>

                <CutProfileBlock />
            </motion.div>
        </AnimatePresence>
    );
}
