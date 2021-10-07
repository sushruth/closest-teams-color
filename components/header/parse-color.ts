import { RGBColor } from "color-diff";

export function parseColor(ref: HTMLDivElement, input: string = ''): RGBColor | undefined {
  const computedStyle = getComputedStyle(ref);

  const prevColor = computedStyle.getPropertyValue('background-color');
  ref.style.backgroundColor = input;
  const color = computedStyle.getPropertyValue('background-color');

  if (color === prevColor) {
    ref.style.backgroundColor = '';
  } else {
    return getBackgroundColorRgb(ref);
  }


  return undefined
}

export function getBackgroundColorRgb(ref: HTMLElement): RGBColor | undefined {
  const color = getComputedStyle(ref).getPropertyValue('background-color');
  const match = color.match(/^\s*rgb\((?<R>\d+)\s*,\s*(?<G>\d+)\s*,\s*(?<B>\d+)\s*\)\s*$/);
  const matchAlpha = color.match(/^\s*rgba\((?<R>\d+)\s*,\s*(?<G>\d+)\s*,\s*(?<B>\d+)\s*\)\s*,\s*(?<A>\d+)\s*\)\s*$/);

  if (match?.groups) {
    return {
      R: Number(match.groups.R),
      G: Number(match.groups.G),
      B: Number(match.groups.B),
    }
  }

  if (matchAlpha?.groups) {
    return {
      R: Number(matchAlpha.groups.R),
      G: Number(matchAlpha.groups.G),
      B: Number(matchAlpha.groups.B),
    }
  }

  return undefined
}