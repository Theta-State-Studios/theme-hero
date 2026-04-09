"use client";

import { useState } from "react";
import { COLOR_VARS, type ColorVarMeta } from "@/lib/constants";
import { ColorEditor } from "./ColorEditor";

type Props = {
  category: string;
};

export function ColorSection({ category }: Props) {
  const [expanded, setExpanded] = useState(true);
  const vars = COLOR_VARS.filter((v) => v.category === category);

  if (vars.length === 0) return null;

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {category}
        </span>
        <span className="text-xs text-zinc-500">{vars.length}</span>
      </button>
      {expanded && (
        <div>
          {vars.map((v) => (
            <ColorEditor key={v.key} meta={v} />
          ))}
        </div>
      )}
    </div>
  );
}
