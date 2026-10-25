"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Terminal,
  Cpu,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Code2,
  ShieldCheck,
  Search,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import VeniceLogo from "@/components/VeniceLogo";
import Footer from "@/components/Footer";

export default function DocsPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const cursorJson = JSON.stringify(
    {
      mcpServers: {
        lince: {
          url: "https://lince-alpha.vercel.app/api/mcp",
          transport: "http",
        },
      },
    },
    null,
    2
  );

  const claudeJson = JSON.stringify(
    {
      mcpServers: {
        lince: {
          command: "npx",
          args: ["-y", "mcp-proxy-http", "https://lince-alpha.vercel.app/api/mcp"],
        },
      },
    },
    null,
    2
  );

  const curlExample = `curl -X POST https://lince-alpha.vercel.app/api/copilot \\
  -H "Content-Type: application/json" \\
  -d '{"query": "Which Base ecosystem tokens have rising mindshare but low market cap?"}'`;

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
                / DOCUMENTATION
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <Link href="/" className="hover:text-[var(--nm-text)] transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="hover:text-[var(--nm-text)] transition-colors">
            How it works
          </Link>
          <Link href="/docs" className="text-[var(--nm-text)] font-semibold transition-colors">
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

      {/* Main Documentation Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sticky Desktop Docs Navigation Sidebar */}
        <aside className="lg:w-64 shrink-0 hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-text-subtle)] block mb-2 font-semibold">
                OVERVIEW
              </span>
              <ul className="space-y-1.5 text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <li>
                  <a href="#quickstart" className="hover:text-[var(--nm-text)] transition-colors block py-0.5">
                    1. Quickstart &amp; Vision
                  </a>
                </li>
                <li>
                  <a href="#taxonomy" className="hover:text-[var(--nm-text)] transition-colors block py-0.5">
                    2. Metrics &amp; Taxonomy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-text-subtle)] block mb-2 font-semibold">
                INTEGRATIONS
              </span>
              <ul className="space-y-1.5 text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <li>
                  <a href="#mcp-server" className="hover:text-[var(--nm-text)] transition-colors block py-0.5 font-medium text-[var(--nm-accent-cyan)]">
                    3. Model Context Protocol (MCP)
                  </a>
                </li>
                <li>
                  <a href="#cursor-config" className="hover:text-[var(--nm-text)] transition-colors block py-0.5 pl-3">
                    • Cursor Setup
                  </a>
                </li>
                <li>
                  <a href="#claude-config" className="hover:text-[var(--nm-text)] transition-colors block py-0.5 pl-3">
                    • Claude Desktop Setup
                  </a>
                </li>
                <li>
                  <a href="#rest-api" className="hover:text-[var(--nm-text)] transition-colors block py-0.5">
                    4. REST API Endpoints
                  </a>
                </li>
                <li>
                  <a href="#venice-privacy" className="hover:text-[var(--nm-text)] transition-colors block py-0.5">
                    5. Venice AI Zero-Logging
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] text-xs font-mono-tech">
              <span className="text-[10px] text-[var(--nm-text-subtle)] block mb-1">MCP HTTP ENDPOINT:</span>
              <span className="text-[11px] text-[var(--nm-text)] font-semibold break-all">
                https://lince-alpha.vercel.app/api/mcp
              </span>
            </div>
          </div>
        </aside>

        {/* Docs Content Canvas */}
        <div className="flex-1 max-w-4xl space-y-16">
          {/* Section 1: Quickstart */}
          <section id="quickstart" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-cyan)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 01 / GETTING STARTED ]
              </span>
            </div>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--nm-text)] font-normal tracking-tight">
              Lince Developer Documentation
            </h1>
            <p className="text-sm sm:text-base text-[var(--nm-text-muted)] font-sans leading-relaxed">
              Lince (Vista de Lince) indexes cross-platform crypto conversation velocity and cross-references it with on-chain DEX liquidity. Developers and autonomous AI agents can query real-time market mindshare via JSON-RPC 2.0 (Model Context Protocol) or standard REST API endpoints.
            </p>

            <div className="p-4 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] text-xs font-mono-tech space-y-2">
              <span className="text-[var(--nm-text)] font-bold uppercase tracking-wider block">
                CORE PROTOCOL ATTRIBUTES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[var(--nm-text-muted)]">
                <div>
                  <span className="font-semibold text-[var(--nm-text)] block">Cadence:</span>
                  10-minute automated ingestion
                </div>
                <div>
                  <span className="font-semibold text-[var(--nm-text)] block">Coverage:</span>
                  6 channels (X, TG, YT, FC, RD, TT)
                </div>
                <div>
                  <span className="font-semibold text-[var(--nm-text)] block">Privacy:</span>
                  Zero prompt retention (Venice AI)
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Metrics & Taxonomy */}
          <section id="taxonomy" className="space-y-6 pt-6 border-t border-[var(--nm-line)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 02 / METRICS &amp; TAXONOMY ]
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)]">
              Core Intelligence Metrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
                <span className="text-xs font-mono-tech font-bold text-[var(--nm-accent-cyan)]">mindshare (%)</span>
                <p className="text-xs text-[var(--nm-text-muted)] font-sans leading-relaxed">
                  The normalized proportion of total active crypto discussion captured by a specific token or narrative sector over a 24-hour rolling window.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
                <span className="text-xs font-mono-tech font-bold text-[var(--nm-accent-emerald)]">divergenceScore (0–100)</span>
                <p className="text-xs text-[var(--nm-text-muted)] font-sans leading-relaxed">
                  A synthetic score measuring the disconnect between rapid attention acceleration and lagging spot DEX price action. Higher scores flag early accumulation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
                <span className="text-xs font-mono-tech font-bold text-[var(--nm-text)]">hitRate (%)</span>
                <p className="text-xs text-[var(--nm-text-muted)] font-sans leading-relaxed">
                  Verified historical accuracy rate of Key Opinion Leaders (KOLs) based on calls that appreciated &gt;50% within 14 days of publication.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
                <span className="text-xs font-mono-tech font-bold text-[var(--nm-accent-amber)]">sentimentScore (0.00 – 1.00)</span>
                <p className="text-xs text-[var(--nm-text-muted)] font-sans leading-relaxed">
                  Polarity index computed across all analyzed social posts. &gt;0.80 denotes strongly bullish accumulation sentiment; &lt;0.40 denotes distribution.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Model Context Protocol (MCP) */}
          <section id="mcp-server" className="space-y-6 pt-6 border-t border-[var(--nm-line)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-cyan)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 03 / MODEL CONTEXT PROTOCOL ]
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)]">
              Model Context Protocol (MCP) Setup
            </h2>
            <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
              Lince implements Anthropic&apos;s open Model Context Protocol (MCP) over HTTP (JSON-RPC 2.0). Connect Lince to Cursor, Claude Desktop, or Windsurf to equip your development workflows with live crypto market awareness.
            </p>

            {/* MCP Available Tools Table */}
            <div className="space-y-3">
              <span className="text-xs font-mono-tech text-[var(--nm-text)] uppercase font-semibold">
                EXPOSED INTELLIGENCE TOOLS:
              </span>
              <div className="border border-[var(--nm-line)] rounded-xl overflow-hidden text-xs font-mono-tech">
                <div className="p-3.5 bg-[var(--nm-surface)] border-b border-[var(--nm-line)] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[var(--nm-accent-cyan)] block">lince_get_narratives</span>
                    <span className="text-[11px] text-[var(--nm-text-muted)] font-sans">
                      Returns sector mindshare rankings, 24h attention velocity, and leading projects.
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)]">
                    tool
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--nm-surface)] border-b border-[var(--nm-line)] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[var(--nm-accent-emerald)] block">lince_get_alpha_divergence</span>
                    <span className="text-[11px] text-[var(--nm-text-muted)] font-sans">
                      Returns tokens with high social velocity but compressed DEX price action.
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)]">
                    tool
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--nm-surface)] border-b border-[var(--nm-line)] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[var(--nm-text)] block">lince_get_kols</span>
                    <span className="text-[11px] text-[var(--nm-text-muted)] font-sans">
                      Returns verified crypto KOL calls, research theses, and historical accuracy hit rates.
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)]">
                    tool
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--nm-surface)] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[var(--nm-accent-amber)] block">lince_get_social_platforms</span>
                    <span className="text-[11px] text-[var(--nm-text-muted)] font-sans">
                      Returns breakdown of discussion activity across X, Telegram, Farcaster, and YouTube.
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)]">
                    tool
                  </span>
                </div>
              </div>
            </div>

            {/* Cursor Setup */}
            <div id="cursor-config" className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <span>FOR CURSOR (~/.cursor/mcp.json):</span>
                <button
                  onClick={() => copyCode(cursorJson, "cursor")}
                  className="flex items-center gap-1.5 text-[11px] text-[var(--nm-text)] hover:underline cursor-pointer"
                >
                  {copiedSnippet === "cursor" ? <Check className="w-3.5 h-3.5 text-[var(--nm-accent-emerald)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === "cursor" ? "Copied" : "Copy JSON"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] overflow-x-auto">
                {cursorJson}
              </pre>
            </div>

            {/* Claude Desktop Setup */}
            <div id="claude-config" className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <span>FOR CLAUDE DESKTOP (claude_desktop_config.json):</span>
                <button
                  onClick={() => copyCode(claudeJson, "claude")}
                  className="flex items-center gap-1.5 text-[11px] text-[var(--nm-text)] hover:underline cursor-pointer"
                >
                  {copiedSnippet === "claude" ? <Check className="w-3.5 h-3.5 text-[var(--nm-accent-emerald)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === "claude" ? "Copied" : "Copy JSON"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] overflow-x-auto">
                {claudeJson}
              </pre>
            </div>
          </section>

          {/* Section 4: REST API */}
          <section id="rest-api" className="space-y-6 pt-6 border-t border-[var(--nm-line)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 04 / REST API REFERENCE ]
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)]">
              REST Endpoints
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-muted)]">
                <span>QUERY COPILOT VIA CURL (POST /api/copilot):</span>
                <button
                  onClick={() => copyCode(curlExample, "curl")}
                  className="flex items-center gap-1.5 text-[11px] text-[var(--nm-text)] hover:underline cursor-pointer"
                >
                  {copiedSnippet === "curl" ? <Check className="w-3.5 h-3.5 text-[var(--nm-accent-emerald)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === "curl" ? "Copied" : "Copy cURL"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] overflow-x-auto">
                {curlExample}
              </pre>
            </div>
          </section>

          {/* Section 5: Venice AI Privacy */}
          <section id="venice-privacy" className="space-y-4 pt-6 border-t border-[var(--nm-line)]">
            <div className="flex items-center gap-2">
              <VeniceLogo className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 05 / PRIVACY &amp; ZERO-RETENTION ]
              </span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)]">
              Verifiable Zero-Logging Inference
            </h2>
            <p className="text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
              Unlike centralized model providers that archive user prompts to train internal corporate models, Lince integrates directly with Venice AI. Queries are dispatched to decentralized compute nodes running open weights (Llama 3.3 70B &amp; DeepSeek R1) with zero data persistence.
            </p>
            <p className="text-xs font-mono-tech text-[var(--nm-text-subtle)]">
              *If no Venice API key is configured, Lince automatically falls back to its internal deterministic heuristics engine at Rp 0 cost.
            </p>
          </section>
        </div>
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
