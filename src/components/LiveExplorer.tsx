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
    <section id="narratives-section" className="py-16 border-b border-[#242421]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Noumen Style) */}
        <div className="mb-10">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#73716a] block mb-2">
            01 / LIVE NARRATIVE CATALOG
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#f6f4ef] leading-[1.05] mb-4">
            Track narratives on your terms.
          </h2>
          <p className="text-sm sm:text-base text-[#b5b3ac] max-w-[54ch] leading-relaxed font-sans">
            Different market cycles call for different sectors. Lince brings mindshare telemetry, 
            sentiment polarity, and social volume into one unified interface, so you can spot capital rotation early.
          </p>
        </div>

        {/* Tab Selector & Search Row (Noumen clean styling) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242421] pb-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("narratives")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer ${
                activeTab === "narratives"
                  ? "bg-[#f7f6f1] text-[#111110] font-bold"
                  : "bg-transparent text-[#b5b3ac] hover:text-[#f6f4ef] border border-[#2c2c28]"
              }`}
            >
              01 NARRATIVES
            </button>

            <button
              onClick={() => setActiveTab("divergence")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer ${
                activeTab === "divergence"
                  ? "bg-[#f7f6f1] text-[#111110] font-bold"
                  : "bg-transparent text-[#b5b3ac] hover:text-[#f6f4ef] border border-[#2c2c28]"
              }`}
            >
              02 ALPHA RADAR
            </button>

            <button
              onClick={() => setActiveTab("kols")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer ${
                activeTab === "kols"
                  ? "bg-[#f7f6f1] text-[#111110] font-bold"
                  : "bg-transparent text-[#b5b3ac] hover:text-[#f6f4ef] border border-[#2c2c28]"
              }`}
            >
              03 TOP KOLS
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition-all cursor-pointer ${
                activeTab === "socials"
                  ? "bg-[#f7f6f1] text-[#111110] font-bold"
                  : "bg-transparent text-[#b5b3ac] hover:text-[#f6f4ef] border border-[#2c2c28]"
              }`}
            >
              04 CHANNELS
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#73716a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by sector, ticker, KOL..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#111110] border border-[#2c2c28] text-xs font-mono-tech text-[#f6f4ef] placeholder-[#73716a] focus:outline-none focus:border-[#77756e]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: NARRATIVES TABLE (Noumen Model Catalog format)                     */}
        {/* ========================================================================= */}
        {activeTab === "narratives" && (
          <div className="overflow-x-auto border-t border-b border-[#242421]">
            <table className="w-full text-left text-xs font-mono-tech">
              <thead className="border-b border-[#242421] text-[#73716a] uppercase text-[10px] tracking-[0.14em]">
                <tr>
                  <th className="py-3 px-4 font-normal">01 / SECTOR</th>
                  <th className="py-3 px-4 font-normal">02 / MINDSHARE</th>
                  <th className="py-3 px-4 font-normal">03 / 24H VELOCITY</th>
                  <th className="py-3 px-4 font-normal">04 / SENTIMENT</th>
                  <th className="py-3 px-4 font-normal">05 / KEY TOKENS</th>
                  <th className="py-3 px-4 font-normal text-right">06 / 24H POSTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242421]">
                {filteredNarratives.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#161614] transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[#73716a] text-[11px] w-4">
                          0{index + 1}
                        </span>
                        <div>
                          <span className="font-serif-editorial text-lg text-[#f6f4ef] group-hover:text-white transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#73716a] tracking-[0.08em]">
                            TAG: #{item.tickerTag}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-[#f6f4ef]">
                      <div className="flex items-center gap-2">
                        <span>{item.mindshare.toFixed(1)}%</span>
                        <div className="w-14 h-1 bg-[#242421] rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-[#f6f4ef]"
                            style={{ width: `${item.mindshare * 3.5}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold ${
                          item.change24h >= 0 ? "text-[#10b981]" : "text-rose-400"
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
                              ? "bg-[#10b981]"
                              : item.sentimentScore >= 0.75
                              ? "bg-[#06b6d4]"
                              : "bg-[#f59e0b]"
                          }`}
                        />
                        <span className="text-[#b5b3ac]">
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
                            className="px-2 py-0.5 rounded border border-[#2c2c28] hover:border-[#77756e] text-[#b5b3ac] hover:text-[#f6f4ef] text-[10px] transition-colors cursor-pointer"
                          >
                            ${p}
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right text-[#73716a]">
                      {item.socialVolume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALPHA DIVERGENCE (Noumen Platform feature cards)                   */}
        {/* ========================================================================= */}
        {activeTab === "divergence" && (
          <div id="divergence-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDivergences.map((sig, index) => (
              <div
                key={sig.id}
                className="p-6 rounded-md bg-[#111110] border border-[#242421] hover:border-[#403f3a] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[#73716a] uppercase">
                      0{index + 1} / {sig.signalType.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono-tech font-bold text-[#10b981] px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20">
                      {sig.divergenceScore}/100 SCORE
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-serif-editorial text-2xl text-[#f6f4ef] leading-tight flex items-baseline gap-2">
                      <span>{sig.name}</span>
                      <span className="text-xs font-mono-tech text-[#06b6d4]">
                        ${sig.ticker}
                      </span>
                    </h3>
                    <span className="text-[11px] font-mono-tech text-[#73716a]">
                      {sig.category} · {sig.chain}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded bg-[#0d0d0c] border border-[#242421] mb-4 text-xs font-mono-tech">
                    <div>
                      <span className="text-[#73716a] block text-[10px]">MINDSHARE 24H</span>
                      <span className="text-[#10b981] font-bold">
                        +{sig.mindshareSpike24h.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[#73716a] block text-[10px]">PRICE ACTION</span>
                      <span
                        className={`font-bold ${
                          sig.priceChange24h >= 0 ? "text-[#b5b3ac]" : "text-rose-400"
                        }`}
                      >
                        {sig.priceChange24h >= 0 ? `+${sig.priceChange24h.toFixed(1)}%` : `${sig.priceChange24h.toFixed(1)}%`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#b5b3ac] leading-relaxed mb-6 font-sans">
                    {sig.catalyst}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#242421] flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#73716a]">MCAP: {sig.marketCap}</span>
                  <button
                    onClick={() => onSelectTokenForCopilot(sig.ticker)}
                    className="text-[#f6f4ef] hover:text-[#06b6d4] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
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
        {/* TAB 3: TOP KOLS ATTENTION (Noumen Architecture Cards)                     */}
        {/* ========================================================================= */}
        {activeTab === "kols" && (
          <div id="kols-section" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredKols.map((kol, index) => (
              <div
                key={kol.id}
                className="p-6 rounded-md bg-[#111110] border border-[#242421] hover:border-[#403f3a] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#73716a] block mb-1">
                      0{index + 1} / {kol.tier.replace("_", " ")}
                    </span>
                    <h3 className="font-serif-editorial text-2xl text-[#f6f4ef]">{kol.name}</h3>
                    <span className="text-xs font-mono-tech text-[#06b6d4]">{kol.handle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono-tech text-[#73716a] block">ACCURACY</span>
                    <span className="text-sm font-mono-tech font-bold text-[#10b981]">
                      {kol.hitRate} Verified
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-mono-tech text-[#73716a] uppercase block mb-1.5">
                    COVERAGE SECTORS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {kol.currentFocus.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded border border-[#2c2c28] text-xs text-[#b5b3ac] font-mono-tech"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded bg-[#0d0d0c] border border-[#242421]">
                  <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                    <span className="text-[#f6f4ef] font-bold">${kol.recentCall.ticker}</span>
                    <span className="text-[#73716a]">{kol.recentCall.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#b5b3ac] italic font-sans leading-relaxed">
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
                className="p-6 rounded-md bg-[#111110] border border-[#242421]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono-tech text-[#73716a]">0{index + 1}</span>
                  <span className="text-xs font-mono-tech font-bold text-[#f6f4ef]">
                    {soc.share.toFixed(1)}% Share
                  </span>
                </div>

                <h3 className="font-serif-editorial text-2xl text-[#f6f4ef] mb-4">
                  {soc.platform}
                </h3>

                <div className="w-full h-1.5 bg-[#0d0d0c] rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-[#f6f4ef]"
                    style={{ width: `${soc.share * 1.8}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between text-[#73716a]">
                    <span>INDEXED ACTIVITY:</span>
                    <span className="text-[#f6f4ef]">{soc.volume}</span>
                  </div>
                  <div className="flex justify-between text-[#73716a]">
                    <span>24H ACCELERATION:</span>
                    <span className="text-[#10b981] font-bold">{soc.growth24h}</span>
                  </div>
                  <div className="flex justify-between text-[#73716a] pt-2 border-t border-[#242421]">
                    <span>LEADING THEME:</span>
                    <span className="text-[#b5b3ac] truncate max-w-[150px]">
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
