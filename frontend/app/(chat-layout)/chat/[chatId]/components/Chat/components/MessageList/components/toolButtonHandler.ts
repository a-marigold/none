import type { ToolHandlerType } from './MessageTypes';

export function toolButtonHandler(
    handlerType: ToolHandlerType,
    messageElement: HTMLDivElement | null
) {
    if (handlerType === 'copy') {
        if (!messageElement) return;

        navigator.clipboard.writeText(messageElement.textContent);
    } else if (handlerType === 'edit') {
        // edit message logic

        alert('soon');
    }
}
