"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeModeToggle() {
  const { state, dispatch } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg p-0.5 bg-zinc-800">
      <button
        onClick={() => dispatch({ type: "SET_EDITING_MODE", mode: "light" })}
        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          state.editingMode === "light"
            ? "bg-zinc-700 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-300"
        }`}
      >
        <Sun className="inline w-3 h-3 mr-1" />
        Light
      </button>
      <button
        onClick={() => dispatch({ type: "SET_EDITING_MODE", mode: "dark" })}
        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          state.editingMode === "dark"
            ? "bg-zinc-700 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-300"
        }`}
      >
        <Moon className="inline w-3 h-3 mr-1" />
        Dark
      </button>
    </div>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 1zm0 10a3 3 0 100-6 3 3 0 000 6zm6.5-2.5a.5.5 0 010-1h1a.5.5 0 010 1h-1zm-13 0a.5.5 0 010-1h1a.5.5 0 010 1h-1zm10.657-5.157a.5.5 0 010 .707l-.707.707a.5.5 0 11-.707-.707l.707-.707a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707-.707l.707-.707a.5.5 0 01.707 0zm9.193 0a.5.5 0 01-.707 0l-.707-.707a.5.5 0 01.707-.707l.707.707a.5.5 0 010 .707zM3.757 4.464a.5.5 0 01-.707 0l-.707-.707a.5.5 0 11.707-.707l.707.707a.5.5 0 010 .707zM8 13a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 13z" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z" />
    </svg>
  );
}
