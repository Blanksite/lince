"use client";

import React from "react";
import Image from "next/image";
import { Terminal, Cpu, Shield } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full border-b border-[#242421] bg-[#0d0d0c]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#141413] border border-[#2c2c28] overflow-hidden shrink-0 shadow-sm">
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
            <span className="font-mono-tech font-bold text-sm tracking-[0.24em] text-[#f6f4ef]">
              LINCE
            </span>
            <span className="text-[10px] font-mono-tech tracking-[0.1em] text-[#73716a] hidden sm:inline">
              / VISTA DE LINCE
            </span>
          </div>
        </div>

        {/* Center: Monospaced Section Links (Noumen-style) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-tech text-[#b5b3ac]">
          <button
            onClick={() => onScrollToSection("narratives-section")}
            className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            01 / NARRATIVES
          </button>
          <button
            onClick={() => onScrollToSection("divergence-section")}
            className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            02 / ALPHA RADAR
          </button>
          <button
            onClick={() => onScrollToSection("kols-section")}
            className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            03 / KOL CONSENSUS
          </button>
          <button
            onClick={() => onScrollToSection("copilot-section")}
            className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            04 / COPILOT
          </button>
          <button
            onClick={() => onScrollToSection("mcp-section")}
            className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            05 / MCP
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* MCP Tools Button */}
          <button
            onClick={onOpenMcp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141413] hover:bg-[#1e1e1b] border border-[#2c2c28] text-xs font-mono-tech text-[#b5b3ac] hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span className="hidden sm:inline">MCP Protocol</span>
            <span className="sm:hidden">MCP</span>
          </button>

          {/* Venice AI Key / Badge */}
          <button
            onClick={onOpenVenice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono-tech transition-all cursor-pointer ${
              isVeniceConfigured
                ? "bg-[#1f172e] border-purple-500/40 text-purple-200"
                : "bg-[#141413] hover:bg-[#1e1e1b] border-[#2c2c28] text-[#b5b3ac] hover:text-[#f6f4ef]"
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">
              {isVeniceConfigured ? "Venice: Active" : "Venice AI"}
            </span>
            <span className="sm:hidden">Venice</span>
          </button>

          {/* Launch Terminal CTA (Solid Ivory Button Noumen Style) */}
          <button
            onClick={() => onScrollToSection("copilot-section")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] text-[#111110] font-semibold text-xs font-sans transition-all active:scale-95 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Terminal</span>
          </button>
        </div>
      </div>
    </header>
  );
}
