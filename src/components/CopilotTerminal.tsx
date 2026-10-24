"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CopilotMessage } from "@/lib/types";
import {
  Send,
  Shield,
  RotateCcw,
  Cpu,
  Sparkles,
  Terminal,
  ArrowRight,
} from "lucide-react";

interface CopilotTerminalProps {
  customApiKey: string;
  onOpenVeniceModal: () => void;
  initialQuery?: string;
}

export default function CopilotTerminal({
  customApiKey,
  onOpenVeniceModal,
  initialQuery,
}: CopilotTerminalProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "intro-1",
      role: "assistant",
      content: `Welcome to Lince Copilot (Vista de Lince). I analyze cross-platform mindshare, KOL attention, and early divergence signals across 1,200+ crypto assets.

Ask any question in plain English or select a preset below to explore current alpha.`,
      timestamp: "Just now",
      modelUsed: "Lince Intelligence Engine",
      citations: ["Multi-Platform Indexer", "KOL Consensus Model"],
      sentimentGauge: 0.84,
      tokensMentioned: ["VIRTUAL", "SPECTRE", "CHRONO"],
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle external query triggering
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMessage: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: q,
      timestamp: "Just now",
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
          customApiKey: customApiKey || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.content,
          timestamp: "Just now",
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
            content: "Unable to retrieve intelligence signal. Please try again or rephrase your query.",
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
          content: "Network error communicating with Lince Copilot.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const PRESETS = [
    "Which AI agent projects have rising mindshare but low market cap?",
    "Show me projects with >80 Alpha Divergence score.",
    "Summarize recent calls from top-tier research KOLs.",
    "Is capital rotating from Memecoins to DePIN?",
  ];

  return (
    <section id="copilot-section" className="py-20 border-b border-[#242421] bg-[#0d0d0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Index Kicker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
          <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#b5b3ac]">
            [ 04 / COPILOT TERMINAL ]
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f6f4ef] font-normal tracking-tight leading-[1.08] mb-3">
              Private intelligence, without data retention.
            </h2>
            <p className="text-sm sm:text-base text-[#b5b3ac] leading-relaxed max-w-[62ch]">
              Query cross-platform sentiment, early narrative velocity, and KOL consensus in plain English.
              Powered by verifiable zero-logging private inference or instant deterministic analysis.
            </p>
          </div>

          {/* Venice AI Integration Notice & Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/terminal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] text-[#111110] font-semibold text-xs font-sans transition-all active:scale-95 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Terminal App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onOpenVeniceModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono-tech transition-colors cursor-pointer ${
                customApiKey
                  ? "bg-[#1f172e] border-purple-500/40 text-purple-200"
                  : "bg-[#141413] hover:bg-[#1a1a18] border-[#2c2c28] text-[#b5b3ac] hover:text-[#f6f4ef]"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {customApiKey ? "Venice: Active" : "Venice AI"}
              </span>
            </button>

            <button
              onClick={() =>
                setMessages([
                  {
                    id: "reset-1",
                    role: "assistant",
                    content: "Terminal session reset. Ask a question or click a preset below.",
                    timestamp: "Just now",
                    modelUsed: "Lince Intelligence Engine",
                  },
                ])
              }
              className="p-1.5 rounded-md bg-[#141413] hover:bg-[#1a1a18] border border-[#2c2c28] text-[#b5b3ac] hover:text-[#f6f4ef] transition-colors cursor-pointer"
              title="Reset Chat Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Window Container */}
        <div className="rounded-xl border border-[#242421] bg-[#121211] overflow-hidden shadow-2xl flex flex-col h-[560px]">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#161614] border-b border-[#242421] flex items-center justify-between text-xs font-mono-tech text-[#b5b3ac]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#383733]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#383733]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#383733]" />
              <span className="ml-2 font-medium text-[#f6f4ef]">lince-copilot-v1.0.sh</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#10b981] tracking-wider uppercase font-semibold">STREAMING READY</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-2xl rounded-lg p-4 leading-relaxed transition-all ${
                    m.role === "user"
                      ? "bg-[#1c1b18] border border-[#383733] text-[#f6f4ef]"
                      : "bg-[#141413] border border-[#242421] text-[#b5b3ac]"
                  }`}
                >
                  {/* Assistant Header info */}
                  {m.role === "assistant" && (
                    <div className="flex items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-[#242421] text-[11px] font-mono-tech text-[#73716a]">
                      <span className="flex items-center gap-1.5 text-[#06b6d4] font-medium">
                        <Cpu className="w-3.5 h-3.5" />
                        {m.modelUsed || "Lince Intelligence Engine"}
                      </span>
                      {m.sentimentGauge !== undefined && (
                        <span className="text-[#10b981] font-semibold">
                          SENTIMENT: {(m.sentimentGauge * 100).toFixed(0)}% BULLISH
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#f6f4ef] leading-relaxed">
                    {m.content}
                  </div>

                  {/* Mentioned Tokens Badges */}
                  {m.tokensMentioned && m.tokensMentioned.length > 0 && (
                    <div className="mt-3.5 pt-2.5 border-t border-[#242421] flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[#73716a] font-mono-tech">DETECTED:</span>
                      {m.tokensMentioned.map((tok) => (
                        <span
                          key={tok}
                          className="px-2 py-0.5 rounded bg-[#1c1c1a] border border-[#2c2c28] text-[#06b6d4] font-semibold font-mono-tech"
                        >
                          ${tok}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Citations Footer */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono-tech text-[#73716a]">
                      <span>SOURCES:</span>
                      {m.citations.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 py-0.5 rounded bg-[#10100f] text-[#b5b3ac] border border-[#242421]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2.5 text-[#06b6d4] font-mono-tech text-xs">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
                <span>Reading cross-platform signals and synthesizing alpha...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Presets Bar */}
          <div className="px-4 py-2.5 bg-[#141413] border-t border-[#242421] overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-mono-tech text-[#73716a] shrink-0 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#f59e0b]" /> PRESETS:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-md bg-[#1a1a18] hover:bg-[#222220] border border-[#2c2c28] hover:border-[#403f3a] text-xs font-mono-tech text-[#b5b3ac] hover:text-[#f6f4ef] shrink-0 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#161614] border-t border-[#242421] flex items-center gap-2.5"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'Which Base ecosystem tokens have highest social spike?')..."
              className="flex-1 px-4 py-2.5 rounded-md bg-[#0d0d0c] border border-[#242421] text-xs sm:text-sm text-[#f6f4ef] placeholder-[#73716a] focus:outline-none focus:border-[#403f3a] font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] disabled:opacity-40 text-[#111110] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
