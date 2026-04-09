"use client";

import type { OklchColor } from "@/lib/types";

type Props = {
  value: OklchColor;
  onChange: (color: OklchColor) => void;
};

export function OklchSliders({ value, onChange }: Props) {
  return (
    <div className="space-y-2 pt-2">
      <SliderRow
        label="L"
        value={value.l}
        min={0}
        max={1}
        step={0.001}
        display={`${(value.l * 100).toFixed(1)}%`}
        onChange={(l) => onChange({ ...value, l })}
        gradient={`linear-gradient(to right, oklch(0 ${value.c} ${value.h}), oklch(0.5 ${value.c} ${value.h}), oklch(1 ${value.c} ${value.h}))`}
      />
      <SliderRow
        label="C"
        value={value.c}
        min={0}
        max={0.4}
        step={0.001}
        display={value.c.toFixed(3)}
        onChange={(c) => onChange({ ...value, c })}
        gradient={`linear-gradient(to right, oklch(${value.l} 0 ${value.h}), oklch(${value.l} 0.2 ${value.h}), oklch(${value.l} 0.4 ${value.h}))`}
      />
      <SliderRow
        label="H"
        value={value.h}
        min={0}
        max={360}
        step={0.5}
        display={`${value.h.toFixed(1)}°`}
        onChange={(h) => onChange({ ...value, h })}
        gradient={`linear-gradient(to right, oklch(${value.l} ${value.c} 0), oklch(${value.l} ${value.c} 60), oklch(${value.l} ${value.c} 120), oklch(${value.l} ${value.c} 180), oklch(${value.l} ${value.c} 240), oklch(${value.l} ${value.c} 300), oklch(${value.l} ${value.c} 360))`}
      />
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  gradient,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 text-xs font-mono text-zinc-400">{label}</span>
      <div className="relative flex-1 h-5">
        <div
          className="absolute inset-0 rounded-full h-2 top-1.5"
          style={{ background: gradient }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
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
      <span className="w-14 text-right text-xs font-mono text-zinc-400">
        {display}
      </span>
    </div>
  );
}
