"use client";

import { useState, useCallback, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import type { OklchColor, ThemeColors } from "@/lib/types";
import { oklchToHex, hexToOklch, oklchToCss, isOklchDisplayable } from "@/lib/color-utils";
import { OklchSliders } from "./OklchSliders";
import { useTheme } from "@/context/ThemeContext";
import type { ColorVarMeta } from "@/lib/constants";

type Props = {
  meta: ColorVarMeta;
};

export function ColorEditor({ meta }: Props) {
  const { state, dispatch, currentColors } = useTheme();
  const color = currentColors[meta.key];
  const hex = oklchToHex(color);
  const [hexInput, setHexInput] = useState(hex);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setHexInput(oklchToHex(color));
  }, [color]);

  const setColor = useCallback(
    (value: OklchColor) => {
      dispatch({
        type: "SET_COLOR",
        mode: state.editingMode,
        key: meta.key,
        value,
      });
    },
    [dispatch, state.editingMode, meta.key]
  );

  const handleHexChange = useCallback(
    (newHex: string) => {
      setHexInput(newHex);
      const oklch = hexToOklch(newHex);
      if (oklch) setColor(oklch);
    },
    [setColor]
  );

  const handleHexBlur = useCallback(() => {
    const oklch = hexToOklch(hexInput);
    if (oklch) {
      setColor(oklch);
    } else {
      setHexInput(hex);
    }
  }, [hexInput, hex, setColor]);

  const gamutOk = isOklchDisplayable(color);

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800/50 transition-colors"
      >
        <div
          className="w-6 h-6 rounded-md border border-zinc-600 shrink-0"
          style={{ backgroundColor: hex }}
        />
        <span className="text-sm flex-1 text-left">{meta.label}</span>
        {!gamutOk && (
          <span className="text-[10px] text-amber-400 px-1.5 py-0.5 bg-amber-400/10 rounded">
            OOG
          </span>
        )}
        <span className="text-xs font-mono text-zinc-500">{hexInput}</span>
        <svg
          className={`w-3 h-3 text-zinc-500 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          <div className="flex gap-3">
            <div className="w-[160px] shrink-0">
              <HexColorPicker
                color={hex}
                onChange={handleHexChange}
                style={{ width: "100%", height: "120px" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-zinc-500">Hex</span>
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  onBlur={handleHexBlur}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mb-1">
                {oklchToCss(color)}
              </div>
            </div>
          </div>
          <OklchSliders value={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
}
