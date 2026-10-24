"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Zap, Radio, ShieldCheck, ArrowRight, Terminal } from "lucide-react";

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-14 border-b border-[#242421]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Kicker (Noumen style) */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#b5b3ac]">
            CROSS-PLATFORM SOCIAL MINDSHARE · VISTA DE LINCE
          </span>
        </div>

        {/* Hero Title (Instrument Serif) */}
        <div className="max-w-4xl mb-6">
          <h1 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#f6f4ef] leading-[1.02] font-normal">
            The signal, within reach.
          </h1>
        </div>

        {/* Hero Description & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
          <p className="text-base sm:text-lg text-[#b5b3ac] leading-relaxed max-w-[52ch] font-sans">
            Lince indexes crypto mindshare velocity, sentiment polarity, and KOL consensus across six platforms—spotting 
            early alpha divergences before they are priced in by retail.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onScrollToSection("narratives-section")}
              className="px-5 py-2.5 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] text-[#111110] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore live signals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/terminal"
              className="px-5 py-2.5 rounded-md bg-transparent hover:bg-[#1a1a18] border border-[#2c2c28] text-[#f6f4ef] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#06b6d4]" />
              <span>Launch Terminal App</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Section Index Bar (Noumen signature style) */}
        <div className="w-full border-t border-[#242421] pt-4 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] text-[11px] font-mono-tech text-[#73716a]">
            <span className="text-[#b5b3ac] font-bold">INTELLIGENCE FRAMEWORK</span>
            <button
              onClick={() => onScrollToSection("narratives-section")}
              className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              NARRATIVES 01
            </button>
            <button
              onClick={() => onScrollToSection("divergence-section")}
              className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              ALPHA RADAR 02
            </button>
            <button
              onClick={() => onScrollToSection("kols-section")}
              className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              KOL CONSENSUS 03
            </button>
            <button
              onClick={() => onScrollToSection("copilot-section")}
              className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              AI COPILOT 04
            </button>
            <button
              onClick={() => onScrollToSection("mcp-section")}
              className="hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              MCP SERVER 05
            </button>
          </div>
        </div>

        {/* 4 Telemetry Metrics Grid (Noumen clean grid styling) */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#242421] divide-x divide-y md:divide-y-0 divide-[#242421] bg-[#111110]/50">
          {/* Metric 1 */}
          <div className="p-5">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#73716a] block mb-2">
              01 / TOP NARRATIVE 24H
            </span>
            <div className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] mb-1">
              Autonomous AI
            </div>
            <div className="text-xs font-mono-tech text-[#10b981] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.2% mindshare</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-5">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#73716a] block mb-2">
              02 / HIGHEST DIVERGENCE
            </span>
            <div className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] mb-1">
              SPECTRE <span className="text-sm font-mono-tech text-[#73716a]">($18.4M)</span>
            </div>
            <div className="text-xs font-mono-tech text-[#10b981] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>96/100 Early Accumulation</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-5">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#73716a] block mb-2">
              03 / ANALYST HIT RATE
            </span>
            <div className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] mb-1">
              81% Verified
            </div>
            <div className="text-xs font-mono-tech text-[#b5b3ac] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>18 prominent KOLs</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-5">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#73716a] block mb-2">
              04 / PRIVACY STANDARD
            </span>
            <div className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] mb-1">
              Zero Retention
            </div>
            <div className="text-xs font-mono-tech text-purple-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Venice AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
