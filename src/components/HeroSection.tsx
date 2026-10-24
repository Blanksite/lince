"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Zap, Radio, ShieldCheck, ArrowRight, Terminal } from "lucide-react";
import TechText from "@/components/TechText";
import LiveClock from "@/components/LiveClock";

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-14 border-b border-[var(--nm-line)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Kicker & Live Sync Clock */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
              [ 01 / VISTA DE LINCE · COGNITIVE MINDSHARE RADAR ]
            </span>
          </div>

          <div className="hidden sm:flex items-center px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-[11px] font-mono-tech text-[var(--nm-text-muted)]">
            <LiveClock prefix="SYNC:" />
          </div>
        </div>

        {/* Hero Title (Interactive TechText Animation from ReactBits) */}
        <div className="max-w-5xl mb-6 text-[var(--nm-text)]">
          <h1 className="sr-only">Sharp vision in a noisy market.</h1>
          <div className="w-full h-24 sm:h-36 lg:h-44 -ml-0.5">
            <TechText
              text="Sharp vision in a noisy market."
              fontFamily="'Instrument Serif', Georgia, serif"
              fontWeight={400}
              fontSize={130}
              color="currentColor"
              accentColor="var(--nm-accent-cyan)"
              align="left"
              lineStyle="dashed"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              strokeWidth={1.5}
              specks={16}
              selection={true}
              labels={true}
              draggable={true}
              bounce={0.45}
              sweep={true}
              speed={1}
              clickKick={true}
              intro="assemble"
              introDuration={1.8}
              guides={true}
              className="w-full h-full cursor-crosshair"
            />
          </div>
        </div>

        {/* Hero Description & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
          <p className="text-base sm:text-lg text-[var(--nm-text-muted)] leading-relaxed max-w-[54ch] font-sans">
            Lince indexes cross-platform attention velocity, sentiment polarity, and KOL consensus across six channels—spotting 
            early accumulation anomalies before they are priced in by retail.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onScrollToSection("narratives-section")}
              className="px-5 py-2.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span>Explore live signals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/terminal"
              className="px-5 py-2.5 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[var(--nm-accent-cyan)]" />
              <span>Launch Terminal App</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Section Index Bar (Editorial style) */}
        <div className="w-full border-t border-[var(--nm-line)] pt-4 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] text-[11px] font-mono-tech text-[var(--nm-text-subtle)]">
            <span className="text-[var(--nm-text-muted)] font-bold">INTELLIGENCE FRAMEWORK</span>
            <button
              onClick={() => onScrollToSection("narratives-section")}
              className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
            >
              NARRATIVES 01
            </button>
            <button
              onClick={() => onScrollToSection("divergence-section")}
              className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
            >
              ALPHA RADAR 02
            </button>
            <button
              onClick={() => onScrollToSection("kols-section")}
              className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
            >
              KOL CONSENSUS 03
            </button>
            <Link
              href="/terminal"
              className="hover:text-[var(--nm-text)] transition-colors cursor-pointer text-[var(--nm-accent-cyan)]"
            >
              TERMINAL COPILOT 04
            </Link>
            <button
              onClick={() => onScrollToSection("mcp-section")}
              className="hover:text-[var(--nm-text)] transition-colors cursor-pointer"
            >
              MCP PROTOCOL 05
            </button>
          </div>
        </div>

        {/* 4-Column Metric Grid with Hairline Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--nm-line)] rounded-xl bg-[var(--nm-surface)] divide-y lg:divide-y-0 lg:divide-x divide-[var(--nm-line)] overflow-hidden shadow-sm">
          {/* Card 1 */}
          <div className="p-6">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)] mb-3">
              <span>01 / COVERAGE</span>
              <Radio className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
            </div>
            <div className="font-mono-tech text-3xl font-bold text-[var(--nm-text)] tracking-tight mb-1">
              1,248
            </div>
            <p className="text-xs text-[var(--nm-text-muted)]">
              Tokens indexed across 6 networks &amp; pre-TGE repos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)] mb-3">
              <span>02 / STREAM</span>
              <TrendingUp className="w-3.5 h-3.5 text-[var(--nm-accent-emerald)]" />
            </div>
            <div className="font-mono-tech text-3xl font-bold text-[var(--nm-text)] tracking-tight mb-1">
              2.4M
            </div>
            <p className="text-xs text-[var(--nm-text-muted)]">
              24h social data points ingested &amp; de-noised.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)] mb-3">
              <span>03 / DIVERGENCE</span>
              <Zap className="w-3.5 h-3.5 text-[var(--nm-accent-amber)]" />
            </div>
            <div className="font-mono-tech text-3xl font-bold text-[var(--nm-text)] tracking-tight mb-1">
              14 Active
            </div>
            <p className="text-xs text-[var(--nm-text-muted)]">
              High-confidence early accumulation anomalies flagged.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)] mb-3">
              <span>04 / PRIVACY</span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="font-mono-tech text-3xl font-bold text-[var(--nm-text)] tracking-tight mb-1">
              Zero
            </div>
            <p className="text-xs text-[var(--nm-text-muted)]">
              Query prompts retained. Venice AI verifiable inference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
