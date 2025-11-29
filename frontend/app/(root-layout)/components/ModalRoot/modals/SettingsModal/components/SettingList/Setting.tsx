import { memo } from 'react';
import type { ReactNode } from 'react';

import { useModalStore } from '@/store/ModalStore';

import DropDownModal from '@/UI/DropDownModal';
import SelectButton from '@/UI/SelectButton';

import settingStyles from './SettingsList.module.scss';

export type SettingProps = {
    title: string;

    description?: string;

    buttonOptions: {
        title: string;

        dropDownChildren: ReactNode;
    };
};

const Setting = memo(({ title, description, buttonOptions }: SettingProps) => {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);

    return (
        <li className={settingStyles['setting']}>
            <div className={settingStyles['setting-head']}>
                <span className={settingStyles['setting-title']}>{title}</span>

                <SelectButton
                    title={buttonOptions.title}
                    onClick={(event) =>
                        openModal(
                            <DropDownModal
                                relativeElement={event.currentTarget}
                                topChildren={buttonOptions.dropDownChildren}
                                onClose={closeModal}
                            />
                        )
                    }
                />
            </div>

            {description && (
                <p className={settingStyles['setting-description']}>
                    {description}
                </p>
            )}
        </li>
    );
});

export default Setting;
