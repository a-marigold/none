import type { ButtonHTMLAttributes } from 'react';

import buttonStyles from './SelectButton.module.scss';

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    'aria-label': string;
}

export default function SelectButton({
    title,

    className,
    ...attributes
}: SelectButtonProps) {
    return (
        <button
            {...attributes}
            className={`${buttonStyles['select-button']} ${className || ''}`}
        >
            <span className={buttonStyles['title']}>{title}</span>

            <svg width={16} height={16} color='var(--font-color)'>
                <use href='#accordion-icon' />
            </svg>
        </button>
    );
}
