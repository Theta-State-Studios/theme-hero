"use client";

import { useTheme } from "@/context/ThemeContext";

export function LayoutControls() {
  const { state, dispatch } = useTheme();
  const layout = state.config[state.editingMode].layout;

  const setLayout = (key: "radius" | "spacing" | "borderWidth" | "disabledOpacity", value: number) => {
    dispatch({ type: "SET_LAYOUT", mode: state.editingMode, key, value });
  };

  return (
    <div className="space-y-4">
      <LayoutSlider
        label="Border Radius"
        value={layout.radius}
        min={0}
        max={1.5}
        step={0.05}
        display={`${layout.radius}rem`}
        onChange={(v) => setLayout("radius", v)}
      />
      <LayoutSlider
        label="Spacing Unit"
        value={layout.spacing}
        min={0.1}
        max={0.5}
        step={0.01}
        display={`${layout.spacing}rem`}
        onChange={(v) => setLayout("spacing", v)}
      />
      <LayoutSlider
        label="Border Width"
        value={layout.borderWidth}
        min={0}
        max={3}
        step={0.5}
        display={`${layout.borderWidth}px`}
        onChange={(v) => setLayout("borderWidth", v)}
      />
      <LayoutSlider
        label="Disabled Opacity"
        value={layout.disabledOpacity}
        min={0.1}
        max={1}
        step={0.05}
        display={`${(layout.disabledOpacity * 100).toFixed(0)}%`}
        onChange={(v) => setLayout("disabledOpacity", v)}
      />
    </div>
  );
}

function LayoutSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-xs font-mono text-zinc-500">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-blue-500 h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:cursor-pointer
        "
      />
    </div>
  );
}
