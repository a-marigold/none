// 'use client';

// import { useState, useRef, useLayoutEffect } from 'react';

// import { createPortal } from 'react-dom';

// import type { ReactNode } from 'react';

// import { calculateToolTipPosition } from './calculateToolTipPosition';

// import type { LabelPositionType } from './calculateToolTipPosition';

// import elementStyles from './LabelledElement.module.scss';

// export interface ToolTipProps {
//     title: string;
//     subtitle?: string;

//     position?: LabelPositionType;
//     width?: 'full' | 'content';

//     children: ReactNode;
// }

// export default function LabelledElement({
//     title,
//     subtitle,

//     position = 'bottom',
//     width = 'content',

//     children,
// }: ToolTipProps) {
//     const [showLabel, setShowLabel] = useState(false);

//     const toolTipRef = useRef<HTMLDivElement>(null);
//     const wrapperRef = useRef<HTMLDivElement>(null);

//     useLayoutEffect(() => {
//         if (!toolTipRef.current || !wrapperRef.current || !showLabel) return;

//         calculateToolTipPosition(
//             toolTipRef.current,
//             wrapperRef.current,
//             position
//         );
//     }, [showLabel, position, title, subtitle]);

//     return (
//         <>
//             <div
//                 ref={wrapperRef}
//                 className={`${elementStyles['labelled-wrapper']} ${elementStyles[width]}`}
//                 onPointerEnter={() => {
//                     setShowLabel(true);
//                 }}
//                 onPointerLeave={() => setShowLabel(false)}
//             >
//                 {children}
//             </div>

//             {showLabel &&
//                 createPortal(
//                     <div
//                         ref={toolTipRef}
//                         role='tooltip'
//                         className={elementStyles['label']}
//                     >
//                         <span className={elementStyles['title']}> {title}</span>

//                         {subtitle && (
//                             <kbd className={elementStyles['subtitle']}>
//                                 {subtitle}
//                             </kbd>
//                         )}
//                     </div>,

//                     document.body
//                 )}
//         </>
//     );
// }

'use client';

import { useRef, useLayoutEffect } from 'react';

import { calculateToolTipPosition } from './calculateToolTipPosition';

import type { LabelPositionType } from './calculateToolTipPosition';

import elementStyles from './ToolTip.module.scss';

export interface ToolTipProps {
    title: string;
    subtitle?: string;

    relativeElement: HTMLElement;

    position?: LabelPositionType;
}

export default function ToolTip({
    title,
    subtitle,

    relativeElement,

    position = 'bottom',
}: ToolTipProps) {
    const toolTipRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!toolTipRef.current) return;

        calculateToolTipPosition(toolTipRef.current, relativeElement, position);
    }, [position, title, subtitle]);

    return (
        <div
            ref={toolTipRef}
            role='tooltip'
            className={elementStyles['tooltip']}
        >
            <span className={elementStyles['title']}> {title} </span>

            {subtitle && (
                <kbd className={elementStyles['subtitle']}>{subtitle}</kbd>
            )}
        </div>
    );
}
