"use client";

import { useTheme } from "@/context/ThemeContext";
import { ComponentShowcase } from "./ComponentShowcase";

export function PreviewPanel() {
  const { state, previewCss } = useTheme();

  return (
    <div id="theme-preview" className="flex-1 min-w-0 overflow-auto h-full">
      <style dangerouslySetInnerHTML={{ __html: previewCss }} />
      <div
        data-theme={state.previewMode}
        className={`${state.previewMode} min-h-full transition-colors`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Preview toolbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
          <span className="text-sm font-medium opacity-70">
            Component Preview
          </span>
          <PreviewModeToggle />
        </div>
        <ComponentShowcase />
      </div>
    </div>
  );
}

function PreviewModeToggle() {
  const { state, dispatch } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg p-0.5 bg-[var(--default)]">
      <button
        onClick={() => dispatch({ type: "SET_PREVIEW_MODE", mode: "light" })}
        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
          state.previewMode === "light"
            ? "bg-[var(--surface)] shadow-sm"
            : "opacity-60 hover:opacity-100"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => dispatch({ type: "SET_PREVIEW_MODE", mode: "dark" })}
        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
          state.previewMode === "dark"
            ? "bg-[var(--surface)] shadow-sm"
            : "opacity-60 hover:opacity-100"
        }`}
      >
        Dark
      </button>
    </div>
  );
}
