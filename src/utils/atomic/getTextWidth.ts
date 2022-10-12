/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 */
export default function getTextWidth(text: string, font?: string) {
  // re-use canvas on object for better performance
  if (!(window as Window & { canvas?: HTMLCanvasElement }).canvas) {
    (window as Window & { canvas?: HTMLCanvasElement }).canvas = document.createElement('canvas');
  }
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context!.font = font ?? '';
  const metrics = context!.measureText(text);
  return metrics.width;
}

function getCssStyle(element: HTMLElement, prop: string) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}
