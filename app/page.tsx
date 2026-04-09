"use client";

import dynamic from "next/dynamic";

const ThemeEditor = dynamic(() => import("@/components/ThemeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-zinc-900 text-white">
      <p className="text-sm text-zinc-500">Loading theme editor...</p>
    </div>
  ),
});

export default function Home() {
  return <ThemeEditor />;
}
