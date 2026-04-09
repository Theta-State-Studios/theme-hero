"use client";

import { useState, useMemo, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import type { OklchColor } from "@/lib/types";
import { oklchToHex, hexToOklch, oklchToCss } from "@/lib/color-utils";
import { generateThemeFromAccent, type ModeSettings } from "@/lib/theme-generator";
import { useTheme } from "@/context/ThemeContext";

const DEFAULT_ACCENT: OklchColor = { l: 0.55, c: 0.2, h: 264 };

export function GeneratePanel() {
  const { dispatch } = useTheme();
  const [accent, setAccent] = useState<OklchColor>(DEFAULT_ACCENT);
  const [neutralHue, setNeutralHue] = useState(286);
  const [neutralChroma, setNeutralChroma] = useState(0.005);
  const [lightSettings, setLightSettings] = useState<ModeSettings>({ brightness: 0, contrast: 1 });
  const [darkSettings, setDarkSettings] = useState<ModeSettings>({ brightness: 0, contrast: 1 });
  const [editingGenMode, setEditingGenMode] = useState<"light" | "dark">("light");
  const [hexInput, setHexInput] = useState(oklchToHex(DEFAULT_ACCENT));

  const currentSettings = editingGenMode === "light" ? lightSettings : darkSettings;
  const setCurrentSettings = editingGenMode === "light" ? setLightSettings : setDarkSettings;

  const generated = useMemo(
    () => generateThemeFromAccent({ accent, neutralHue, neutralChroma, light: lightSettings, dark: darkSettings }),
    [accent, neutralHue, neutralChroma, lightSettings, darkSettings]
  );

  const handleAccentHex = useCallback((hex: string) => {
    setHexInput(hex);
    const oklch = hexToOklch(hex);
    if (oklch) setAccent(oklch);
  }, []);

  const handleApply = useCallback(() => {
    dispatch({ type: "APPLY_PRESET", config: generated });
  }, [dispatch, generated]);

  const lightColors = generated.light.colors;
  const darkColors = generated.dark.colors;

  return (
    <div className="space-y-4">
      {/* Accent color picker */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium mb-2 block">
          Accent Color
        </label>
        <div className="flex gap-3">
          <div className="w-[140px] shrink-0">
            <HexColorPicker
              color={oklchToHex(accent)}
              onChange={handleAccentHex}
              style={{ width: "100%", height: "120px" }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Hex</span>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleAccentHex(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              {oklchToCss(accent)}
            </div>
            <div
              className="w-full h-8 rounded-md border border-zinc-700"
              style={{ backgroundColor: oklchToHex(accent) }}
            />
          </div>
        </div>
      </div>

      {/* Neutral hue slider */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium mb-2 block">
          Neutral Hue
        </label>
        <div className="relative h-6 mb-1">
          <div
            className="absolute inset-0 rounded-full h-3 top-1.5"
            style={{
              background: `linear-gradient(to right,
                oklch(0.5 0.015 0),
                oklch(0.5 0.015 60),
                oklch(0.5 0.015 120),
                oklch(0.5 0.015 180),
                oklch(0.5 0.015 240),
                oklch(0.5 0.015 300),
                oklch(0.5 0.015 360)
              )`,
            }}
          />
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={neutralHue}
            onChange={(e) => setNeutralHue(parseFloat(e.target.value))}
            className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3.5
              [&::-webkit-slider-thumb]:h-3.5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-zinc-300
              [&::-webkit-slider-thumb]:shadow-sm
              [&::-webkit-slider-thumb]:cursor-pointer
            "
          />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>{neutralHue}°</span>
          <span>
            {neutralHue < 30 ? "Red" :
             neutralHue < 60 ? "Orange" :
             neutralHue < 90 ? "Yellow" :
             neutralHue < 150 ? "Green" :
             neutralHue < 210 ? "Cyan" :
             neutralHue < 270 ? "Blue" :
             neutralHue < 330 ? "Purple" : "Red"}
            {" gray"}
          </span>
        </div>
      </div>

      {/* Neutral chroma slider */}
      <GenSlider
        label="Neutral Tint"
        value={neutralChroma}
        min={0}
        max={0.04}
        step={0.001}
        display={neutralChroma.toFixed(3)}
        leftLabel="Pure gray"
        rightLabel="Strong tint"
        onChange={setNeutralChroma}
      />

      {/* Per-mode settings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
            Mode Settings
          </label>
          <div className="flex items-center gap-1 rounded-lg p-0.5 bg-zinc-800">
            <button
              onClick={() => setEditingGenMode("light")}
              className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${
                editingGenMode === "light"
                  ? "bg-zinc-700 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setEditingGenMode("dark")}
              className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${
                editingGenMode === "dark"
                  ? "bg-zinc-700 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <GenSlider
            label="Brightness"
            value={currentSettings.brightness}
            min={-0.1}
            max={0.1}
            step={0.005}
            display={currentSettings.brightness > 0 ? `+${currentSettings.brightness.toFixed(3)}` : currentSettings.brightness.toFixed(3)}
            leftLabel="Darker"
            rightLabel="Lighter"
            onChange={(v) => setCurrentSettings({ ...currentSettings, brightness: v })}
          />
          <GenSlider
            label="Contrast"
            value={currentSettings.contrast}
            min={0.3}
            max={2.0}
            step={0.05}
            display={`${(currentSettings.contrast * 100).toFixed(0)}%`}
            leftLabel="Flat"
            rightLabel="High contrast"
            onChange={(v) => setCurrentSettings({ ...currentSettings, contrast: v })}
          />
        </div>
      </div>

      {/* Palette preview */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium mb-2 block">
          Preview
        </label>

        <div className="mb-2">
          <span className="text-[10px] text-zinc-500 mb-1 block">Light</span>
          <div
            className="flex gap-0.5 p-2 rounded-lg"
            style={{ backgroundColor: oklchToHex(lightColors.background) }}
          >
            <Swatch color={lightColors.background} label="BG" />
            <Swatch color={lightColors.surface} label="Srf" />
            <Swatch color={lightColors.accent} label="Acc" />
            <Swatch color={lightColors.success} label="Suc" />
            <Swatch color={lightColors.warning} label="Wrn" />
            <Swatch color={lightColors.danger} label="Dng" />
            <Swatch color={lightColors.border} label="Bdr" />
          </div>
        </div>

        <div>
          <span className="text-[10px] text-zinc-500 mb-1 block">Dark</span>
          <div
            className="flex gap-0.5 p-2 rounded-lg"
            style={{ backgroundColor: oklchToHex(darkColors.background) }}
          >
            <Swatch color={darkColors.background} label="BG" />
            <Swatch color={darkColors.surface} label="Srf" />
            <Swatch color={darkColors.accent} label="Acc" />
            <Swatch color={darkColors.success} label="Suc" />
            <Swatch color={darkColors.warning} label="Wrn" />
            <Swatch color={darkColors.danger} label="Dng" />
            <Swatch color={darkColors.border} label="Bdr" />
          </div>
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="w-full px-4 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
      >
        Apply Generated Theme
      </button>
    </div>
  );
}

function GenSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  leftLabel,
  rightLabel,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  leftLabel: string;
  rightLabel: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
          {label}
        </label>
        <span className="text-xs font-mono text-zinc-500">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:cursor-pointer
        "
      />
      <div className="flex justify-between text-[10px] text-zinc-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function Swatch({ color, label }: { color: OklchColor; label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5">
      <div
        className="w-full aspect-square rounded-md border border-white/10"
        style={{ backgroundColor: oklchToHex(color) }}
      />
      <span className="text-[8px] opacity-60">{label}</span>
    </div>
  );
}
