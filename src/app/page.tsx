"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveExplorer from "@/components/LiveExplorer";
import CopilotTerminal from "@/components/CopilotTerminal";
import McpModal from "@/components/McpModal";
import VeniceKeyModal from "@/components/VeniceKeyModal";
import VeniceLogo from "@/components/VeniceLogo";
import LiveClock from "@/components/LiveClock";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  NARRATIVES_DATA,
  ALPHA_DIVERGENCE_DATA,
  KOLS_DATA,
  SOCIAL_PLATFORMS_DATA,
} from "@/lib/data";
import {
  ExternalLink,
  Plus,
  Minus,
  Check,
  Copy,
  Terminal,
  ArrowRight,
} from "lucide-react";

export default function LinceHome() {
  const [activeTab, setActiveTab] = useState<"narratives" | "divergence" | "kols" | "socials">("narratives");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isVeniceModalOpen, setIsVeniceModalOpen] = useState<boolean>(false);
  const [veniceApiKey, setVeniceApiKey] = useState<string>("");
  const [copilotInitialQuery, setCopilotInitialQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedMcp, setCopiedMcp] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "divergence-section") {
      setActiveTab("divergence");
      const el = document.getElementById("narratives-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (sectionId === "kols-section") {
      setActiveTab("kols");
      const el = document.getElementById("narratives-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectTokenForCopilot = (token: string) => {
    setCopilotInitialQuery(`Analyze the current mindshare and divergence profile for $${token}`);
    scrollToSection("copilot-section");
  };

  const copyMcpConfig = () => {
    const config = {
      mcpServers: {
        lince: {
          url: "https://lince-alpha.vercel.app/api/mcp",
          transport: "http",
        },
      },
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const FAQS = [
    {
      num: "01",
      question: "What is Vista de Lince?",
      answer:
        "Vista de Lince (Lince) is an institutional-grade crypto mindshare and narrative intelligence engine. It continuously monitors cross-platform attention across X (Crypto-Twitter), Telegram, YouTube, Farcaster, Reddit, and TikTok, analyzing sentiment polarity and early divergence before price reacts.",
    },
    {
      num: "02",
      question: "How does Lince spot alpha divergence?",
      answer:
        "Alpha divergence occurs when social discussion volume and mindshare percent increase significantly while market cap or price remains flat or compressed. Lince normalizes social velocity against on-chain liquidity to flag accumulation signals before broad market discovery.",
    },
    {
      num: "03",
      question: "Is Venice AI private and zero-logging?",
      answer:
        "Yes. Venice AI provides decentralized, verifiable private inference using open-source models (such as Llama 3.3 70B and DeepSeek R1). No user prompts, IP addresses, or analytical sessions are retained or logged. If no Venice key is provided, Lince falls back to its built-in free deterministic engine at Rp 0 cost.",
    },
    {
      num: "04",
      question: "How does the Model Context Protocol (MCP) server work?",
      answer:
        "Lince exposes an open JSON-RPC 2.0 endpoint at /api/mcp supporting initialize, tools/list, and tools/call. You can plug this directly into Cursor (~/.cursor/mcp.json), Claude Desktop, or Windsurf to let your AI agents invoke real-time narrative rankings and divergence metrics natively in your editor.",
    },
    {
      num: "05",
      question: "What does it cost to use Lince?",
      answer:
        "Lince is free and open to explore. The web terminal, multi-platform explorer, and deterministic intelligence operate at Rp 0 with zero login required. Advanced private inference with custom Venice AI keys is BYOK (Bring Your Own Key).",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--nm-bg)] text-[var(--nm-text)] flex flex-col font-sans selection:bg-[var(--nm-action)] selection:text-[var(--nm-action-text)] transition-colors duration-200">
      {/* Top Banner Notice with Live Synchronized Clock & Last Updated */}
      <div className="bg-[var(--nm-code-bg)] border-b border-[var(--nm-line)] px-4 py-2 text-xs font-mono-tech text-[var(--nm-text-muted)] flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)] animate-pulse shrink-0" />
          <span className="tracking-wider text-[10px] sm:text-xs">
            DATA PIPELINE: 6 FEEDS ACTIVE · 10M REFRESH CADENCE
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="text-[var(--nm-text-subtle)]">TERUPDATE:</span>
          <span className="font-semibold text-[var(--nm-accent-emerald)]">12:48 UTC</span>
          <span className="text-[var(--nm-text-subtle)]">|</span>
          <LiveClock className="font-medium text-[var(--nm-text)]" />
          <span className="hidden lg:inline text-[var(--nm-text-subtle)]">|</span>
          <button
            onClick={() => setIsMcpModalOpen(true)}
            className="underline text-[var(--nm-text)] hover:opacity-80 hidden lg:inline-flex items-center gap-1 font-mono-tech cursor-pointer"
          >
            CONNECT MCP <ExternalLink className="w-3 h-3 text-[var(--nm-text-subtle)]" />
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <Header
        onOpenMcp={() => setIsMcpModalOpen(true)}
        onOpenVenice={() => setIsVeniceModalOpen(true)}
        isVeniceConfigured={Boolean(veniceApiKey)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onScrollToSection={scrollToSection} />

        {/* Live Explorer Catalog */}
        <div id="narratives-section">
          <LiveExplorer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            narratives={NARRATIVES_DATA}
            divergences={ALPHA_DIVERGENCE_DATA}
            kols={KOLS_DATA}
            socials={SOCIAL_PLATFORMS_DATA}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectTokenForCopilot={handleSelectTokenForCopilot}
          />
        </div>

        {/* Lince AI Copilot Terminal Preview */}
        <CopilotTerminal
          customApiKey={veniceApiKey}
          onOpenVeniceModal={() => setIsVeniceModalOpen(true)}
          initialQuery={copilotInitialQuery}
        />

        {/* Section 05: Analytical Architecture */}
        <section id="architecture-section" className="py-20 border-b border-[var(--nm-line)] bg-[var(--nm-bg)] transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-amber)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 05 / ANALYTICAL ARCHITECTURE ]
              </span>
            </div>

            <div className="max-w-3xl mb-12">
              <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.08] mb-3">
                Five lenses. One continuous intelligence stream.
              </h2>
              <p className="text-sm sm:text-base text-[var(--nm-text-muted)] leading-relaxed max-w-[62ch]">
                Raw social chatter converted into quantifiable alpha signals across the top 1,200+ crypto assets and tokenless pre-TGE protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--nm-line)] border border-[var(--nm-line)] rounded-xl overflow-hidden shadow-sm">
              {/* Lens 1 */}
              <div className="p-8 bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)] tracking-widest">[ 01 ]</span>
                    <span className="text-xs font-mono-tech text-[var(--nm-accent-cyan)] font-semibold">INGESTION</span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)] font-normal mb-3">
                    Multi-Platform Social Indexer
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed">
                    Continuous multi-platform ingestion across X (Crypto-Twitter), Telegram, YouTube, Reddit, Farcaster, and TikTok. 
                    Cleans noise, bots, and sybil campaigns to capture authentic attention velocity.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--nm-line)] flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                  <span>LATENCY: &lt;45s</span>
                  <span>6 PLATFORMS</span>
                </div>
              </div>

              {/* Lens 2 */}
              <div className="p-8 bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)] tracking-widest">[ 02 ]</span>
                    <span className="text-xs font-mono-tech text-[var(--nm-accent-emerald)] font-semibold">DIVERGENCE</span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)] font-normal mb-3">
                    Mindshare Divergence Radar
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed">
                    Cross-checks social attention velocity against on-chain liquidity and DEX pricing. When conversation explodes 
                    before price follows, Lince flags an early institutional accumulation signal.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--nm-line)] flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                  <span>DELTA: 12h/24h</span>
                  <span>ON-CHAIN PAIRING</span>
                </div>
              </div>

              {/* Lens 3 */}
              <div className="p-8 bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)] tracking-widest">[ 03 ]</span>
                    <span className="text-xs font-mono-tech text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1.5">
                      <VeniceLogo className="w-3.5 h-3.5 text-purple-500" />
                      <span>VENICE AI</span>
                    </span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)] font-normal mb-3">
                    Zero-Logging AI Inference
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed">
                    Intelligence powered by Venice AI (Llama 3.3 70B &amp; DeepSeek R1). Verifiable private computation without 
                    data logging, prompt retention, or third-party censorship for professional traders.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--nm-line)] flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                  <span>ZERO LOGS</span>
                  <span>BYOK READY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Model Context Protocol (MCP) Showcase */}
        <section id="mcp-section" className="py-20 border-b border-[var(--nm-line)] bg-[var(--nm-bg)] transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-cyan)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 06 / MODEL CONTEXT PROTOCOL ]
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-3xl">
                <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.08] mb-3">
                  Bring Lince into your everyday IDE.
                </h2>
                <p className="text-sm sm:text-base text-[var(--nm-text-muted)] leading-relaxed max-w-[62ch]">
                  Native JSON-RPC 2.0 MCP server integration. Stream live narratives, divergence rankings, and KOL conviction directly into Cursor, Claude Desktop, and Windsurf.
                </p>
              </div>

              <button
                onClick={() => setIsMcpModalOpen(true)}
                className="px-5 py-2.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 shrink-0 cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>View Full MCP Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* MCP Developer Card */}
            <div className="rounded-xl border border-[var(--nm-line)] bg-[var(--nm-surface)] p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Description & Tools */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--nm-text)] font-normal">
                    Available MCP Tools
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed">
                    Your AI assistants can call these functions autonomously to analyze crypto market sentiment before generating code, executing trades, or drafting investment memos.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="p-3 rounded-md bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[var(--nm-accent-cyan)] font-semibold">lince_get_narratives</span>
                        <span className="text-[10px] text-[var(--nm-text-subtle)]">TOOL</span>
                      </div>
                      <p className="text-[11px] text-[var(--nm-text-muted)] mt-1">Sector rankings by mindshare % &amp; 24h velocity.</p>
                    </div>

                    <div className="p-3 rounded-md bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[var(--nm-accent-emerald)] font-semibold">lince_get_alpha_divergence</span>
                        <span className="text-[10px] text-[var(--nm-text-subtle)]">TOOL</span>
                      </div>
                      <p className="text-[11px] text-[var(--nm-text-muted)] mt-1">Tokens where social attention disconnected from price.</p>
                    </div>

                    <div className="p-3 rounded-md bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[var(--nm-text-muted)] font-semibold">lince_get_kols</span>
                        <span className="text-[10px] text-[var(--nm-text-subtle)]">TOOL</span>
                      </div>
                      <p className="text-[11px] text-[var(--nm-text-subtle)] mt-1">Top crypto KOL calls, verified hit-rates, and theses.</p>
                    </div>
                  </div>
                </div>

                {/* Right Code Block */}
                <div className="lg:col-span-7">
                  <div className="rounded-lg border border-[var(--nm-line)] bg-[var(--nm-code-bg)] overflow-hidden">
                    <div className="px-4 py-2.5 bg-[var(--nm-badge-bg)] border-b border-[var(--nm-line)] flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-muted)]">
                      <span>~/.cursor/mcp.json</span>
                      <button
                        onClick={copyMcpConfig}
                        className="flex items-center gap-1.5 text-xs text-[var(--nm-text)] hover:underline cursor-pointer font-semibold"
                      >
                        {copiedMcp ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[var(--nm-accent-emerald)]" />
                            <span className="text-[var(--nm-accent-emerald)]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono-tech text-[var(--nm-text-muted)] leading-relaxed overflow-x-auto">
{`{
  "mcpServers": {
    "lince": {
      "url": "https://lince-alpha.vercel.app/api/mcp",
      "transport": "http"
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: FAQ Accordion */}
        <section id="faq-section" className="py-20 border-b border-[var(--nm-line)] bg-[var(--nm-bg)] transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
                [ 07 / FREQUENTLY ASKED ]
              </span>
            </div>

            <div className="max-w-3xl mb-12">
              <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.08] mb-3">
                Questions about Lince.
              </h2>
              <p className="text-sm sm:text-base text-[var(--nm-text-muted)] leading-relaxed max-w-[62ch]">
                Everything you need to know about our data sources, divergence algorithms, zero-logging inference, and integrations.
              </p>
            </div>

            <div className="border-t border-[var(--nm-line)]">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.num} className="border-b border-[var(--nm-line)]">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full py-6 flex items-start justify-between gap-6 text-left hover:text-[var(--nm-text)] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)] tracking-widest shrink-0">
                          {faq.num} /
                        </span>
                        <span className="text-base sm:text-xl font-medium text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <div className="p-1 rounded-md bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-[var(--nm-text-muted)] group-hover:text-[var(--nm-text)] shrink-0 mt-0.5">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pb-6 pl-10 sm:pl-16 pr-4 sm:pr-12 text-xs sm:text-sm text-[var(--nm-text-muted)] leading-relaxed font-sans max-w-3xl animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 08: Closing CTA Banner */}
        <section className="py-24 border-b border-[var(--nm-line)] bg-[var(--nm-surface)] transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[var(--nm-text-subtle)] block mb-4">
              [ ACCESS TERMINAL ]
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-7xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.04] mb-6">
              Turn market noise into structural alpha.
            </h2>
            <p className="text-sm sm:text-base text-[var(--nm-text-muted)] leading-relaxed mb-8 max-w-[54ch] mx-auto">
              Monitor cross-platform narrative velocity, sentiment polarities, and verifiable KOL consensus before retail discovery. 100% free with zero registration.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/terminal"
                className="px-6 py-3 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Full Terminal App</span>
              </Link>

              <button
                onClick={() => setIsMcpModalOpen(true)}
                className="px-6 py-3 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 cursor-pointer"
              >
                Configure MCP Server
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Institutional Footer */}
      <Footer
        onOpenMcp={() => setIsMcpModalOpen(true)}
        onOpenVenice={() => setIsVeniceModalOpen(true)}
      />

      {/* Modals */}
      <McpModal isOpen={isMcpModalOpen} onClose={() => setIsMcpModalOpen(false)} />
      <VeniceKeyModal
        isOpen={isVeniceModalOpen}
        onClose={() => setIsVeniceModalOpen(false)}
        customApiKey={veniceApiKey}
        onSaveApiKey={(key) => setVeniceApiKey(key)}
      />
    </div>
  );
}
