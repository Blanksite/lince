"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CopilotMessage } from "@/lib/types";
import { NARRATIVES_DATA, ALPHA_DIVERGENCE_DATA, KOLS_DATA } from "@/lib/data";
import McpModal from "@/components/McpModal";
import VeniceKeyModal from "@/components/VeniceKeyModal";
import VeniceLogo from "@/components/VeniceLogo";
import LiveClock from "@/components/LiveClock";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Terminal,
  Send,
  Shield,
  RotateCcw,
  Cpu,
  Sparkles,
  ArrowLeft,
  Search,
  Plus,
  Check,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Zap,
  Radio,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

interface SessionThread {
  id: string;
  title: string;
  timestamp: string;
  initialQuery?: string;
}

export default function TerminalPage() {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "intro-terminal-1",
      role: "assistant",
      content: `Lince Institutional Copilot (Vista de Lince) initialized.

Connected to 6 social data feeds (X, Telegram, YouTube, Farcaster, Reddit, TikTok) and cross-indexing with on-chain DEX liquidity.

• Active Analysis Mode: Mindshare Divergence & Narrative Velocity
• Verification: Zero prompt retention (Venice AI verified) or instant deterministic heuristics
• MCP Status: Online at /api/mcp

Select an intelligence thread from the sidebar, run a preset query below, or input any thesis in plain English.`,
      timestamp: "12:00:04 UTC",
      modelUsed: "Lince Intelligence Engine v1.4",
      citations: ["Multi-Platform Ingestion", "KOL Consensus Model", "DEX Liquidity Index"],
      sentimentGauge: 0.84,
      tokensMentioned: ["SPECTRE", "VIRTUAL", "CHRONO", "TALOS"],
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState<boolean>(false);
  const [isVeniceModalOpen, setIsVeniceModalOpen] = useState<boolean>(false);
  const [veniceApiKey, setVeniceApiKey] = useState<string>("");
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(true);
  const [analysisMode, setAnalysisMode] = useState<"standard" | "deep">("deep");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SESSIONS: SessionThread[] = [
    {
      id: "session-1",
      title: "Autonomous AI Agents vs Mcap",
      timestamp: "Today",
      initialQuery: "Which AI agent projects have rising mindshare but low market cap?",
    },
    {
      id: "session-2",
      title: "Base Ecosystem Alpha Divergence",
      timestamp: "Today",
      initialQuery: "Scan Base ecosystem tokens with high divergence score",
    },
    {
      id: "session-3",
      title: "Tier-1 KOL Consensus Radar",
      timestamp: "Yesterday",
      initialQuery: "Summarize recent calls from top-tier research KOLs.",
    },
    {
      id: "session-4",
      title: "DePIN Rotation vs Memecoins",
      timestamp: "Yesterday",
      initialQuery: "Is capital rotating from Memecoins to DePIN?",
    },
  ];

  const PRESETS = [
    "Scan for tokens with Divergence Score > 80",
    "Compare Autonomous AI Agents vs Memecoin mindshare",
    "Summarize recent calls from top-tier research KOLs",
    "Which Base ecosystem tokens have highest social spike?",
    "Analyze cross-platform sentiment for $SPECTRE and $VIRTUAL",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMessage: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: q,
      timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " UTC",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          customApiKey: veniceApiKey || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.content,
          timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " UTC",
          modelUsed: data.modelUsed,
          citations: data.citations,
          sentimentGauge: data.sentimentGauge,
          tokensMentioned: data.tokensMentioned,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "Signal extraction interrupted. Re-establishing telemetry pipeline...",
            timestamp: "Just now",
          },
        ]);
      }
    } catch (err) {
      console.error("Copilot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Network error connecting to Lince intelligence stream.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (session: SessionThread) => {
    setActiveSessionId(session.id);
    if (session.initialQuery) {
      handleSend(session.initialQuery);
    }
  };

  const handleNewSession = () => {
    setMessages([
      {
        id: `intro-${Date.now()}`,
        role: "assistant",
        content: "New analytical workspace initialized. Ready for thesis exploration or divergence scan.",
        timestamp: "Just now",
        modelUsed: "Lince Intelligence Engine v1.4",
        citations: ["Multi-Platform Ingestion"],
      },
    ]);
  };

  const copyTokenText = (ticker: string) => {
    navigator.clipboard.writeText(`$${ticker}`);
    setCopiedToken(ticker);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--nm-bg)] text-[var(--nm-text)] flex flex-col font-sans selection:bg-[var(--nm-btn-bg)] selection:text-[var(--nm-btn-text)]">
      {/* ========================================================================= */}
      {/* 1. TOP APP BAR                                                            */}
      {/* ========================================================================= */}
      <header className="h-14 border-b border-[var(--nm-line)] bg-[var(--nm-surface)] px-4 flex items-center justify-between shrink-0 select-none z-30">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-muted)] hover:text-[var(--nm-text)] transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2.5 pl-1 border-l border-[var(--nm-line)]">
            <div className="w-6 h-6 rounded-md bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-hidden shrink-0">
              <Image
                src="/logo.jpg"
                alt="Lince Logo"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-tech font-bold text-xs tracking-[0.2em] text-[var(--nm-text)]">
                LINCE
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[var(--nm-dim)] hidden sm:inline">
                / TERMINAL v1.4
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 px-2 py-0.5 rounded bg-[var(--nm-bg)] border border-[var(--nm-line)] text-[10px] font-mono-tech text-[var(--nm-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-green)] animate-pulse" />
            <span>FEEDS: 6/6 ACTIVE</span>
            <span className="text-[var(--nm-dim)]">|</span>
            <span>TERUPDATE: <strong className="text-[var(--nm-text)]">12:48 UTC</strong></span>
            <span className="text-[var(--nm-dim)]">|</span>
            <span>LATENCY: 38ms</span>
          </div>
        </div>

        {/* Center: Live Clock & Mode */}
        <div className="hidden lg:flex items-center gap-3">
          <LiveClock />
          <span className="px-2 py-0.5 rounded bg-[var(--nm-bg)] border border-[var(--nm-line)] text-[10px] font-mono-tech text-[var(--nm-dim)]">
            PROMPT: PLAIN ENGLISH / ON-CHAIN TELEMETRY
          </span>
        </div>

        {/* Right: Actions & Modals */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mode switch */}
          <div className="hidden sm:flex items-center bg-[var(--nm-bg)] border border-[var(--nm-line)] rounded-md p-0.5 text-[11px] font-mono-tech">
            <button
              onClick={() => setAnalysisMode("deep")}
              className={`px-2 py-1 rounded transition-colors ${
                analysisMode === "deep" ? "bg-[var(--nm-btn-bg)] text-[var(--nm-btn-text)] font-semibold" : "text-[var(--nm-dim)] hover:text-[var(--nm-muted)]"
              }`}
            >
              Deep Synthesis
            </button>
            <button
              onClick={() => setAnalysisMode("standard")}
              className={`px-2 py-1 rounded transition-colors ${
                analysisMode === "standard" ? "bg-[var(--nm-btn-bg)] text-[var(--nm-btn-text)] font-semibold" : "text-[var(--nm-dim)] hover:text-[var(--nm-muted)]"
              }`}
            >
              Fast Scan
            </button>
          </div>

          {/* Venice AI Key toggle */}
          <button
            onClick={() => setIsVeniceModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono-tech transition-colors cursor-pointer ${
              veniceApiKey
                ? "bg-purple-500/10 border-purple-500/40 text-purple-600 dark:text-purple-300"
                : "bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border-[var(--nm-line)] text-[var(--nm-muted)] hover:text-[var(--nm-text)]"
            }`}
          >
            <VeniceLogo className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">
              {veniceApiKey ? "Venice: Active" : "Venice AI"}
            </span>
          </button>

          {/* MCP Protocol Modal */}
          <button
            onClick={() => setIsMcpModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-muted)] hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
            <span className="hidden md:inline">MCP Server</span>
          </button>

          {/* Sidebar toggles */}
          <button
            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            className="p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-dim)] hover:text-[var(--nm-text)] transition-colors hidden lg:inline-flex cursor-pointer"
            title="Toggle Left Sidebar"
          >
            {isLeftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className="p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-dim)] hover:text-[var(--nm-text)] transition-colors hidden xl:inline-flex cursor-pointer"
            title="Toggle Telemetry Sidebar"
          >
            {isRightSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BODY SPLIT WORKSPACE                                                   */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Intelligence Threads & Watchlist                           */}
        {/* ======================================================================= */}
        {isLeftSidebarOpen && (
          <aside className="w-72 border-r border-[var(--nm-line)] bg-[var(--nm-surface)] flex flex-col shrink-0 overflow-y-auto">
            {/* New Session Button */}
            <div className="p-3 border-b border-[var(--nm-line)]">
              <button
                onClick={handleNewSession}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[var(--nm-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[var(--nm-accent-green)]" />
                <span>New Intelligence Session</span>
              </button>
            </div>

            {/* Session Threads list */}
            <div className="p-3 border-b border-[var(--nm-line)]">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-dim)] block mb-2 px-1">
                ANALYSIS SESSIONS
              </span>
              <div className="space-y-1">
                {SESSIONS.map((s) => {
                  const isActive = activeSessionId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSession(s)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono-tech transition-colors cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? "bg-[var(--nm-surface-hover)] text-[var(--nm-text)] border border-[var(--nm-line-strong)] font-semibold"
                          : "text-[var(--nm-muted)] hover:bg-[var(--nm-surface-hover)] hover:text-[var(--nm-text)]"
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ChevronRight className="w-3 h-3 text-[var(--nm-dim)] group-hover:text-[var(--nm-text)] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time Alpha Watchlist */}
            <div className="p-3 flex-1 overflow-y-auto">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-dim)] block mb-2 px-1">
                RADAR WATCHLIST (HIGH DIVERGENCE)
              </span>
              <div className="space-y-1.5">
                {ALPHA_DIVERGENCE_DATA.slice(0, 5).map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSend(`Inspect divergence profile, on-chain volume, and social spikes for $${d.ticker}`)}
                    className="p-2.5 rounded-md bg-[var(--nm-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors">
                          ${d.ticker}
                        </span>
                        <span className="text-[10px] text-[var(--nm-dim)]">({d.chain})</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--nm-accent-green)]/10 text-[var(--nm-accent-green)] font-semibold">
                        DIV {d.divergenceScore}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[var(--nm-dim)]">
                      <span className="text-[var(--nm-accent-cyan)]">Mindshare: +{d.mindshareSpike24h}%</span>
                      <span className={d.priceChange24h >= 0 ? "text-[var(--nm-accent-green)]" : "text-rose-500"}>
                        Price: {d.priceChange24h >= 0 ? "+" : ""}{d.priceChange24h}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left sidebar footer */}
            <div className="p-3 border-t border-[var(--nm-line)] text-[10px] font-mono-tech text-[var(--nm-dim)] flex items-center justify-between">
              <span>ENGINE: DETERMINISTIC + VENICE</span>
              <span className="text-[var(--nm-accent-green)]">ONLINE</span>
            </div>
          </aside>
        )}

        {/* ======================================================================= */}
        {/* CENTER COLUMN: Master Chat Stream & Command Bar                         */}
        {/* ======================================================================= */}
        <main className="flex-1 flex flex-col bg-[var(--nm-bg)] overflow-hidden">
          {/* Messages Scroll Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-3xl rounded-xl p-5 sm:p-6 transition-all ${
                        isUser
                          ? "bg-[var(--nm-surface-hover)] border border-[var(--nm-line-strong)] text-[var(--nm-text)]"
                          : "bg-[var(--nm-surface)] border border-[var(--nm-line)] text-[var(--nm-text)] shadow-sm"
                      }`}
                    >
                      {/* Assistant Header info */}
                      {!isUser && (
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[var(--nm-line)] text-xs font-mono-tech">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
                            <span className="text-[var(--nm-text)] font-semibold">
                              {m.modelUsed || "Lince Intelligence Engine"}
                            </span>
                            <span className="text-[var(--nm-dim)] text-[10px]">· {m.timestamp}</span>
                          </div>

                          {m.sentimentGauge !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[var(--nm-dim)]">SENTIMENT:</span>
                              <div className="w-16 h-1.5 rounded-full bg-[var(--nm-line)] overflow-hidden">
                                <div
                                  className="h-full bg-[var(--nm-accent-green)]"
                                  style={{ width: `${m.sentimentGauge * 100}%` }}
                                />
                              </div>
                              <span className="text-[var(--nm-accent-green)] font-semibold text-[11px]">
                                {(m.sentimentGauge * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* User timestamp header */}
                      {isUser && (
                        <div className="text-[10px] font-mono-tech text-[var(--nm-dim)] pb-2 mb-2 border-b border-[var(--nm-line)] flex items-center justify-between">
                          <span>OPERATOR PROMPT</span>
                          <span>{m.timestamp}</span>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[var(--nm-text)] leading-relaxed">
                        {m.content}
                      </div>

                      {/* Mentioned Tokens Badges */}
                      {m.tokensMentioned && m.tokensMentioned.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[var(--nm-line)] flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-[var(--nm-dim)] font-mono-tech text-[10px] uppercase">
                            DETECTED TOKENS:
                          </span>
                          {m.tokensMentioned.map((tok) => (
                            <button
                              key={tok}
                              onClick={() => copyTokenText(tok)}
                              className="px-2.5 py-0.5 rounded bg-[var(--nm-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-accent-cyan)] font-semibold font-mono-tech text-xs transition-colors flex items-center gap-1 cursor-pointer"
                              title="Click to copy ticker"
                            >
                              <span>${tok}</span>
                              {copiedToken === tok ? (
                                <Check className="w-3 h-3 text-[var(--nm-accent-green)]" />
                              ) : (
                                <Copy className="w-2.5 h-2.5 text-[var(--nm-dim)]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Citations & Sources */}
                      {m.citations && m.citations.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-mono-tech text-[var(--nm-dim)]">
                          <span>GROUNDED SOURCES:</span>
                          {m.citations.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded bg-[var(--nm-bg)] text-[var(--nm-muted)] border border-[var(--nm-line)]"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] text-[var(--nm-accent-cyan)] font-mono-tech text-xs max-w-md animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[var(--nm-accent-cyan)] animate-ping" />
                  <span>Synthesizing cross-platform social chatter and on-chain liquidity...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="px-4 py-2 bg-[var(--nm-surface)] border-t border-[var(--nm-line)] overflow-x-auto flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono-tech text-[var(--nm-dim)] shrink-0 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--nm-accent-amber)]" /> PRESETS:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-md bg-[var(--nm-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] text-xs font-mono-tech text-[var(--nm-muted)] hover:text-[var(--nm-text)] shrink-0 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Command Bar Input Form */}
          <div className="p-4 bg-[var(--nm-surface)] border-t border-[var(--nm-line)] shrink-0">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2.5"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Enter query or command (e.g. 'Which Solana DePIN protocols have highest volume spike?')..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--nm-bg)] border border-[var(--nm-line)] text-xs sm:text-sm text-[var(--nm-text)] placeholder-[var(--nm-dim)] focus:outline-none focus:border-[var(--nm-accent-cyan)] font-sans"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono-tech text-[var(--nm-dim)] hidden sm:inline">
                    ENTER TO TRANSMIT
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  className="px-5 py-3 rounded-lg bg-[var(--nm-btn-bg)] hover:bg-[var(--nm-btn-hover)] disabled:opacity-40 text-[var(--nm-btn-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Execute</span>
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Real-Time Market Telemetry Drawer                         */}
        {/* ======================================================================= */}
        {isRightSidebarOpen && (
          <aside className="w-80 border-l border-[var(--nm-line)] bg-[var(--nm-surface)] flex flex-col shrink-0 overflow-y-auto hidden xl:flex">
            {/* Telemetry Header */}
            <div className="p-4 border-b border-[var(--nm-line)]">
              <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                <span className="text-[var(--nm-text)] font-semibold tracking-wider uppercase">
                  TELEMETRY RADAR
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--nm-accent-green)] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-green)] animate-pulse" />
                  12:48 UTC
                </span>
              </div>
              <p className="text-[11px] text-[var(--nm-muted)] font-sans">
                Cross-indexed multi-platform data feeds. Terupdate setiap 10 menit (batch 12:48 UTC).
              </p>
            </div>

            {/* Top Sectors by 24h Velocity */}
            <div className="p-4 border-b border-[var(--nm-line)]">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-dim)] block mb-3">
                SECTOR MOMENTUM (24H)
              </span>
              <div className="space-y-3">
                {NARRATIVES_DATA.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleSend(`Analyze sector rotation and key drivers behind ${n.name}`)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <span className="text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors truncate max-w-[150px]">
                        {n.name}
                      </span>
                      <span className="text-[var(--nm-accent-green)] font-semibold">+{n.change24h}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--nm-bg)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--nm-accent-cyan)]"
                        style={{ width: `${Math.min(n.mindshare * 3, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[var(--nm-dim)] mt-1">
                      <span>Mindshare: {n.mindshare}%</span>
                      <span>{n.socialVolume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top KOL Hit Rates */}
            <div className="p-4 flex-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-dim)] block mb-3">
                KOL CONSENSUS LEADERS
              </span>
              <div className="space-y-2.5">
                {KOLS_DATA.slice(0, 4).map((k) => (
                  <div
                    key={k.id}
                    onClick={() => handleSend(`What is ${k.name}'s thesis on $${k.recentCall.ticker}?`)}
                    className="p-2.5 rounded-md bg-[var(--nm-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <span className="font-semibold text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors">
                        {k.name}
                      </span>
                      <span className="text-[10px] text-[var(--nm-accent-green)] font-semibold">
                        {k.hitRate} HIT
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-tech text-[var(--nm-dim)]">
                      Call: <span className="text-[var(--nm-accent-cyan)] font-semibold">${k.recentCall.ticker}</span> ({k.recentCall.timestamp})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Endpoint footer */}
            <div className="p-4 border-t border-[var(--nm-line)] bg-[var(--nm-surface-hover)] text-xs font-mono-tech">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[var(--nm-dim)]">MCP SERVER STATUS:</span>
                <span className="text-[var(--nm-accent-green)] font-semibold">ACTIVE</span>
              </div>
              <p className="text-[11px] text-[var(--nm-muted)] font-sans">
                Stream this intelligence straight to Cursor or Claude via JSON-RPC 2.0.
              </p>
            </div>
          </aside>
        )}
      </div>

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
