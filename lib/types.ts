export type OklchColor = {
  l: number; // 0-1 (lightness)
  c: number; // 0-0.4 (chroma)
  h: number; // 0-360 (hue)
};

export type ThemeColors = {
  background: OklchColor;
  foreground: OklchColor;
  surface: OklchColor;
  surfaceForeground: OklchColor;
  surfaceSecondary: OklchColor;
  overlay: OklchColor;
  overlayForeground: OklchColor;
  muted: OklchColor;
  default: OklchColor;
  defaultForeground: OklchColor;
  accent: OklchColor;
  accentForeground: OklchColor;
  success: OklchColor;
  successForeground: OklchColor;
  warning: OklchColor;
  warningForeground: OklchColor;
  danger: OklchColor;
  dangerForeground: OklchColor;
  fieldBackground: OklchColor;
  fieldForeground: OklchColor;
  fieldBorder: OklchColor;
  border: OklchColor;
  focus: OklchColor;
};

export type ThemeLayout = {
  radius: number;       // rem
  spacing: number;      // rem
  borderWidth: number;  // px
  disabledOpacity: number; // 0-1
};

export type ThemeMode = {
  colors: ThemeColors;
  layout: ThemeLayout;
};

export type ThemeConfig = {
  name: string;
  light: ThemeMode;
  dark: ThemeMode;
};

export type EditingMode = "light" | "dark";
export type PreviewMode = "light" | "dark";

export type ThemeState = {
  config: ThemeConfig;
  editingMode: EditingMode;
  previewMode: PreviewMode;
};

export type ThemeAction =
  | { type: "SET_COLOR"; mode: EditingMode; key: keyof ThemeColors; value: OklchColor }
  | { type: "SET_LAYOUT"; mode: EditingMode; key: keyof ThemeLayout; value: number }
  | { type: "SET_EDITING_MODE"; mode: EditingMode }
  | { type: "SET_PREVIEW_MODE"; mode: PreviewMode }
  | { type: "APPLY_PRESET"; config: ThemeConfig }
  | { type: "IMPORT_CONFIG"; config: ThemeConfig }
  | { type: "RESET_TO_DEFAULTS" };
