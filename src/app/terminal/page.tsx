"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CopilotMessage } from "@/lib/types";
import { NARRATIVES_DATA, ALPHA_DIVERGENCE_DATA, KOLS_DATA } from "@/lib/data";
import McpModal from "@/components/McpModal";
import VeniceKeyModal from "@/components/VeniceKeyModal";
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
    <div className="h-screen w-screen overflow-hidden bg-[#0d0d0c] text-[#f6f4ef] flex flex-col font-sans selection:bg-[#f7f6f1] selection:text-[#111110]">
      {/* ========================================================================= */}
      {/* 1. TOP APP BAR                                                            */}
      {/* ========================================================================= */}
      <header className="h-14 border-b border-[#242421] bg-[#121211] px-4 flex items-center justify-between shrink-0 select-none z-30">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[#1a1a18] text-[#b5b3ac] hover:text-[#f6f4ef] transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2.5 pl-1 border-l border-[#242421]">
            <div className="w-6 h-6 rounded-md bg-[#161614] border border-[#2c2c28] overflow-hidden shrink-0">
              <Image
                src="/logo.jpg"
                alt="Lince Logo"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-tech font-bold text-xs tracking-[0.2em] text-[#f6f4ef]">
                LINCE
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[#73716a] hidden sm:inline">
                / TERMINAL v1.4
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 px-2 py-0.5 rounded bg-[#161614] border border-[#242421] text-[10px] font-mono-tech text-[#b5b3ac]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>FEEDS: 6/6 ACTIVE</span>
            <span className="text-[#403f3a]">|</span>
            <span>LATENCY: 38ms</span>
          </div>
        </div>

        {/* Center: Search / Switcher hint */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono-tech text-[#73716a]">
          <span className="px-2 py-0.5 rounded bg-[#181816] border border-[#242421] text-[10px]">
            PROMPT: PLAIN ENGLISH / ON-CHAIN TELEMETRY
          </span>
        </div>

        {/* Right: Actions & Modals */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="hidden sm:flex items-center bg-[#161614] border border-[#242421] rounded-md p-0.5 text-[11px] font-mono-tech">
            <button
              onClick={() => setAnalysisMode("deep")}
              className={`px-2 py-1 rounded transition-colors ${
                analysisMode === "deep" ? "bg-[#f7f6f1] text-[#111110] font-semibold" : "text-[#73716a] hover:text-[#b5b3ac]"
              }`}
            >
              Deep Synthesis
            </button>
            <button
              onClick={() => setAnalysisMode("standard")}
              className={`px-2 py-1 rounded transition-colors ${
                analysisMode === "standard" ? "bg-[#f7f6f1] text-[#111110] font-semibold" : "text-[#73716a] hover:text-[#b5b3ac]"
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
                ? "bg-[#1f172e] border-purple-500/40 text-purple-200"
                : "bg-[#161614] hover:bg-[#1e1e1b] border-[#242421] text-[#b5b3ac] hover:text-[#f6f4ef]"
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">
              {veniceApiKey ? "Venice: Active" : "Venice AI"}
            </span>
          </button>

          {/* MCP Protocol Modal */}
          <button
            onClick={() => setIsMcpModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#161614] hover:bg-[#1e1e1b] border border-[#242421] text-xs font-mono-tech text-[#b5b3ac] hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span className="hidden md:inline">MCP Server</span>
          </button>

          {/* Sidebar toggles */}
          <button
            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            className="p-1.5 rounded-md hover:bg-[#1a1a18] text-[#73716a] hover:text-[#f6f4ef] transition-colors hidden lg:inline-flex cursor-pointer"
            title="Toggle Left Sidebar"
          >
            {isLeftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className="p-1.5 rounded-md hover:bg-[#1a1a18] text-[#73716a] hover:text-[#f6f4ef] transition-colors hidden xl:inline-flex cursor-pointer"
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
          <aside className="w-72 border-r border-[#242421] bg-[#121211] flex flex-col shrink-0 overflow-y-auto">
            {/* New Session Button */}
            <div className="p-3 border-b border-[#242421]">
              <button
                onClick={handleNewSession}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#181816] hover:bg-[#20201d] border border-[#242421] text-xs font-mono-tech text-[#f6f4ef] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#10b981]" />
                <span>New Intelligence Session</span>
              </button>
            </div>

            {/* Session Threads list */}
            <div className="p-3 border-b border-[#242421]">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[#73716a] block mb-2 px-1">
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
                          ? "bg-[#1c1c1a] text-[#f6f4ef] border border-[#2c2c28]"
                          : "text-[#b5b3ac] hover:bg-[#161614] hover:text-[#f6f4ef]"
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ChevronRight className="w-3 h-3 text-[#73716a] group-hover:text-[#f6f4ef] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time Alpha Watchlist */}
            <div className="p-3 flex-1 overflow-y-auto">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[#73716a] block mb-2 px-1">
                RADAR WATCHLIST (HIGH DIVERGENCE)
              </span>
              <div className="space-y-1.5">
                {ALPHA_DIVERGENCE_DATA.slice(0, 5).map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSend(`Inspect divergence profile, on-chain volume, and social spikes for $${d.ticker}`)}
                    className="p-2.5 rounded-md bg-[#161614] hover:bg-[#1a1a18] border border-[#242421] hover:border-[#403f3a] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#f6f4ef] group-hover:text-white">
                          ${d.ticker}
                        </span>
                        <span className="text-[10px] text-[#73716a]">({d.chain})</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#10b981]/10 text-[#10b981] font-semibold">
                        DIV {d.divergenceScore}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#73716a]">
                      <span className="text-[#06b6d4]">Mindshare: +{d.mindshareSpike24h}%</span>
                      <span className={d.priceChange24h >= 0 ? "text-[#10b981]" : "text-rose-400"}>
                        Price: {d.priceChange24h >= 0 ? "+" : ""}{d.priceChange24h}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left sidebar footer */}
            <div className="p-3 border-t border-[#242421] text-[10px] font-mono-tech text-[#73716a] flex items-center justify-between">
              <span>ENGINE: DETERMINISTIC + VENICE</span>
              <span className="text-[#10b981]">ONLINE</span>
            </div>
          </aside>
        )}

        {/* ======================================================================= */}
        {/* CENTER COLUMN: Master Chat Stream & Command Bar                         */}
        {/* ======================================================================= */}
        <main className="flex-1 flex flex-col bg-[#0d0d0c] overflow-hidden">
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
                          ? "bg-[#1c1b18] border border-[#383733] text-[#f6f4ef]"
                          : "bg-[#121211] border border-[#242421] text-[#b5b3ac]"
                      }`}
                    >
                      {/* Assistant Header info */}
                      {!isUser && (
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[#242421] text-xs font-mono-tech">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" />
                            <span className="text-[#f6f4ef] font-semibold">
                              {m.modelUsed || "Lince Intelligence Engine"}
                            </span>
                            <span className="text-[#73716a] text-[10px]">· {m.timestamp}</span>
                          </div>

                          {m.sentimentGauge !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[#73716a]">SENTIMENT:</span>
                              <div className="w-16 h-1.5 rounded-full bg-[#1e1e1b] overflow-hidden">
                                <div
                                  className="h-full bg-[#10b981]"
                                  style={{ width: `${m.sentimentGauge * 100}%` }}
                                />
                              </div>
                              <span className="text-[#10b981] font-semibold text-[11px]">
                                {(m.sentimentGauge * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* User timestamp header */}
                      {isUser && (
                        <div className="text-[10px] font-mono-tech text-[#73716a] pb-2 mb-2 border-b border-[#2c2b27] flex items-center justify-between">
                          <span>OPERATOR PROMPT</span>
                          <span>{m.timestamp}</span>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#f6f4ef] leading-relaxed">
                        {m.content}
                      </div>

                      {/* Mentioned Tokens Badges */}
                      {m.tokensMentioned && m.tokensMentioned.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#242421] flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-[#73716a] font-mono-tech text-[10px] uppercase">
                            DETECTED TOKENS:
                          </span>
                          {m.tokensMentioned.map((tok) => (
                            <button
                              key={tok}
                              onClick={() => copyTokenText(tok)}
                              className="px-2.5 py-0.5 rounded bg-[#181816] hover:bg-[#20201d] border border-[#2c2c28] text-[#06b6d4] font-semibold font-mono-tech text-xs transition-colors flex items-center gap-1 cursor-pointer"
                              title="Click to copy ticker"
                            >
                              <span>${tok}</span>
                              {copiedToken === tok ? (
                                <Check className="w-3 h-3 text-[#10b981]" />
                              ) : (
                                <Copy className="w-2.5 h-2.5 text-[#73716a]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Citations & Sources */}
                      {m.citations && m.citations.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-mono-tech text-[#73716a]">
                          <span>GROUNDED SOURCES:</span>
                          {m.citations.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded bg-[#161614] text-[#b5b3ac] border border-[#242421]"
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
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121211] border border-[#242421] text-[#06b6d4] font-mono-tech text-xs max-w-md animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
                  <span>Synthesizing cross-platform social chatter and on-chain liquidity...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="px-4 py-2 bg-[#121211] border-t border-[#242421] overflow-x-auto flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono-tech text-[#73716a] shrink-0 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#f59e0b]" /> PRESETS:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-md bg-[#161614] hover:bg-[#1e1e1b] border border-[#242421] hover:border-[#403f3a] text-xs font-mono-tech text-[#b5b3ac] hover:text-[#f6f4ef] shrink-0 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Command Bar Input Form */}
          <div className="p-4 bg-[#121211] border-t border-[#242421] shrink-0">
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
                    className="w-full px-4 py-3 rounded-lg bg-[#0d0d0c] border border-[#242421] text-xs sm:text-sm text-[#f6f4ef] placeholder-[#73716a] focus:outline-none focus:border-[#403f3a] font-sans"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono-tech text-[#73716a] hidden sm:inline">
                    ENTER TO TRANSMIT
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  className="px-5 py-3 rounded-lg bg-[#f7f6f1] hover:bg-[#e5e2db] disabled:opacity-40 text-[#111110] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
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
          <aside className="w-80 border-l border-[#242421] bg-[#121211] flex flex-col shrink-0 overflow-y-auto hidden xl:flex">
            {/* Telemetry Header */}
            <div className="p-4 border-b border-[#242421]">
              <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                <span className="text-[#f6f4ef] font-semibold tracking-wider uppercase">
                  TELEMETRY RADAR
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              </div>
              <p className="text-[11px] text-[#73716a] font-sans">
                Cross-indexed multi-platform data feeds. Click any item to trigger Copilot analysis.
              </p>
            </div>

            {/* Top Sectors by 24h Velocity */}
            <div className="p-4 border-b border-[#242421]">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[#73716a] block mb-3">
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
                      <span className="text-[#f6f4ef] group-hover:text-white truncate max-w-[150px]">
                        {n.name}
                      </span>
                      <span className="text-[#10b981] font-semibold">+{n.change24h}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#181816] overflow-hidden">
                      <div
                        className="h-full bg-[#06b6d4]"
                        style={{ width: `${Math.min(n.mindshare * 3, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#73716a] mt-1">
                      <span>Mindshare: {n.mindshare}%</span>
                      <span>{n.socialVolume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top KOL Hit Rates */}
            <div className="p-4 flex-1">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[#73716a] block mb-3">
                KOL CONSENSUS LEADERS
              </span>
              <div className="space-y-2.5">
                {KOLS_DATA.slice(0, 4).map((k) => (
                  <div
                    key={k.id}
                    onClick={() => handleSend(`What is ${k.name}'s thesis on $${k.recentCall.ticker}?`)}
                    className="p-2.5 rounded-md bg-[#161614] hover:bg-[#1a1a18] border border-[#242421] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                      <span className="font-semibold text-[#f6f4ef] group-hover:text-white">
                        {k.name}
                      </span>
                      <span className="text-[10px] text-[#10b981] font-semibold">
                        {k.hitRate} HIT
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#73716a]">
                      Call: <span className="text-[#06b6d4] font-semibold">${k.recentCall.ticker}</span> ({k.recentCall.timestamp})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Endpoint footer */}
            <div className="p-4 border-t border-[#242421] bg-[#161614] text-xs font-mono-tech">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#73716a]">MCP SERVER STATUS:</span>
                <span className="text-[#10b981] font-semibold">ACTIVE</span>
              </div>
              <p className="text-[11px] text-[#b5b3ac] font-sans">
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
