"use client";

import React, { useState } from "react";
import { Narrative, AlphaDivergence, KOLProfile, SocialPlatformShare } from "@/lib/types";
import {
  TrendingUp,
  Zap,
  Users,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Search,
} from "lucide-react";
import LiveClock from "@/components/LiveClock";

interface LiveExplorerProps {
  activeTab: "narratives" | "divergence" | "kols" | "socials";
  setActiveTab: (tab: "narratives" | "divergence" | "kols" | "socials") => void;
  narratives: Narrative[];
  divergences: AlphaDivergence[];
  kols: KOLProfile[];
  socials: SocialPlatformShare[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTokenForCopilot: (token: string) => void;
}

export default function LiveExplorer({
  activeTab,
  setActiveTab,
  narratives,
  divergences,
  kols,
  socials,
  searchQuery,
  setSearchQuery,
  onSelectTokenForCopilot,
}: LiveExplorerProps) {
  const q = searchQuery.toLowerCase().trim();

  const filteredNarratives = narratives.filter(
    (n) =>
      !q ||
      n.name.toLowerCase().includes(q) ||
      n.tickerTag.toLowerCase().includes(q) ||
      n.topProjects.some((p) => p.toLowerCase().includes(q))
  );

  const filteredDivergences = divergences.filter(
    (d) =>
      !q ||
      d.ticker.toLowerCase().includes(q) ||
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.chain.toLowerCase().includes(q)
  );

  const filteredKols = kols.filter(
    (k) =>
      !q ||
      k.name.toLowerCase().includes(q) ||
      k.handle.toLowerCase().includes(q) ||
      k.currentFocus.some((f) => f.toLowerCase().includes(q)) ||
      k.recentCall.ticker.toLowerCase().includes(q)
  );

  return (
    <section id="narratives-section" className="py-16 border-b border-[var(--nm-line)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Live Clock & Last Updated Batch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[var(--nm-text-subtle)] block">
                [ 02 / REAL-TIME INTELLIGENCE CATALOG ]
              </span>
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--nm-text)] leading-[1.05] mb-3">
              Detect capital rotation in real time.
            </h2>
            <p className="text-sm sm:text-base text-[var(--nm-text-muted)] max-w-[56ch] leading-relaxed font-sans">
              From autonomous AI agents to decentralized compute. Compare cross-platform social mindshare against on-chain liquidity to spot asymmetric accumulation early.
            </p>
          </div>

