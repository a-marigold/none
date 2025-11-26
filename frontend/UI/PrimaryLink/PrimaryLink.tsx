import type { ReactNode, AnchorHTMLAttributes } from 'react';
import type { LinkProps } from 'next/link';

import Link from 'next/link';

import linkStyles from './PrimaryLink.module.scss';

interface PrimaryLinkProps
    extends LinkProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
    subtitle?: string;
    href: string;

    icon?: ReactNode;

    'aria-label': string;

    isActive: boolean;

    className?: string;
}
export default function PrimaryLink({
    title,
    subtitle,
    isActive,

    icon,

    className,

    ...attributes
}: PrimaryLinkProps) {
    return (
        <Link
            {...attributes}
            className={`${linkStyles['primary-link']} ${
                isActive ? linkStyles['active'] : ''
            } ${className ?? ''}`}
        >
            {icon}

            <span className={linkStyles['title']}>{title}</span>

            {subtitle && (
                <span className={linkStyles['subtitle']}>{subtitle}</span>
            )}
        </Link>
    );
}
