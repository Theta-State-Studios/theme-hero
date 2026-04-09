"use client";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
  type Dispatch,
} from "react";
import type { ThemeState, ThemeAction, ThemeConfig, ThemeColors } from "@/lib/types";
import { DEFAULT_THEME, cloneThemeConfig } from "@/lib/theme-defaults";
import { generatePreviewCss, generateExportCss } from "@/lib/css-generator";

const initialState: ThemeState = {
  config: cloneThemeConfig(DEFAULT_THEME),
  editingMode: "light",
  previewMode: "light",
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_COLOR": {
      const modeKey = action.mode;
      return {
        ...state,
        config: {
          ...state.config,
          [modeKey]: {
            ...state.config[modeKey],
            colors: {
              ...state.config[modeKey].colors,
              [action.key]: action.value,
            },
          },
        },
      };
    }
    case "SET_LAYOUT": {
      const modeKey = action.mode;
      return {
        ...state,
        config: {
          ...state.config,
          [modeKey]: {
            ...state.config[modeKey],
            layout: {
              ...state.config[modeKey].layout,
              [action.key]: action.value,
            },
          },
        },
      };
    }
    case "SET_EDITING_MODE":
      return { ...state, editingMode: action.mode };
    case "SET_PREVIEW_MODE":
      return { ...state, previewMode: action.mode };
    case "APPLY_PRESET":
    case "IMPORT_CONFIG":
      return { ...state, config: cloneThemeConfig(action.config) };
    case "RESET_TO_DEFAULTS":
      return { ...state, config: cloneThemeConfig(DEFAULT_THEME) };
    default:
      return state;
  }
}

type ThemeContextValue = {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
  previewCss: string;
  exportCss: string;
  currentColors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const previewCss = useMemo(
    () => generatePreviewCss(state.config),
    [state.config]
  );

  const exportCss = useMemo(
    () => generateExportCss(state.config),
    [state.config]
  );

  const currentColors = useMemo(
    () => state.config[state.editingMode].colors,
    [state.config, state.editingMode]
  );

  const value = useMemo(
    () => ({ state, dispatch, previewCss, exportCss, currentColors }),
    [state, dispatch, previewCss, exportCss, currentColors]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
