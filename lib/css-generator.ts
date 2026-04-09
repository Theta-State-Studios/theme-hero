import type { ThemeConfig, ThemeMode } from "./types";
import { oklchToCss } from "./color-utils";
import { COLOR_VARS } from "./constants";

// Map HeroUI CSS vars to Tailwind --color-* equivalents that components actually use
const TAILWIND_COLOR_MAP: Record<string, string[]> = {
  "--background": ["--color-background"],
  "--foreground": ["--color-foreground"],
  "--accent": ["--color-accent"],
  "--accent-foreground": ["--color-accent-foreground"],
  "--success": ["--color-success"],
  "--success-foreground": ["--color-success-foreground"],
  "--warning": ["--color-warning"],
  "--warning-foreground": ["--color-warning-foreground"],
  "--danger": ["--color-danger"],
  "--danger-foreground": ["--color-danger-foreground"],
  "--default": ["--color-default"],
  "--default-foreground": ["--color-default-foreground"],
  "--focus": ["--color-focus"],
  "--field-border": ["--color-field-border"],
};

/**
 * HeroUI's @layer theme computes derived color variables using color-mix().
 * Since those resolve var() at definition time, we must re-declare them
 * whenever we override the base semantic variables.
 */
function generateDerivedColorVars(mode: ThemeMode): string {
  const lines: string[] = [];

  // Hover states: color-mix(base 90%, foreground 10%)
  const hoverPairs: [string, string, string][] = [
    ["--color-accent-hover", "--accent", "--accent-foreground"],
    ["--color-danger-hover", "--danger", "--danger-foreground"],
  ];
  for (const [derived, base, fg] of hoverPairs) {
    lines.push(`  ${derived}: color-mix(in oklab, var(${base}) 90%, var(${fg}) 10%);`);
  }

  // Default hover: slightly different ratio
  lines.push(`  --color-default-hover: color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%);`);

  // Soft backgrounds: color-mix(base 15%, transparent)
  const softColors = ["accent", "danger", "warning", "success"];
  for (const c of softColors) {
    lines.push(`  --color-${c}-soft: color-mix(in oklab, var(--${c}) 15%, transparent);`);
    lines.push(`  --color-${c}-soft-hover: color-mix(in oklab, var(--${c}) 20%, transparent);`);
    lines.push(`  --color-${c}-soft-foreground: var(--${c});`);
  }

  return lines.join("\n");
}

function generateModeVars(mode: ThemeMode): string {
  const lines: string[] = [];

  for (const v of COLOR_VARS) {
    const color = mode.colors[v.key];
    const cssValue = oklchToCss(color);
    lines.push(`  ${v.cssVar}: ${cssValue};`);

    // Also set the Tailwind --color-* equivalents
    const twVars = TAILWIND_COLOR_MAP[v.cssVar];
    if (twVars) {
      for (const tw of twVars) {
        lines.push(`  ${tw}: ${cssValue};`);
      }
    }
  }

  // Layout vars
  lines.push(`  --radius: ${mode.layout.radius}rem;`);
  lines.push(`  --spacing: ${mode.layout.spacing}rem;`);
  lines.push(`  --border-width: ${mode.layout.borderWidth}px;`);
  lines.push(`  --disabled-opacity: ${mode.layout.disabledOpacity};`);

  // Derived color vars (hover, soft, etc.)
  lines.push(generateDerivedColorVars(mode));

  return lines.join("\n");
}

/** Scoped CSS for the live preview panel */
export function generatePreviewCss(config: ThemeConfig): string {
  return `#theme-preview [data-theme="light"] {
${generateModeVars(config.light)}
}
#theme-preview [data-theme="dark"] {
${generateModeVars(config.dark)}
}`;
}

/** Exportable CSS for user's project */
export function generateExportCss(config: ThemeConfig): string {
  return `/* HeroUI v3 Custom Theme: ${config.name} */
/* Paste this into your globals.css after @import "@heroui/styles"; */

:root, [data-theme="light"] {
${generateModeVars(config.light)}
}

[data-theme="dark"] {
${generateModeVars(config.dark)}
}`;
}

/** JSON export */
export function generateExportJson(config: ThemeConfig): string {
  return JSON.stringify(config, null, 2);
}
