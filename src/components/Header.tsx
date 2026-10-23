"use client";

import React from "react";
import LynxLogo from "./LynxLogo";
import { Terminal, Cpu, Shield } from "lucide-react";

interface HeaderProps {
  onOpenMcp: () => void;
  onOpenVenice: () => void;
  isVeniceConfigured: boolean;
  onScrollToCopilot: () => void;
}

export default function Header({
  onOpenMcp,
  onOpenVenice,
  isVeniceConfigured,
  onScrollToCopilot,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2332] bg-[#090A0F]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#11141E] border border-[#1E2332] shadow-inner">
            <LynxLogo size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">LINCE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                VISTA DE LINCE
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 hidden sm:block">
              CRYPTO MINDSHARE &amp; NARRATIVE INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Center: Live Telemetry Ticker (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-neutral-400 bg-[#11141E] border border-[#1E2332] px-3.5 py-1.5 rounded-full">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-200">1,248</span>
            <span>Projects</span>
          </div>
          <span className="text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-200">6</span>
            <span>Socials</span>
          </div>
          <span className="text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">MCP Server Active</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* MCP Tools Button */}
          <button
            onClick={onOpenMcp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11141E] hover:bg-[#1A1F2E] border border-[#1E2332] text-xs font-mono text-neutral-300 hover:text-white transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">MCP Config</span>
            <span className="sm:hidden">MCP</span>
          </button>

          {/* Venice AI Key / Badge */}
          <button
            onClick={onOpenVenice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              isVeniceConfigured
                ? "bg-purple-950/30 border-purple-500/40 text-purple-300 hover:bg-purple-900/40"
                : "bg-[#11141E] hover:bg-[#1A1F2E] border-[#1E2332] text-neutral-300 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">
              {isVeniceConfigured ? "Venice AI: Active" : "Venice AI"}
            </span>
            <span className="sm:hidden">Venice</span>
          </button>

          {/* Launch Copilot CTA */}
          <button
            onClick={onScrollToCopilot}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Copilot</span>
          </button>
        </div>
      </div>
    </header>
  );
}
