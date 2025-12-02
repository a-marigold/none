'use client';

import { useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { useToolTip } from '@/hooks/useToolTip';

import { useHotkeyStore } from '@/store/HotkeyStore';

import type { BasicModalProps } from '@/types/ModalProps';

import type { SettingTab } from './SettingsTypes';

import ModalBackdrop from '@/UI/ModalBackdrop';

import PrimaryButton from '@/UI/PrimaryButton';

const PersonalizationSettings = dynamic(
    () => import('./components/PersonalizationSettings'),
    { loading: LoadingBlock }
);
const AccountSettings = dynamic(() => import('./components/AccountSettings'), {
    loading: LoadingBlock,
});
import LoadingBlock from './components/LoadingBlock';

import settingStyles from './SettingsModal.module.scss';

const settingButtonList: {
    name: SettingTab;
    ariaLabel: string;

    icon: ReactNode;
}[] = [
    {
        name: 'Personalization',
        ariaLabel: 'Open the general settings',

        icon: (
            <svg width={20} height={20} color='var(--font-color)'>
                <use href='#gear-icon' />
            </svg>
        ),
    },
    {
        name: 'Account',
        ariaLabel: 'Open the account settings',

        icon: (
            <svg width={20} height={20} color='var(--font-color)'>
                <use href='#profile-icon' />
            </svg>
        ),
    },
];
const settingComponentsMap: Record<SettingTab, ComponentType> = {
    Personalization: PersonalizationSettings,
    Account: AccountSettings,
};

export default function SettingsModal({ closeMainModal }: BasicModalProps) {
    const [currentTab, setCurrentTab] = useState<SettingTab>('Personalization');

    const hotkeys = useHotkeyStore((state) => state.hotkeys);

    const closeMainModalHotkey = hotkeys.find(
        (hotkey) => hotkey.name === 'closeMainModal'
    )?.key;

    const CurrentSettingComponent = settingComponentsMap[currentTab];

    const toolTip = useToolTip();

    return (
        <ModalBackdrop onClose={closeMainModal} backdropType='blur'>
            <div
                role='dialog'
                aria-modal='true'
                className={settingStyles['settings-modal']}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={settingStyles['navbar']}>
                    <button
                        className={settingStyles['close-button']}
                        aria-label={`Close the settings window ${closeMainModalHotkey}`}
                        onPointerEnter={(event) => {
                            toolTip.show({
                                title: 'Close the settings window',
                                subtitle: closeMainModalHotkey,

                                relativeElement: event.currentTarget,
                                position: 'right',
                            });
                        }}
                        onPointerLeave={toolTip.hide}
                        onClick={closeMainModal}
                    >
                        <svg width={20} height={20} color='var(--font-color)'>
                            <use href='#cross-icon' />
                        </svg>
                    </button>

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

                    <CurrentSettingComponent />
                </div>
            </div>
        </ModalBackdrop>
    );
}
