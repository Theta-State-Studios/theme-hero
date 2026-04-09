"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { generateExportJson } from "@/lib/css-generator";
import type { ThemeConfig } from "@/lib/types";

export function ExportPanel() {
  const { state, dispatch, exportCss } = useTheme();
  const [tab, setTab] = useState<"css" | "json">("css");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonOutput = generateExportJson(state.config);
  const content = tab === "css" ? exportCss : jsonOutput;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportFile = () => {
    const blob = new Blob([content], {
      type: tab === "css" ? "text/css" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = tab === "css" ? "heroui-theme.css" : "heroui-theme.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const config = JSON.parse(ev.target?.result as string) as ThemeConfig;
        if (config.light && config.dark) {
          dispatch({ type: "IMPORT_CONFIG", config });
        }
      } catch {
        alert("Invalid theme JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Tab selector */}
      <div className="flex items-center gap-1 rounded-lg p-0.5 bg-zinc-800">
        <button
          onClick={() => setTab("css")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            tab === "css"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          CSS
        </button>
        <button
          onClick={() => setTab("json")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            tab === "json"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          JSON
        </button>
      </div>

      {/* Code output */}
      <div className="relative">
        <pre className="bg-zinc-800 rounded-lg p-3 text-[11px] font-mono text-zinc-300 overflow-auto max-h-64 whitespace-pre-wrap">
          {content}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleExportFile}
          className="flex-1 px-3 py-2 text-xs font-medium bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
        >
          Download
        </button>
      </div>

      {tab === "json" && (
        <>
          <button
            onClick={handleImport}
            className="w-full px-3 py-2 text-xs font-medium border border-zinc-700 hover:border-zinc-600 text-zinc-300 rounded-lg transition-colors"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
