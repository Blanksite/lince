"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = "",
  showLabel = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--nm-line)] text-xs font-mono-tech opacity-60 ${className}`}
      >
        <Sun className="w-3.5 h-3.5" />
        {showLabel && <span>LIGHT</span>}
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] text-xs font-mono-tech transition-all cursor-pointer ${className}`}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-label="Toggle visual theme"
    >
      {isLight ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#d97706]" />
          {showLabel && <span className="text-[11px] font-semibold">LIGHT</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#06b6d4]" />
          {showLabel && <span className="text-[11px] font-semibold">DARK</span>}
        </>
      )}
    </button>
  );
}
