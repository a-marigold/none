export type LabelPositionType = 'top' | 'right' | 'bottom' | 'left';

export function calculateToolTipPosition(
    toolTipElement: HTMLElement,
    relativeElement: HTMLElement,
    position: LabelPositionType
) {
    const {
        top: wrapperTop,
        left: wrapperLeft,
        width: wrapperWidth,
        height: wrapperHeight,
    } = relativeElement.getBoundingClientRect();

    const { offsetWidth: toolTipWidth, offsetHeight: toolTipHeight } =
        toolTipElement;

    let labelTop = 0;
    let labelLeft = 0;

    if (position === 'top') {
        labelTop = wrapperTop - 30;
        labelLeft = wrapperLeft + wrapperWidth / 2 - toolTipWidth / 2;
    } else if (position === 'right') {
        labelTop = wrapperTop + wrapperHeight / 2 - toolTipHeight / 2;

        labelLeft = wrapperLeft + wrapperWidth + 10;
    } else if (position === 'bottom') {
        labelTop = wrapperTop + wrapperHeight + 10;
        labelLeft = wrapperLeft + wrapperWidth / 2 - toolTipWidth / 2;
    } else if (position === 'left') {
        labelTop = wrapperTop + wrapperHeight / 2 - toolTipHeight / 2;
        labelLeft = wrapperLeft - toolTipWidth - 10;
    }

    toolTipElement.style.transform = `translate(${labelLeft}px, ${labelTop}px)`;
}
