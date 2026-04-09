import type { OklchColor, ThemeConfig, ThemeColors, ThemeLayout } from "./types";

export type ModeSettings = {
  brightness: number;  // -0.1 to 0.1
  contrast: number;    // 0.3 to 2.0
};

export type GeneratorInput = {
  accent: OklchColor;
  neutralHue: number;      // 0-360
  neutralChroma: number;   // 0-0.04
  light: ModeSettings;
  dark: ModeSettings;
};

/** Clamp lightness to valid oklch range */
function clampL(l: number): number {
  return Math.max(0, Math.min(1, l));
}

/** Pick a foreground that contrasts with the given background lightness */
function autoForeground(bgLightness: number, neutralHue: number): OklchColor {
  return bgLightness > 0.65
    ? { l: 0.21, c: 0.006, h: neutralHue }
    : { l: 0.99, c: 0, h: 0 };
}

/** Generate a complete light-mode color set */
function generateLightColors(input: GeneratorInput): ThemeColors {
  const { accent, neutralHue: nh, neutralChroma: nc } = input;
  const { brightness: br, contrast: ct } = input.light;

  const base = clampL(0.97 + br);

  const step1 = 0.02 * ct;
  const step2 = 0.03 * ct;
  const step3 = 0.05 * ct;
  const step4 = 0.07 * ct;

  const bgL = base;
  const surfaceL = clampL(base + step1 * 0.5);
  const surfaceSecL = clampL(base - step2);
  const defaultL = clampL(base - step3);
  const borderL = clampL(base - step4);
  const mutedL = clampL(0.55 + br * 0.5);

  const darkFg: OklchColor = { l: clampL(0.21 - br * 0.3), c: 0.006, h: nh };
  const lightFg: OklchColor = { l: 0.99, c: 0, h: 0 };
  const surface: OklchColor = { l: surfaceL, c: nc * 0.7, h: nh };

  return {
    background:           { l: bgL, c: nc, h: nh },
    foreground:           darkFg,
    surface,
    surfaceForeground:    darkFg,
    surfaceSecondary:     { l: surfaceSecL, c: nc, h: nh },
    overlay:              surface,
    overlayForeground:    darkFg,
    muted:                { l: mutedL, c: nc + 0.01, h: nh },
    default:              { l: defaultL, c: nc * 0.9, h: nh },
    defaultForeground:    darkFg,
    accent,
    accentForeground:     autoForeground(accent.l, nh),
    focus:                accent,
    success:              { l: 0.73, c: 0.19, h: 150 },
    successForeground:    darkFg,
    warning:              { l: 0.78, c: 0.16, h: 72 },
    warningForeground:    darkFg,
    danger:               { l: 0.65, c: 0.23, h: 25 },
    dangerForeground:     lightFg,
    fieldBackground:      surface,
    fieldForeground:      darkFg,
    fieldBorder:          { l: 0, c: 0, h: 0 },
    border:               { l: borderL, c: nc * 0.8, h: nh },
  };
}

/** Generate a complete dark-mode color set */
function generateDarkColors(input: GeneratorInput): ThemeColors {
  const { accent, neutralHue: nh, neutralChroma: nc } = input;
  const { brightness: br, contrast: ct } = input.dark;

  const base = clampL(0.18 + br);

  const step1 = 0.04 * ct;
  const step2 = 0.06 * ct;
  const step3 = 0.08 * ct;
  const step4 = 0.10 * ct;

  const bgL = clampL(base - step1);
  const surfaceL = base;
  const surfaceSecL = clampL(base + step1);
  const defaultL = clampL(base + step2);
  const borderL = clampL(base + step3);
  const mutedL = clampL(0.70 + br * 0.5);

  const lightFg: OklchColor = { l: clampL(0.99 + br * 0.2), c: 0, h: 0 };
  const darkFg: OklchColor = { l: 0.21, c: 0.006, h: nh };
  const darkSurface: OklchColor = { l: surfaceL, c: nc * 1.2, h: nh };

  return {
    background:           { l: bgL, c: nc * 1.0, h: nh },
    foreground:           lightFg,
    surface:              darkSurface,
    surfaceForeground:    lightFg,
    surfaceSecondary:     { l: surfaceSecL, c: nc * 0.8, h: nh },
    overlay:              darkSurface,
    overlayForeground:    lightFg,
    muted:                { l: mutedL, c: nc + 0.005, h: nh },
    default:              { l: defaultL, c: nc * 1.2, h: nh },
    defaultForeground:    lightFg,
    accent,
    accentForeground:     autoForeground(accent.l, nh),
    focus:                accent,
    success:              { l: 0.73, c: 0.19, h: 150 },
    successForeground:    darkFg,
    warning:              { l: 0.82, c: 0.14, h: 76 },
    warningForeground:    darkFg,
    danger:               { l: 0.59, c: 0.20, h: 25 },
    dangerForeground:     lightFg,
    fieldBackground:      darkSurface,
    fieldForeground:      lightFg,
    fieldBorder:          { l: 0, c: 0, h: 0 },
    border:               { l: borderL, c: nc * 1.2, h: nh },
  };
}

const DEFAULT_LAYOUT: ThemeLayout = {
  radius: 0.5,
  spacing: 0.25,
  borderWidth: 1,
  disabledOpacity: 0.5,
};

/** Generate a full theme config from an accent color and neutral settings */
export function generateThemeFromAccent(input: GeneratorInput): ThemeConfig {
  return {
    name: "Generated",
    light: {
      colors: generateLightColors(input),
      layout: { ...DEFAULT_LAYOUT },
    },
    dark: {
      colors: generateDarkColors(input),
      layout: { ...DEFAULT_LAYOUT },
    },
  };
}
