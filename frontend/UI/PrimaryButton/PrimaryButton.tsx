import type { ReactNode, ButtonHTMLAttributes } from 'react';

import buttonStyles from './PrimaryButton.module.scss';

export interface PrimaryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    subtitle?: string;

    'aria-label': string;

    icon?: ReactNode;
}
export default function PrimaryButton({
    title,

    subtitle,

    icon,

    className,

    ...attributes
}: PrimaryButtonProps) {
    return (
        <button
            {...attributes}
            className={`${buttonStyles['primary-button']} ${className ?? ''}`}
        >
            <span className={buttonStyles['title-block']}>
                {icon}

                <span className={buttonStyles['title']}>{title}</span>
            </span>

            {subtitle && (
                <kbd className={buttonStyles['subtitle']}>{subtitle}</kbd>
            )}
        </button>
    );
}
