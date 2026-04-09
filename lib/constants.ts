import type { ThemeColors } from "./types";

export type ColorVarMeta = {
  key: keyof ThemeColors;
  cssVar: string;
  label: string;
  category: string;
};

export const COLOR_CATEGORIES = [
  "Base",
  "Surface",
  "Accent",
  "Status",
  "Fields",
  "Misc",
] as const;

export const COLOR_VARS: ColorVarMeta[] = [
  // Base
  { key: "background", cssVar: "--background", label: "Background", category: "Base" },
  { key: "foreground", cssVar: "--foreground", label: "Foreground", category: "Base" },
  // Surface
  { key: "surface", cssVar: "--surface", label: "Surface", category: "Surface" },
  { key: "surfaceForeground", cssVar: "--surface-foreground", label: "Surface Text", category: "Surface" },
  { key: "surfaceSecondary", cssVar: "--surface-secondary", label: "Surface Secondary", category: "Surface" },
  { key: "overlay", cssVar: "--overlay", label: "Overlay", category: "Surface" },
  { key: "overlayForeground", cssVar: "--overlay-foreground", label: "Overlay Text", category: "Surface" },
  // Accent
  { key: "accent", cssVar: "--accent", label: "Accent", category: "Accent" },
  { key: "accentForeground", cssVar: "--accent-foreground", label: "Accent Text", category: "Accent" },
  { key: "focus", cssVar: "--focus", label: "Focus Ring", category: "Accent" },
  // Status
  { key: "success", cssVar: "--success", label: "Success", category: "Status" },
  { key: "successForeground", cssVar: "--success-foreground", label: "Success Text", category: "Status" },
  { key: "warning", cssVar: "--warning", label: "Warning", category: "Status" },
  { key: "warningForeground", cssVar: "--warning-foreground", label: "Warning Text", category: "Status" },
  { key: "danger", cssVar: "--danger", label: "Danger", category: "Status" },
  { key: "dangerForeground", cssVar: "--danger-foreground", label: "Danger Text", category: "Status" },
  // Fields
  { key: "fieldBackground", cssVar: "--field-background", label: "Field Background", category: "Fields" },
  { key: "fieldForeground", cssVar: "--field-foreground", label: "Field Text", category: "Fields" },
  { key: "fieldBorder", cssVar: "--field-border", label: "Field Border", category: "Fields" },
  // Misc
  { key: "default", cssVar: "--default", label: "Default", category: "Misc" },
  { key: "defaultForeground", cssVar: "--default-foreground", label: "Default Text", category: "Misc" },
  { key: "muted", cssVar: "--muted", label: "Muted", category: "Misc" },
  { key: "border", cssVar: "--border", label: "Border", category: "Misc" },
];
