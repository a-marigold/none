import { InputHTMLAttributes } from 'react';

import inputStyles from './SettingInput.module.scss';

export interface SettingInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    htmlId: string;

    labelTitle: string;

    'aria-label': string;
}

export default function SettingInput({
    htmlId,
    labelTitle,

    className,

    ...attributes
}: SettingInputProps) {
    return (
        <div className={`${inputStyles['input-block']} ${className ?? ''}`}>
            <label htmlFor={htmlId} className={inputStyles['title']}>
                {labelTitle}
            </label>

            <input
                {...attributes}
                type='text'
                id={htmlId}
                className={inputStyles['input']}
            />
        </div>
    );
}
