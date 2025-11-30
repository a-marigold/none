'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { BasicModalProps } from '@/types/ModalProps';

import type { SettingTab } from './SettingsTypes';

import ModalBackdrop from '@/UI/ModalBackdrop';
import PrimaryButton from '@/UI/PrimaryButton';
import LabelledElement from '@/UI/LabelledElement';

import GeneralSettings from './components/PersonalizationSettings';
import AccountSettings from './components/AccountSettings';

import settingStyles from './SettingsModal.module.scss';

const settingButtonList: {
    name: SettingTab;
    ariaLabel: string;
    icon: ReactNode;
    settingContent: ReactNode;
}[] = [
    {
        name: 'General',
        ariaLabel: 'Open the general settings',
        icon: (
            <svg width={20} height={20} color='var(--font-color)'>
                <use href='#gear-icon' />
            </svg>
        ),
        settingContent: <GeneralSettings />,
    },
    {
        name: 'Account',
        ariaLabel: 'Open the account settings',
        icon: (
            <svg width={20} height={20} color='var(--font-color)'>
                <use href='#profile-icon' />
            </svg>
        ),
        settingContent: <AccountSettings />,
    },
];

export default function SettingsModal({ closeMainModal }: BasicModalProps) {
    const [currentTab, setCurrentTab] = useState<SettingTab>('General');

    const hotkeys = useHotkeyStore((state) => state.hotkeys);

    const closeMainModalHotkey = hotkeys.find(
        (hotkey) => hotkey.name === 'closeMainModal'
    );

    return (
        <ModalBackdrop onClose={closeMainModal} backdropType='blur'>
            <div
                role='dialog'
                aria-modal='true'
                className={settingStyles['settings-modal']}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={settingStyles['navbar']}>
                    <LabelledElement
                        title='Close the settings window'
                        position='right'
                        subtitle={closeMainModalHotkey?.key}
                    >
                        <button
                            className={settingStyles['close-button']}
                            aria-label={`Close the settings window ${closeMainModalHotkey?.key}`}
                            onClick={closeMainModal}
                        >
                            <svg
                                width={20}
                                height={20}
                                color='var(--font-color)'
                            >
                                <use href='#cross-icon' />
                            </svg>
                        </button>
                    </LabelledElement>

                    <div className={settingStyles['setting-list']}>
                        {settingButtonList.map((setting) => (
                            <PrimaryButton
                                key={setting.name}
                                title={setting.name}
                                aria-label={setting.ariaLabel}
                                icon={setting.icon}
                                className={
                                    setting.name === currentTab
                                        ? settingStyles['tab-active']
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrentTab(setting.name);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className={settingStyles['setting-content']}>
                    <div className={settingStyles['content-head']}>
                        <p className={settingStyles['content-title']}>
                            {currentTab}
                        </p>
                    </div>

                    {
                        settingButtonList.find(
                            (setting) => setting.name === currentTab
                        )?.settingContent
                    }
                </div>
            </div>
        </ModalBackdrop>
    );
}
