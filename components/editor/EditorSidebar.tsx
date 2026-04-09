"use client";

import { useState } from "react";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { ColorSection } from "./ColorSection";
import { LayoutControls } from "./LayoutControls";
import { PresetSelector } from "./PresetSelector";
import { ExportPanel } from "./ExportPanel";
import { GeneratePanel } from "./GeneratePanel";
import { useTheme } from "@/context/ThemeContext";
import { COLOR_CATEGORIES } from "@/lib/constants";

type Tab = "generate" | "colors" | "layout" | "presets" | "export";

export function EditorSidebar() {
  const [tab, setTab] = useState<Tab>("generate");
  const { dispatch } = useTheme();

  const tabs: { id: Tab; label: string }[] = [
    { id: "generate", label: "Generate" },
    { id: "colors", label: "Colors" },
    { id: "layout", label: "Layout" },
    { id: "presets", label: "Presets" },
    { id: "export", label: "Export" },
  ];

  return (
    <div className="w-[380px] shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <h1 className="text-sm font-bold tracking-tight">HeroUI Theme Editor</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">v3 Theme Customizer</p>
      </div>

      {/* Editing mode toggle */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium mb-2 block">
          Editing Mode
        </label>
        <ThemeModeToggle />
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
              tab === t.id
                ? "border-blue-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-4">
        {tab === "generate" && <GeneratePanel />}

        {tab === "colors" && (
          <div className="space-y-3">
            {COLOR_CATEGORIES.map((cat) => (
              <ColorSection key={cat} category={cat} />
            ))}
          </div>
        )}

        {tab === "layout" && <LayoutControls />}

        {tab === "presets" && (
          <div className="space-y-4">
            <PresetSelector />
            <button
              onClick={() => dispatch({ type: "RESET_TO_DEFAULTS" })}
              className="w-full px-3 py-2 text-xs font-medium border border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-300 rounded-lg transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        )}

        {tab === "export" && <ExportPanel />}
      </div>
    </div>
  );
}
