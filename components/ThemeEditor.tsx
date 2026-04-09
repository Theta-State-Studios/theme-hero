"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { PreviewPanel } from "@/components/preview/PreviewPanel";

export default function ThemeEditor() {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <EditorSidebar />
        <PreviewPanel />
      </div>
    </ThemeProvider>
  );
}
