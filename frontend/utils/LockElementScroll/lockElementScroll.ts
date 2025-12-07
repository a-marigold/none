/**
 * Hides element scrollbar via (overflow: 'hidden') and adds paddingRight for element that equals to width of scrollbar
 *
 * @param {HTMLELement} element - the element to hide scrollbar
 * @example
 * ```typescript
 * lockElementScroll(document.body); // Now scrollbar is hidden and body has paddingRight that equals to width of scrollbar
 * ```
 */
export function lockElementScroll(element: HTMLElement) {
    element.style.paddingRight = `${
        element.offsetWidth - element.clientWidth
    }px`;
    element.style.overflow = 'hidden';
}
/**
 * Used with `lockElementScroll'. Resets paddingRight and overlow of an element to css values
 *
 * @param {HTMLELement} element - the element to reset scrollbar
 * @example
 * ```typescript
 * unlockElementScroll(document.body); // Now scrollbar is showed and body`s paddingRight equals to css value
 * ```
 */
export function unlockElementScroll(element: HTMLElement) {
    element.style.paddingRight = '';
    element.style.overflow = '';
}
