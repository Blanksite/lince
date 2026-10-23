"use client";

import React from "react";
import { TrendingUp, Radio, Zap, ShieldCheck, Search, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectNarrativeTab: () => void;
  onSelectDivergenceTab: () => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  onSelectNarrativeTab,
  onSelectDivergenceTab,
}: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-10 border-b border-[#1E2332] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>CONTINUOUS MULTI-PLATFORM INDEXING</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>VENICE AI ZERO-LOGGING INTELLIGENCE</span>
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
            The Signal Within the Noise.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            <span className="text-neutral-200 font-semibold italic">Vista de Lince</span> for Web3 markets. 
            Real-time mindshare velocity, social sentiment, and KOL consensus indexed across six platforms—spotting 
            early alpha before it is already priced in.
          </p>
        </div>

        {/* Global Search / Command Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search narratives, tokens (e.g. AI, SPECTRE, DePIN), or KOL calls..."
              className="w-full pl-11 pr-24 py-3 rounded-xl bg-[#11141E] border border-[#1E2332] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                FILTER
              </span>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Leading Narrative */}
          <div
            onClick={onSelectNarrativeTab}
            className="p-4 rounded-xl bg-[#11141E] border border-[#1E2332] hover:border-cyan-500/40 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span>TOP NARRATIVE 24H</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
              AI Agents
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span>+18.2% mindshare</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Highest Alpha Divergence */}
          <div
            onClick={onSelectDivergenceTab}
            className="p-4 rounded-xl bg-[#11141E] border border-[#1E2332] hover:border-emerald-500/40 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span>ALPHA DIVERGENCE</span>
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
              SPECTRE <span className="text-xs text-neutral-500 font-mono">(Base)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span>96/100 Signal Score</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Top KOL Consensus */}
          <div className="p-4 rounded-xl bg-[#11141E] border border-[#1E2332]">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span>KOL HIT RATE</span>
              <Radio className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mb-1">
              81% Verified
            </div>
            <div className="text-xs font-mono text-neutral-400">
              18 prominent analysts tracked
            </div>
          </div>

          {/* Card 4: Model Context Protocol */}
          <div className="p-4 rounded-xl bg-[#11141E] border border-[#1E2332]">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span>AI COMPLIANCE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mb-1">
              MCP Native
            </div>
            <div className="text-xs font-mono text-cyan-400">
              Ready for Cursor &amp; Claude
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
