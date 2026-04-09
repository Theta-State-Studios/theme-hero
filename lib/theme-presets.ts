import type { ThemeConfig } from "./types";
import { DEFAULT_LIGHT, DEFAULT_DARK, cloneThemeConfig, DEFAULT_THEME } from "./theme-defaults";

function makePreset(
  name: string,
  overrides: {
    light?: Partial<typeof DEFAULT_LIGHT.colors>;
    dark?: Partial<typeof DEFAULT_DARK.colors>;
  }
): ThemeConfig {
  const config = cloneThemeConfig(DEFAULT_THEME);
  config.name = name;
  if (overrides.light) {
    Object.assign(config.light.colors, overrides.light);
  }
  if (overrides.dark) {
    Object.assign(config.dark.colors, overrides.dark);
  }
  return config;
}

export const PRESETS: ThemeConfig[] = [
  DEFAULT_THEME,

  makePreset("Ocean", {
    light: {
      accent: { l: 0.55, c: 0.2, h: 240 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.55, c: 0.2, h: 240 },
      background: { l: 0.97, c: 0.005, h: 230 },
      surface: { l: 0.99, c: 0.003, h: 230 },
      success: { l: 0.72, c: 0.18, h: 170 },
      danger: { l: 0.62, c: 0.22, h: 15 },
    },
    dark: {
      accent: { l: 0.6, c: 0.18, h: 240 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.6, c: 0.18, h: 240 },
      background: { l: 0.1, c: 0.01, h: 240 },
      surface: { l: 0.18, c: 0.015, h: 240 },
      surfaceSecondary: { l: 0.22, c: 0.012, h: 240 },
    },
  }),

  makePreset("Forest", {
    light: {
      accent: { l: 0.55, c: 0.17, h: 155 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.55, c: 0.17, h: 155 },
      background: { l: 0.97, c: 0.005, h: 140 },
      surface: { l: 0.99, c: 0.003, h: 140 },
      success: { l: 0.7, c: 0.19, h: 145 },
      warning: { l: 0.78, c: 0.15, h: 85 },
    },
    dark: {
      accent: { l: 0.6, c: 0.15, h: 155 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.6, c: 0.15, h: 155 },
      background: { l: 0.1, c: 0.01, h: 150 },
      surface: { l: 0.18, c: 0.015, h: 150 },
      surfaceSecondary: { l: 0.22, c: 0.012, h: 150 },
    },
  }),

  makePreset("Sunset", {
    light: {
      accent: { l: 0.65, c: 0.22, h: 35 },
      accentForeground: { l: 0.15, c: 0.01, h: 30 },
      focus: { l: 0.65, c: 0.22, h: 35 },
      background: { l: 0.97, c: 0.005, h: 50 },
      surface: { l: 0.99, c: 0.003, h: 40 },
      danger: { l: 0.58, c: 0.24, h: 10 },
    },
    dark: {
      accent: { l: 0.68, c: 0.2, h: 35 },
      accentForeground: { l: 0.12, c: 0.01, h: 30 },
      focus: { l: 0.68, c: 0.2, h: 35 },
      background: { l: 0.1, c: 0.015, h: 25 },
      surface: { l: 0.18, c: 0.02, h: 25 },
      surfaceSecondary: { l: 0.22, c: 0.018, h: 25 },
    },
  }),

  makePreset("Midnight", {
    light: {
      accent: { l: 0.5, c: 0.2, h: 280 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.5, c: 0.2, h: 280 },
      background: { l: 0.96, c: 0.008, h: 285 },
      surface: { l: 0.99, c: 0.004, h: 285 },
    },
    dark: {
      accent: { l: 0.6, c: 0.2, h: 280 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.6, c: 0.2, h: 280 },
      background: { l: 0.08, c: 0.02, h: 280 },
      surface: { l: 0.15, c: 0.025, h: 280 },
      surfaceSecondary: { l: 0.2, c: 0.02, h: 280 },
    },
  }),

  makePreset("Rose", {
    light: {
      accent: { l: 0.6, c: 0.2, h: 350 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.6, c: 0.2, h: 350 },
      background: { l: 0.97, c: 0.005, h: 350 },
      surface: { l: 0.99, c: 0.003, h: 350 },
      danger: { l: 0.55, c: 0.25, h: 15 },
    },
    dark: {
      accent: { l: 0.65, c: 0.18, h: 350 },
      accentForeground: { l: 0.99, c: 0, h: 0 },
      focus: { l: 0.65, c: 0.18, h: 350 },
      background: { l: 0.1, c: 0.015, h: 340 },
      surface: { l: 0.18, c: 0.02, h: 340 },
      surfaceSecondary: { l: 0.22, c: 0.018, h: 340 },
    },
  }),
];