          {/* Sync status & Exact Update Time Badge */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 text-xs font-mono-tech">
            <div className="px-3 py-1.5 rounded-md bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)] animate-pulse" />
              <span className="text-[var(--nm-text-subtle)]">TERUPDATE:</span>
              <span className="font-bold text-[var(--nm-accent-emerald)]">12:48 UTC</span>
              <span className="text-[var(--nm-text-subtle)] hidden sm:inline">(CADENCE 10M)</span>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-[var(--nm-text-muted)]">
              <LiveClock prefix="SYNC:" />
            </div>
          </div>
        </div>

        {/* Tab Selector & Search Row (Mobile Optimized Swipeable Tabs) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nm-line)] pb-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("narratives")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer shrink-0 ${
                activeTab === "narratives"
                  ? "bg-[var(--nm-action)] text-[var(--nm-action-text)] font-bold shadow-sm"
                  : "bg-[var(--nm-surface)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] border border-[var(--nm-line)]"
              }`}
            >
              01 NARRATIVES
            </button>

            <button
              onClick={() => setActiveTab("divergence")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer shrink-0 ${
                activeTab === "divergence"
                  ? "bg-[var(--nm-action)] text-[var(--nm-action-text)] font-bold shadow-sm"
                  : "bg-[var(--nm-surface)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] border border-[var(--nm-line)]"
              }`}
            >
              02 ALPHA RADAR
            </button>

            <button
              onClick={() => setActiveTab("kols")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer shrink-0 ${
                activeTab === "kols"
                  ? "bg-[var(--nm-action)] text-[var(--nm-action-text)] font-bold shadow-sm"
                  : "bg-[var(--nm-surface)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] border border-[var(--nm-line)]"
              }`}
            >
              03 TOP KOLS
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer shrink-0 ${
                activeTab === "socials"
                  ? "bg-[var(--nm-action)] text-[var(--nm-action-text)] font-bold shadow-sm"
                  : "bg-[var(--nm-surface)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] border border-[var(--nm-line)]"
              }`}
            >
              04 CHANNELS
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[var(--nm-text-subtle)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by sector, ticker, KOL..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[var(--nm-surface)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] placeholder-[var(--nm-text-subtle)] focus:outline-none focus:border-[var(--nm-line-strong)]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: NARRATIVES (Responsive Mobile Cards + Desktop Table)                */}
        {/* ========================================================================= */}
        {activeTab === "narratives" && (
          <div>
            {/* Mobile Cards View (Screen < md) */}
            <div className="md:hidden space-y-3.5 mb-6">
              {filteredNarratives.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block">
                        0{index + 1} / #{item.tickerTag}
                      </span>
                      <h3 className="font-serif-editorial text-xl text-[var(--nm-text)] font-normal">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-mono-tech font-bold px-2 py-0.5 rounded ${
                          item.change24h >= 0
                            ? "bg-[var(--nm-accent-emerald)]/10 text-[var(--nm-accent-emerald)]"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech p-2.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)]">
                    <div>
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block">MINDSHARE</span>
                      <span className="font-bold text-[var(--nm-text)]">{item.mindshare.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block">SENTIMENT</span>
                      <span className="text-[var(--nm-accent-cyan)] font-semibold">
                        {(item.sentimentScore * 100).toFixed(0)}% Bullish
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] mr-1">TOKENS:</span>
                    {item.topProjects.map((p) => (
                      <button
                        key={p}
                        onClick={() => onSelectTokenForCopilot(p)}
                        className="px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-[10px] font-mono-tech text-[var(--nm-text-muted)] hover:text-[var(--nm-text)]"
                      >
                        ${p}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2.5 border-t border-[var(--nm-line)] flex items-center justify-between text-[11px] font-mono-tech text-[var(--nm-text-subtle)]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
                      <span>TERUPDATE: <strong className="text-[var(--nm-text)]">{item.lastUpdated}</strong></span>
                    </span>
                    <span>{item.socialVolume}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (Screen >= md) */}
            <div className="hidden md:block overflow-x-auto border-t border-b border-[var(--nm-line)]">
              <table className="w-full text-left text-xs font-mono-tech">
                <thead className="border-b border-[var(--nm-line)] text-[var(--nm-text-subtle)] uppercase text-[10px] tracking-[0.14em]">
                  <tr>
                    <th className="py-3 px-4 font-normal">01 / SECTOR</th>
                    <th className="py-3 px-4 font-normal">02 / MINDSHARE</th>
                    <th className="py-3 px-4 font-normal">03 / 24H VELOCITY</th>
                    <th className="py-3 px-4 font-normal">04 / SENTIMENT</th>
                    <th className="py-3 px-4 font-normal">05 / KEY TOKENS</th>
                    <th className="py-3 px-4 font-normal">06 / TERUPDATE</th>
                    <th className="py-3 px-4 font-normal text-right">07 / 24H POSTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--nm-line)]">
                  {filteredNarratives.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[var(--nm-surface-hover)] transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[var(--nm-text-subtle)] text-[11px] w-4">
                            0{index + 1}
                          </span>
                          <div>
                            <span className="font-serif-editorial text-lg text-[var(--nm-text)] group-hover:text-[var(--nm-accent-cyan)] transition-colors block">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-[var(--nm-text-subtle)] tracking-[0.08em]">
                              TAG: #{item.tickerTag}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-[var(--nm-text)]">
                        <div className="flex items-center gap-2">
                          <span>{item.mindshare.toFixed(1)}%</span>
                          <div className="w-14 h-1.5 bg-[var(--nm-badge-bg)] rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-[var(--nm-accent-cyan)]"
                              style={{ width: `${item.mindshare * 3.5}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-0.5 font-bold ${
                            item.change24h >= 0 ? "text-[var(--nm-accent-emerald)]" : "text-rose-500"
                          }`}
                        >
                          {item.change24h >= 0 ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          {item.change24h >= 0 ? `+${item.change24h.toFixed(1)}%` : `${item.change24h.toFixed(1)}%`}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.sentimentScore >= 0.85
                                ? "bg-[var(--nm-accent-emerald)]"
                                : item.sentimentScore >= 0.75
                                ? "bg-[var(--nm-accent-cyan)]"
                                : "bg-[var(--nm-accent-amber)]"
                            }`}
                          />
                          <span className="text-[var(--nm-text-muted)] font-medium">
                            {(item.sentimentScore * 100).toFixed(0)}% Bullish
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {item.topProjects.map((p) => (
                            <button
                              key={p}
                              onClick={() => onSelectTokenForCopilot(p)}
                              className="px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] text-[10px] transition-colors cursor-pointer"
                            >
                              ${p}
                            </button>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] text-[11px] text-[var(--nm-accent-emerald)] font-semibold border border-[var(--nm-line)]">
                          {item.lastUpdated}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right text-[var(--nm-text-subtle)]">
                        {item.socialVolume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALPHA DIVERGENCE                                                   */}
        {/* ========================================================================= */}
        {activeTab === "divergence" && (
          <div id="divergence-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDivergences.map((sig, index) => (
              <div
                key={sig.id}
                className="p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[var(--nm-text-subtle)] uppercase">
                      0{index + 1} / {sig.signalType.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono-tech font-bold text-[var(--nm-accent-emerald)] px-2 py-0.5 rounded bg-[var(--nm-accent-emerald)]/10 border border-[var(--nm-accent-emerald)]/20">
                      {sig.divergenceScore}/100 SCORE
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)] leading-tight flex items-baseline gap-2">
                      <span>{sig.name}</span>
                      <span className="text-xs font-mono-tech text-[var(--nm-accent-cyan)]">
                        ${sig.ticker}
                      </span>
                    </h3>
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[var(--nm-text-subtle)] mt-1">
                      <span>{sig.category} · {sig.chain}</span>
                      <span className="text-[var(--nm-accent-emerald)] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-emerald)]" />
                        TERUPDATE: {sig.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] mb-4 text-xs font-mono-tech">
                    <div>
                      <span className="text-[var(--nm-text-subtle)] block text-[10px]">MINDSHARE 24H</span>
                      <span className="text-[var(--nm-accent-emerald)] font-bold">
                        +{sig.mindshareSpike24h.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--nm-text-subtle)] block text-[10px]">PRICE ACTION</span>
                      <span
                        className={`font-bold ${
                          sig.priceChange24h >= 0 ? "text-[var(--nm-text-muted)]" : "text-rose-500"
                        }`}
                      >
                        {sig.priceChange24h >= 0 ? `+${sig.priceChange24h.toFixed(1)}%` : `${sig.priceChange24h.toFixed(1)}%`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--nm-text-muted)] leading-relaxed mb-6 font-sans">
                    {sig.catalyst}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--nm-line)] flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[var(--nm-text-subtle)]">MCAP: {sig.marketCap}</span>
                  <button
                    onClick={() => onSelectTokenForCopilot(sig.ticker)}
                    className="text-[var(--nm-text)] hover:text-[var(--nm-accent-cyan)] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Analyze in Copilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TOP KOLS ATTENTION                                                 */}
        {/* ========================================================================= */}
        {activeTab === "kols" && (
          <div id="kols-section" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredKols.map((kol, index) => (
              <div
                key={kol.id}
                className="p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] hover:border-[var(--nm-line-strong)] transition-all shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block mb-1">
                      0{index + 1} / {kol.tier.replace("_", " ")}
                    </span>
                    <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)]">{kol.name}</h3>
                    <span className="text-xs font-mono-tech text-[var(--nm-accent-cyan)]">{kol.handle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block">ACCURACY</span>
                    <span className="text-sm font-mono-tech font-bold text-[var(--nm-accent-emerald)]">
                      {kol.hitRate} Verified
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] uppercase block mb-1.5">
                    COVERAGE SECTORS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {kol.currentFocus.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] text-xs text-[var(--nm-text-muted)] font-mono-tech"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[var(--nm-text)] font-bold">${kol.recentCall.ticker}</span>
                    <span className="text-[var(--nm-accent-emerald)] text-[11px] font-semibold">
                      TERUPDATE: {kol.recentCall.exactTime}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--nm-text-muted)] italic font-sans leading-relaxed">
                    &ldquo;{kol.recentCall.thesis}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SOCIAL CHANNELS BREAKDOWN                                          */}
        {/* ========================================================================= */}
        {activeTab === "socials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {socials.map((soc, index) => (
              <div
                key={soc.platform}
                className="p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">0{index + 1}</span>
                  <span className="text-xs font-mono-tech font-bold text-[var(--nm-text)]">
                    {soc.share.toFixed(1)}% Share
                  </span>
                </div>

                <h3 className="font-serif-editorial text-2xl text-[var(--nm-text)] mb-4">
                  {soc.platform}
                </h3>

                <div className="w-full h-1.5 bg-[var(--nm-badge-bg)] rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-[var(--nm-accent-cyan)]"
                    style={{ width: `${soc.share * 1.8}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between text-[var(--nm-text-subtle)]">
                    <span>INDEXED ACTIVITY:</span>
                    <span className="text-[var(--nm-text)] font-semibold">{soc.volume}</span>
                  </div>
                  <div className="flex justify-between text-[var(--nm-text-subtle)]">
                    <span>24H ACCELERATION:</span>
                    <span className="text-[var(--nm-accent-emerald)] font-bold">{soc.growth24h}</span>
                  </div>
                  <div className="flex justify-between text-[var(--nm-text-subtle)] pt-2 border-t border-[var(--nm-line)]">
                    <span>TERUPDATE:</span>
                    <span className="text-[var(--nm-accent-emerald)] font-semibold">
                      {soc.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
