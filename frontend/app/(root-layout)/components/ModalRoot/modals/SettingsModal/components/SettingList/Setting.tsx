import { memo } from 'react';

import { useModalStore } from '@/store/ModalStore';

import PrimaryButton, { type PrimaryButtonProps } from '@/UI/PrimaryButton';

import DropDownModal from '@/UI/DropDownModal';
import SelectButton from '@/UI/SelectButton';

import settingStyles from './SettingsList.module.scss';

export type SettingProps = {
    title: string;

    description?: string;

    buttonOptions: {
        title: string;

        childrenPropList: PrimaryButtonProps[];
    };
};

const Setting = ({ title, description, buttonOptions }: SettingProps) => {
    const openSubModal = useModalStore((state) => state.openSubModal);
    const closeSubModal = useModalStore((state) => state.closeSubModal);

    return (
        <li className={settingStyles['setting']}>
            <div className={settingStyles['setting-head']}>
                <span className={settingStyles['setting-title']}>{title}</span>

                <SelectButton
                    title={buttonOptions.title}
                    onClick={(event) =>
                        openSubModal(
                            <DropDownModal
                                relativeElement={event.currentTarget}
                                topChildren={
                                    <>
                                        {buttonOptions.childrenPropList.map(
                                            (props, index) => (
                                                <PrimaryButton
                                                    key={index}
                                                    {...props}
                                                />
                                            )
                                        )}
                                    </>
                                }
                                onClose={closeSubModal}
                                posY='bottom'
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
