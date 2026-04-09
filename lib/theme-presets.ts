import type { ThemeConfig } from "./types";
import { generateThemeFromAccent, type GeneratorInput } from "./theme-generator";
import { DEFAULT_THEME } from "./theme-defaults";

function makePreset(name: string, input: Omit<GeneratorInput, "light" | "dark"> & {
  light?: Partial<GeneratorInput["light"]>;
  dark?: Partial<GeneratorInput["dark"]>;
}): ThemeConfig {
  const config = generateThemeFromAccent({
    ...input,
    light: { brightness: 0, contrast: 1, ...input.light },
    dark: { brightness: 0, contrast: 1, ...input.dark },
  });
  config.name = name;
  return config;
}

export const PRESETS: ThemeConfig[] = [
  DEFAULT_THEME,

  makePreset("Ocean", {
    accent: { l: 0.55, c: 0.2, h: 240 },
    neutralHue: 230,
    neutralChroma: 0.015,
  }),

  makePreset("Forest", {
    accent: { l: 0.55, c: 0.17, h: 155 },
    neutralHue: 145,
    neutralChroma: 0.012,
  }),

  makePreset("Sunset", {
    accent: { l: 0.65, c: 0.22, h: 35 },
    neutralHue: 40,
    neutralChroma: 0.015,
  }),

  makePreset("Midnight", {
    accent: { l: 0.5, c: 0.2, h: 280 },
    neutralHue: 280,
    neutralChroma: 0.018,
    dark: { brightness: -0.02, contrast: 1.1 },
  }),

  makePreset("Rose", {
    accent: { l: 0.6, c: 0.2, h: 350 },
    neutralHue: 345,
    neutralChroma: 0.012,
  }),
];
