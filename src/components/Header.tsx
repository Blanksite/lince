"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Cpu } from "lucide-react";
import VeniceLogo from "@/components/VeniceLogo";
import LiveClock from "@/components/LiveClock";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  onOpenMcp: () => void;
  onOpenVenice: () => void;
  isVeniceConfigured: boolean;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({
  onOpenMcp,
  onOpenVenice,
  isVeniceConfigured,
  onScrollToSection,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--nm-line)] bg-[var(--nm-bg)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm">
            <Image
              src="/logo.jpg"
              alt="Lince Lynx Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-tech font-bold text-sm tracking-[0.24em] text-[var(--nm-text)]">
              LINCE
            </span>
            <span className="text-[10px] font-mono-tech tracking-[0.1em] text-[var(--nm-text-subtle)] hidden sm:inline">
              / VISTA DE LINCE
            </span>
          </div>
        </div>

        {/* Center: Monospaced Section Links (Editorial style) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <button
            onClick={() => onScrollToSection("narratives-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            01 / NARRATIVES
          </button>
          <button
            onClick={() => onScrollToSection("divergence-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            02 / ALPHA RADAR
          </button>
          <button
            onClick={() => onScrollToSection("kols-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            03 / KOL CONSENSUS
          </button>
          <Link
            href="/terminal"
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer text-[var(--nm-accent-cyan)] font-semibold"
          >
            04 / TERMINAL APP
          </Link>
          <button
            onClick={() => onScrollToSection("mcp-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            05 / MCP
          </button>
        </nav>

        {/* Right: Actions, Live Clock & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Live Synchronized Clock */}
          <div className="hidden xl:flex items-center px-2.5 py-1 rounded-md bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text-muted)]">
            <LiveClock />
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle />

          {/* MCP Tools Button */}
          <button
            onClick={onOpenMcp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
            <span className="hidden sm:inline">MCP Protocol</span>
            <span className="sm:hidden">MCP</span>
          </button>

          {/* Venice AI Key / Badge */}
          <button
            onClick={onOpenVenice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono-tech transition-all cursor-pointer ${
              isVeniceConfigured
                ? "bg-purple-950/20 border-purple-500/40 text-purple-400 font-semibold"
                : "bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border-[var(--nm-line)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)]"
            }`}
          >
            <VeniceLogo className="w-3.5 h-3.5 text-purple-500" />
            <span className="hidden sm:inline">
              {isVeniceConfigured ? "Venice: Active" : "Venice AI"}
            </span>
            <span className="sm:hidden">Venice</span>
          </button>

          {/* Launch Terminal CTA (Inverted Solid Action Button) */}
          <Link
            href="/terminal"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Terminal</span>
            <span className="sm:hidden">Terminal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
