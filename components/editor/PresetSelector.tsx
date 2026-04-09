"use client";

import { PRESETS } from "@/lib/theme-presets";
import { useTheme } from "@/context/ThemeContext";
import { oklchToHex } from "@/lib/color-utils";

export function PresetSelector() {
  const { state, dispatch } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-2">
      {PRESETS.map((preset) => {
        const isActive = state.config.name === preset.name;
        const accent = oklchToHex(preset.light.colors.accent);
        const bg = oklchToHex(preset.light.colors.background);
        const surface = oklchToHex(preset.light.colors.surface);
        const success = oklchToHex(preset.light.colors.success);
        const danger = oklchToHex(preset.light.colors.danger);

        return (
          <button
            key={preset.name}
            onClick={() => dispatch({ type: "APPLY_PRESET", config: preset })}
            className={`p-2 rounded-lg border transition-all text-left ${
              isActive
                ? "border-blue-500 ring-1 ring-blue-500/50"
                : "border-zinc-700 hover:border-zinc-600"
            }`}
          >
            <div className="flex gap-1 mb-2">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: bg }} />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: accent }} />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: success }} />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: danger }} />
            </div>
            <span className="text-xs font-medium">{preset.name}</span>
          </button>
        );
      })}
    </div>
  );
}
