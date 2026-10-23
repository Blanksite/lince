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
} from "lucide-react";

interface LiveExplorerProps {
  activeTab: "narratives" | "divergence" | "kols" | "socials";
  setActiveTab: (tab: "narratives" | "divergence" | "kols" | "socials") => void;
  narratives: Narrative[];
  divergences: AlphaDivergence[];
  kols: KOLProfile[];
  socials: SocialPlatformShare[];
  searchQuery: string;
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
  onSelectTokenForCopilot,
}: LiveExplorerProps) {
  // Filter logic based on search
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
    <section className="py-12 border-b border-[#1E2332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                Live Data Terminal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Before You Sign Up
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Zero login required. Inspect live mindshare, early divergence signals, and KOL consensus.
            </p>
          </div>

          {/* Tab Navigation Pill */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#11141E] border border-[#1E2332] overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("narratives")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                activeTab === "narratives"
                  ? "bg-cyan-500 text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Narratives</span>
            </button>

            <button
              onClick={() => setActiveTab("divergence")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                activeTab === "divergence"
                  ? "bg-emerald-500 text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Alpha Radar</span>
            </button>

            <button
              onClick={() => setActiveTab("kols")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                activeTab === "kols"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Top KOLs</span>
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                activeTab === "socials"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Socials</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: NARRATIVES MATRIX                                                  */}
        {/* ========================================================================= */}
        {activeTab === "narratives" && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-2xl border border-[#1E2332] bg-[#11141E]/80 backdrop-blur-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#161B26] border-b border-[#1E2332] text-neutral-400 uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Narrative</th>
                    <th className="py-3 px-4">Mindshare</th>
                    <th className="py-3 px-4">24h Velocity</th>
                    <th className="py-3 px-4">Sentiment</th>
                    <th className="py-3 px-4">Key Projects</th>
                    <th className="py-3 px-4 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2332]">
                  {filteredNarratives.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500 font-bold w-4">{index + 1}</span>
                          <div>
                            <span className="font-sans font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 block font-mono">
                              TAG: #{item.tickerTag}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span>{item.mindshare.toFixed(1)}%</span>
                          {/* Mini Progress Bar */}
                          <div className="w-16 h-1.5 bg-[#1E2332] rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-cyan-400 rounded-full"
                              style={{ width: `${item.mindshare * 3.5}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            item.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
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

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.sentimentScore >= 0.85
                                ? "bg-emerald-400"
                                : item.sentimentScore >= 0.75
                                ? "bg-cyan-400"
                                : "bg-amber-400"
                            }`}
                          />
                          <span className="text-white">{(item.sentimentScore * 100).toFixed(0)}% Bullish</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.topProjects.map((p) => (
                            <button
                              key={p}
                              onClick={() => onSelectTokenForCopilot(p)}
                              className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 text-neutral-300 hover:text-cyan-300 border border-white/10 text-[10px] transition-colors"
                            >
                              ${p}
                            </button>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right text-neutral-400 font-mono">
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
        {/* TAB 2: ALPHA DIVERGENCE (SIGNAL RADAR)                                    */}
        {/* ========================================================================= */}
        {activeTab === "divergence" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDivergences.map((sig) => (
              <div
                key={sig.id}
                className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2332] hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Signal Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {sig.signalType.replace("_", " ")}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 block font-mono">SIGNAL SCORE</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">
                        {sig.divergenceScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Token Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{sig.name}</span>
                      <span className="text-xs font-mono text-cyan-400 font-normal">
                        ${sig.ticker}
                      </span>
                    </h3>
                    <span className="text-xs text-neutral-500 font-mono">
                      {sig.category} · {sig.chain}
                    </span>
                  </div>

                  {/* Divergence Metrics Comparison */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#090A0F] border border-[#1E2332] mb-3 text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">MINDSHARE 24H</span>
                      <span className="text-emerald-400 font-bold text-sm">
                        +{sig.mindshareSpike24h.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">PRICE 24H</span>
                      <span
                        className={`font-bold text-sm ${
                          sig.priceChange24h >= 0 ? "text-neutral-300" : "text-rose-400"
                        }`}
                      >
                        {sig.priceChange24h >= 0 ? `+${sig.priceChange24h.toFixed(1)}%` : `${sig.priceChange24h.toFixed(1)}%`}
                      </span>
                    </div>
                  </div>

                  {/* Catalyst Synopsis */}
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {sig.catalyst}
                  </p>
                </div>

                {/* Footer info & Copilot link */}
                <div className="pt-3 border-t border-[#1E2332] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">MCap: {sig.marketCap}</span>
                  <button
                    onClick={() => onSelectTokenForCopilot(sig.ticker)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="w-3 h-3" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKols.map((kol) => (
              <div
                key={kol.id}
                className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2332] hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{kol.name}</h3>
                    <span className="text-xs font-mono text-purple-400">{kol.handle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block font-mono">HIT RATE</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {kol.hitRate} Accuracy
                    </span>
                  </div>
                </div>

                {/* Focus Sectors */}
                <div className="mb-4">
                  <span className="text-[11px] text-neutral-500 block font-mono mb-1.5">
                    CURRENT FOCUS NARRATIVES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {kol.currentFocus.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Verified Call */}
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2332]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span className="text-cyan-400 font-bold">${kol.recentCall.ticker}</span>
                    <span>{kol.recentCall.timestamp}</span>
                  </div>
                  <p className="text-xs text-neutral-300 italic">
                    &ldquo;{kol.recentCall.thesis}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SOCIAL SHARE BREAKDOWN                                             */}
        {/* ========================================================================= */}
        {activeTab === "socials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((soc) => (
              <div
                key={soc.platform}
                className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2332]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-sm">{soc.platform}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {soc.share.toFixed(1)}% Share
                  </span>
                </div>

                <div className="w-full h-2 bg-[#090A0F] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    style={{ width: `${soc.share * 1.8}%` }}
                  />
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>INDEXED VOLUME:</span>
                    <span className="text-white font-bold">{soc.volume}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>24H GROWTH:</span>
                    <span className="text-emerald-400 font-bold">{soc.growth24h}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 pt-1 border-t border-[#1E2332]">
                    <span>TOP SECTOR:</span>
                    <span className="text-cyan-300 font-medium truncate max-w-[150px]">
                      {soc.dominantNarrative}
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
