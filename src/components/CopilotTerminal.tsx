"use client";

import React, { useState, useRef, useEffect } from "react";
import { CopilotMessage } from "@/lib/types";
import {
  Terminal,
  Send,
  Shield,
  RotateCcw,
  Cpu,
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

Ask any question in plain English or click a preset below to explore current alpha.`,
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
    <section id="copilot-section" className="py-12 border-b border-[#1E2332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                AI Intelligence Copilot
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ask Lince in Plain English
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Grounded in multi-platform social chatter, KOL mentions, and on-chain sentiment.
            </p>
          </div>

          {/* Venice AI Integration Notice */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVeniceModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/20 border border-purple-500/30 hover:bg-purple-900/30 text-xs font-mono text-purple-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {customApiKey ? "Venice AI: Custom Key Active" : "Powered by Venice AI"}
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
              className="p-2 rounded-xl bg-[#11141E] border border-[#1E2332] text-neutral-400 hover:text-white transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="rounded-2xl border border-[#1E2332] bg-[#0E111A] overflow-hidden shadow-2xl flex flex-col h-[520px]">
          {/* Terminal Titlebar */}
          <div className="px-4 py-2.5 bg-[#141824] border-b border-[#1E2332] flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-semibold text-white">lince-copilot-v1.0.sh</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STREAMING READY</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-2xl rounded-2xl p-4 leading-relaxed ${
                    m.role === "user"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-200"
                      : "bg-[#141824] border border-[#1E2332] text-neutral-200"
                  }`}
                >
                  {/* Assistant Header info */}
                  {m.role === "assistant" && (
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#1E2332] text-[10px] text-neutral-400">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                        <Cpu className="w-3 h-3" />
                        {m.modelUsed || "Lince Intelligence Engine"}
                      </span>
                      {m.sentimentGauge !== undefined && (
                        <span className="text-emerald-400 font-bold">
                          SENTIMENT: {(m.sentimentGauge * 100).toFixed(0)}% BULLISH
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content (Pre-wrap format) */}
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {m.content}
                  </div>

                  {/* Mentioned Tokens Badges */}
                  {m.tokensMentioned && m.tokensMentioned.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-[#1E2332] flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-neutral-500 font-mono">TOKENS DETECTED:</span>
                      {m.tokensMentioned.map((tok) => (
                        <span
                          key={tok}
                          className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold font-mono"
                        >
                          ${tok}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Citations Footer */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-500">
                      <span>SOURCES:</span>
                      {m.citations.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 py-0.2 rounded bg-[#090A0F] text-neutral-400 border border-[#1E2332]"
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
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Reading social signals and synthesizing alpha...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Presets Bar */}
          <div className="px-4 py-2 bg-[#121622] border-t border-[#1E2332] overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-500 shrink-0">
              ALPHA PRESETS:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-neutral-300 hover:text-white shrink-0 transition-colors"
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
            className="p-3 bg-[#141824] border-t border-[#1E2332] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'Which Base ecosystem tokens have highest social spike?')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#090A0F] border border-[#1E2332] text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
