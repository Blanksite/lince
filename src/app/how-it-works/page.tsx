"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Zap,
  Radio,
  ShieldCheck,
  TrendingUp,
  Activity,
  CheckCircle2,
  Share2,
  Database,
  Search,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import VeniceLogo from "@/components/VeniceLogo";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  const PIPELINE_STAGES = [
    {
      step: "01",
      title: "Cross-Platform Social Telemetry Ingestion",
      tagline: "Continuous multi-channel ingestion bypassing rate limits and algorithmic echo chambers.",
      icon: Radio,
      details: [
        "Monitors 6 live conversation networks: X (Twitter), Telegram alpha alpha groups, YouTube, Farcaster, Reddit, and TikTok.",
        "Indexes over 1,200 token tickers, project handles, and contract addresses concurrently.",
        "Proprietary anti-sybil heuristic strips bot spam, paid shill campaigns, and artificial volume loops.",
      ],
      badge: "6 FEEDS · 10M REFRESH",
    },
    {
      step: "02",
      title: "Mindshare Normalization & Attention Velocity",
      tagline: "Converting raw noisy posts into normalized market share of cognitive attention.",
      icon: Activity,
      details: [
        "Mindshare (%) represents a token or sector's exact proportion of total active crypto conversation.",
        "Tracks 24h attention velocity to pinpoint which sectors are gaining exponential social momentum.",
        "Applies semantic polarity scoring (0.00 to 1.00) to distinguish organic accumulation from FUD.",
      ],
      badge: "NORMALIZED TO 100%",
    },
    {
      step: "03",
      title: "On-Chain DEX Liquidity Cross-Indexing",
      tagline: "Grounding social hype in decentralized liquidity pool telemetry.",
      icon: Database,
      details: [
        "Polls Uniswap v3, Raydium, Aerodrome, and Curve pools across Base, Solana, Arbitrum, and Ethereum.",
        "Correlates attention spikes against actual on-chain DEX trading volume and market capitalization.",
        "Filters out illiquid honeypots and low-float manipulation before signals are generated.",
      ],
      badge: "BASE · SOLANA · ETHEREUM",
    },
    {
      step: "04",
      title: "Alpha Divergence Scoring Algorithm",
      tagline: "Spotting the mathematical disconnect between rising attention and lagging price.",
      icon: TrendingUp,
      details: [
        "Calculates the Divergence Score (0–100): high social spike with compressed price = early accumulation.",
        "Factor in Tier-1 smart followers and research KOL citations to weight conviction.",
        "Flags tokens in early accumulation stage 12 to 48 hours before broad market discovery.",
      ],
      badge: "SCORE 0–100",
    },
    {
      step: "05",
      title: "Zero-Retention Inference via Venice AI",
      tagline: "Institutional intelligence without leaking user proprietary prompts or theses.",
      icon: ShieldCheck,
      details: [
        "Decentralized inference powered by Venice AI (Llama 3.3 70B & DeepSeek R1).",
        "Zero data retention: no prompt storage, IP logging, or training on user queries.",
        "Built-in deterministic heuristics engine ensures complete functionality at Rp 0 cost without keys.",
      ],
      badge: "ZERO LOGS · BYOK READY",
    },
    {
      step: "06",
      title: "Model Context Protocol (MCP) Distribution",
      tagline: "Direct JSON-RPC 2.0 streaming into AI coding agents and autonomous trading bots.",
      icon: Cpu,
      details: [
        "Exposes live tools: lince_get_narratives, lince_get_alpha_divergence, and lince_get_kols.",
        "Native integration into Cursor (~/.cursor/mcp.json), Claude Desktop, and Windsurf.",
        "Autonomous agents can programmatically query market mindshare as tool-calls within development loops.",
      ],
      badge: "JSON-RPC 2.0 PROTOCOL",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--nm-bg)] text-[var(--nm-text)] flex flex-col font-sans selection:bg-[var(--nm-action)] selection:text-[var(--nm-action-text)] transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--nm-line)] bg-[var(--nm-surface)]/95 backdrop-blur-md px-4 sm:px-6 h-14 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Lince Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-tech font-bold text-sm tracking-[0.2em] text-[var(--nm-text)]">
                LINCE
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[var(--nm-text-subtle)] hidden sm:inline">
                / HOW IT WORKS
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <Link href="/" className="hover:text-[var(--nm-text)] transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="text-[var(--nm-text)] font-semibold transition-colors">
            How it works
          </Link>
          <Link href="/docs" className="hover:text-[var(--nm-text)] transition-colors">
            Docs
          </Link>
          <Link href="/terms" className="hover:text-[var(--nm-text)] transition-colors">
            Terms
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans transition-all active:scale-95 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-16 border-b border-[var(--nm-line)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)] animate-pulse" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[var(--nm-text-muted)]">
                [ PROTOCOL ARCHITECTURE · HOW LINCE WORKS ]
              </span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--nm-text)] leading-[1.04] mb-6">
              How Lince indexes the crypto mindshare economy.
            </h1>

            <p className="text-base sm:text-lg text-[var(--nm-text-muted)] leading-relaxed font-sans max-w-3xl mb-8">
              Crypto markets are driven by narrative velocity and capital rotation. Lince turns raw, unstructured chatter across 6 social networks into verifiable on-chain divergence signals—without retaining user data or selling private order flow.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech">
              <div className="px-3 py-1.5 rounded-md bg-[var(--nm-surface)] border border-[var(--nm-line)] flex items-center gap-2">
                <span className="text-[var(--nm-text-subtle)]">BATCH CADENCE:</span>
                <span className="font-bold text-[var(--nm-text)]">EVERY 10 MIN</span>
              </div>
              <div className="px-3 py-1.5 rounded-md bg-[var(--nm-surface)] border border-[var(--nm-line)] flex items-center gap-2">
                <span className="text-[var(--nm-text-subtle)]">LAST INGESTION:</span>
                <span className="font-bold text-[var(--nm-accent-emerald)]">12:48 UTC</span>
              </div>
              <div className="px-3 py-1.5 rounded-md bg-[var(--nm-surface)] border border-[var(--nm-line)] flex items-center gap-2">
                <span className="text-[var(--nm-text-subtle)]">INFERENCE:</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                  <VeniceLogo className="w-3 h-3" /> ZERO-RETENTION
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6-Stage Pipeline Breakdown */}
        <section className="py-20 border-b border-[var(--nm-line)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-14">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-text-subtle)] block mb-2">
                END-TO-END TELEMETRY PIPELINE
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[var(--nm-text)]">
                The 6 stages of signal synthesis.
              </h2>
            </div>

            <div className="space-y-6">
              {PIPELINE_STAGES.map((stage) => {
                const IconComponent = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="p-6 sm:p-8 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] transition-all shadow-sm group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-[var(--nm-accent-cyan)] shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono-tech text-[var(--nm-text-subtle)] block">
                            STAGE {stage.step}
                          </span>
                          <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <span className="self-start text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded bg-[var(--nm-badge-bg)] text-[var(--nm-text-muted)] border border-[var(--nm-line)] shrink-0">
                        {stage.badge}
                      </span>
                    </div>

                    <p className="text-sm font-sans text-[var(--nm-text)] font-medium mb-4 leading-relaxed">
                      {stage.tagline}
                    </p>

                    <ul className="space-y-2 text-xs sm:text-sm font-sans text-[var(--nm-text-muted)] leading-relaxed pl-1">
                      {stage.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--nm-accent-emerald)] font-bold shrink-0 mt-0.5">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mathematical Formulation of Alpha Divergence */}
        <section id="methodology" className="py-20 border-b border-[var(--nm-line)] bg-[var(--nm-surface)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-text-subtle)] block mb-2">
                QUANTITATIVE METHODOLOGY
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[var(--nm-text)] mb-4">
                The Alpha Divergence formula.
              </h2>
              <p className="text-sm sm:text-base text-[var(--nm-text-muted)] leading-relaxed font-sans">
                In efficient markets, asset prices quickly incorporate information. In decentralized crypto networks, social attention precedes price discovery by several hours to days. We quantify this delay mathematically.
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-6 sm:p-8 rounded-xl bg-[var(--nm-code-bg)] border border-[var(--nm-line)] mb-8">
              <div className="text-xs font-mono-tech text-[var(--nm-text-subtle)] uppercase mb-3 tracking-wider">
                FORMULATION V1.4:
              </div>
              <div className="font-mono-tech text-sm sm:text-lg text-[var(--nm-text)] font-semibold p-4 rounded bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-x-auto leading-relaxed">
                DivergenceScore = min(100, (MindshareSpike_24h / max(1, PriceChange_24h + 10)) × SmartWeight × 1.25)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <div>
                  <span className="font-bold text-[var(--nm-text)] block mb-1">MindshareSpike_24h:</span>
                  <span>Percentage increase in cross-platform mentions and verified engagement over 24 hours.</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--nm-text)] block mb-1">PriceChange_24h:</span>
                  <span>Spot DEX price movement. If price is flat (+0% to +5%) while mentions spike (+80%), score surges.</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--nm-text)] block mb-1">SmartWeight:</span>
                  <span>Multiplier based on citations from top-tier research analysts and smart-money wallets.</span>
                </div>
              </div>
            </div>

            {/* Signal Interpretation Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-tech border border-[var(--nm-line)] rounded-xl overflow-hidden">
                <thead className="bg-[var(--nm-code-bg)] border-b border-[var(--nm-line)] text-[var(--nm-text-subtle)] text-[10px] uppercase">
                  <tr>
                    <th className="py-3 px-4">SCORE RANGE</th>
                    <th className="py-3 px-4">SIGNAL CLASSIFICATION</th>
                    <th className="py-3 px-4">INTERPRETATION</th>
                    <th className="py-3 px-4">EXPECTED TIMEFRAME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--nm-line)] bg-[var(--nm-surface)]">
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--nm-accent-emerald)]">90 – 100</td>
                    <td className="py-3 px-4 font-semibold text-[var(--nm-text)]">EARLY_ACCUMULATION</td>
                    <td className="py-3 px-4 text-[var(--nm-text-muted)] font-sans">
                      Massive attention disconnect. Smart capital accumulation before DEX price reaction.
                    </td>
                    <td className="py-3 px-4 text-[var(--nm-text-subtle)]">12h – 48h</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--nm-accent-cyan)]">75 – 89</td>
                    <td className="py-3 px-4 font-semibold text-[var(--nm-text)]">NARRATIVE_BREAKOUT</td>
                    <td className="py-3 px-4 text-[var(--nm-text-muted)] font-sans">
                      Sector-wide thematic expansion. Multiple key projects sharing synchronized velocity.
                    </td>
                    <td className="py-3 px-4 text-[var(--nm-text-subtle)]">24h – 72h</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--nm-accent-amber)]">60 – 74</td>
                    <td className="py-3 px-4 font-semibold text-[var(--nm-text)]">KOL_CONSENSUS</td>
                    <td className="py-3 px-4 text-[var(--nm-text-muted)] font-sans">
                      Multiple verified research analysts publishing independent theses concurrently.
                    </td>
                    <td className="py-3 px-4 text-[var(--nm-text-subtle)]">2d – 5d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)] mb-3">
              Explore the live intelligence streams.
            </h2>
            <p className="text-sm text-[var(--nm-text-muted)] font-sans mb-8">
              Test queries in plain English or connect the open Model Context Protocol (MCP) server to your IDE.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/terminal"
                className="px-5 py-2.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center gap-2 shadow-sm"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Copilot Terminal</span>
              </Link>
              <Link
                href="/docs"
                className="px-5 py-2.5 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-[var(--nm-accent-cyan)]" />
                <span>Read MCP Documentation</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
