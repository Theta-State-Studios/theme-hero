import { converter, formatHex, displayable, clampChroma, parse } from "culori";
import type { OklchColor } from "./types";

const toOklch = converter("oklch");

export function hexToOklch(hex: string): OklchColor | null {
  try {
    const parsed = parse(hex);
    if (!parsed) return null;
    const oklch = toOklch(parsed);
    return {
      l: oklch.l ?? 0,
      c: oklch.c ?? 0,
      h: isNaN(oklch.h ?? NaN) ? 0 : (oklch.h ?? 0),
    };
  } catch {
    return null;
  }
}

export function oklchToHex(color: OklchColor): string {
  const clamped = clampChroma(
    { mode: "oklch", l: color.l, c: color.c, h: color.h },
    "oklch"
  );
  return formatHex(clamped) ?? "#000000";
}

export function oklchToCss(color: OklchColor): string {
  const l = round(color.l, 4);
  const c = round(color.c, 4);
  const h = round(color.h, 2);
  return `oklch(${l} ${c} ${h})`;
}

export function parseOklchCss(css: string): OklchColor | null {
  const match = css.match(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*\)/
  );
  if (!match) return null;
  let l = parseFloat(match[1]);
  if (match[1].includes("%")) l /= 100;
  return { l, c: parseFloat(match[2]), h: parseFloat(match[3]) };
}

export function isOklchDisplayable(color: OklchColor): boolean {
  return displayable({ mode: "oklch", l: color.l, c: color.c, h: color.h });
}

function round(n: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
