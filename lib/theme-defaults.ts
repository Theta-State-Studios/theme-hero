import type { ThemeMode, ThemeConfig, OklchColor } from "./types";

// Resolved primitive references
const snow: OklchColor = { l: 0.9911, c: 0, h: 0 };
const eclipse: OklchColor = { l: 0.2103, c: 0.0059, h: 285.89 };
const white: OklchColor = { l: 1, c: 0, h: 0 };

export const DEFAULT_LIGHT: ThemeMode = {
  colors: {
    background: { l: 0.9702, c: 0, h: 0 },
    foreground: { ...eclipse },
    surface: { ...white },
    surfaceForeground: { ...eclipse },
    surfaceSecondary: { l: 0.9524, c: 0.0013, h: 286.37 },
    overlay: { ...white },
    overlayForeground: { ...eclipse },
    muted: { l: 0.5517, c: 0.0138, h: 285.94 },
    default: { l: 0.94, c: 0.001, h: 286.375 },
    defaultForeground: { ...eclipse },
    accent: { l: 0.6204, c: 0.195, h: 253.83 },
    accentForeground: { ...snow },
    success: { l: 0.7329, c: 0.1935, h: 150.81 },
    successForeground: { ...eclipse },
    warning: { l: 0.7819, c: 0.1585, h: 72.33 },
    warningForeground: { ...eclipse },
    danger: { l: 0.6532, c: 0.2328, h: 25.74 },
    dangerForeground: { ...snow },
    fieldBackground: { ...white },
    fieldForeground: { ...eclipse },
    fieldBorder: { l: 0, c: 0, h: 0 }, // transparent
    border: { l: 0.9, c: 0.004, h: 286.32 },
    focus: { l: 0.6204, c: 0.195, h: 253.83 },
  },
  layout: {
    radius: 0.5,
    spacing: 0.25,
    borderWidth: 1,
    disabledOpacity: 0.5,
  },
};

export const DEFAULT_DARK: ThemeMode = {
  colors: {
    background: { l: 0.12, c: 0.005, h: 285.823 },
    foreground: { ...snow },
    surface: { ...eclipse },
    surfaceForeground: { ...snow },
    surfaceSecondary: { l: 0.257, c: 0.0037, h: 286.14 },
    overlay: { ...eclipse },
    overlayForeground: { ...snow },
    muted: { l: 0.705, c: 0.015, h: 286.067 },
    default: { l: 0.274, c: 0.006, h: 286.033 },
    defaultForeground: { ...snow },
    accent: { l: 0.6204, c: 0.195, h: 253.83 },
    accentForeground: { ...snow },
    success: { l: 0.7329, c: 0.1935, h: 150.81 },
    successForeground: { ...eclipse },
    warning: { l: 0.8203, c: 0.1388, h: 76.34 },
    warningForeground: { ...eclipse },
    danger: { l: 0.594, c: 0.1967, h: 24.63 },
    dangerForeground: { ...snow },
    fieldBackground: { ...eclipse },
    fieldForeground: { ...snow },
    fieldBorder: { l: 0, c: 0, h: 0 },
    border: { l: 0.28, c: 0.006, h: 286.033 },
    focus: { l: 0.6204, c: 0.195, h: 253.83 },
  },
  layout: {
    radius: 0.5,
    spacing: 0.25,
    borderWidth: 1,
    disabledOpacity: 0.5,
  },
};

export const DEFAULT_THEME: ThemeConfig = {
  name: "Default",
  light: DEFAULT_LIGHT,
  dark: DEFAULT_DARK,
};

export function cloneThemeConfig(config: ThemeConfig): ThemeConfig {
  return JSON.parse(JSON.stringify(config));
}
