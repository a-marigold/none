import type { ReactNode } from 'react';

export interface MessagePropsType {
    children: ReactNode;
}

export type ToolHandlerType = 'copy' | 'edit' | 'like' | 'dislike';

export type ToolButtonType = {
    icon: ReactNode;
    ariaLabel: string;
    handler: ToolHandlerType;
};
