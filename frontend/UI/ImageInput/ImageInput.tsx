import Image from 'next/image';

import type { InputHTMLAttributes } from 'react';

import inputStyles from './ImageInput.module.scss';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
    src: string;
    alt: string;
    size?: number;
}
export default function ImageInput({
    src,

    size = 128,

    alt,

    className,

    ...attributes
}: ImageInputProps) {
    return (
        <label className={`${inputStyles['image-block']} ${className ?? ''}`}>
            <Image
                src={src}
                className={inputStyles['image']}
                alt={alt}
                width={size}
                height={size}
            />
            <div className={inputStyles['camera-icon-block']}>
                <svg width={18} height={18} color='var(--icon-color)'>
                    <use href='#camera-icon' />
                </svg>
            </div>

            <input
                {...attributes}
                type='file'
                className={inputStyles['file-input']}
                hidden
                multiple={false}
                accept='image/*'
            />
        </label>
    );
}
