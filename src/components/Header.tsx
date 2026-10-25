"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  onOpenMcp?: () => void;
  onOpenVenice?: () => void;
  isVeniceConfigured?: boolean;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({
  onScrollToSection,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--nm-line)] bg-[var(--nm-bg)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--nm-surface)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Lince Logo"
              width={28}
              height={28}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-mono-tech font-bold text-sm tracking-[0.2em] text-[var(--nm-text)]">
            LINCE
          </span>
        </Link>

        {/* Center: Clean & Quiet Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <button
            onClick={() => onScrollToSection("narratives-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            Narratives
          </button>
          <button
            onClick={() => onScrollToSection("divergence-section")}
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            Alpha Radar
          </button>
          <Link
            href="/how-it-works"
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            How it works
          </Link>
          <Link
            href="/docs"
            className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            Docs
          </Link>
        </nav>

        {/* Right: Only Essential Actions (Theme & Terminal) */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href="/terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
