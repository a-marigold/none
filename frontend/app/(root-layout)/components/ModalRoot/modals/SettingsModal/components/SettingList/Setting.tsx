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

const Setting = ({ title, description, buttonOptions }: SettingProps) => {
    const openMainModal = useModalStore((state) => state.openMainModal);
    const closeMainModal = useModalStore((state) => state.closeMainModal);

    return (
        <li className={settingStyles['setting']}>
            <div className={settingStyles['setting-head']}>
                <span className={settingStyles['setting-title']}>{title}</span>

                <SelectButton
                    title={buttonOptions.title}
                    onClick={(event) =>
                        openMainModal(
                            <DropDownModal
                                relativeElement={event.currentTarget}
                                topChildren={buttonOptions.dropDownChildren}
                                onClose={closeMainModal}
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
};

export default memo(Setting);
