"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Maximize2,
  Info,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

interface TreemapSector {
  id: string;
  name: string;
  mindsharePercent: number; // e.g. 27.5
  historicalDelta: number; // e.g. +14.2%
  smartFollowers: number; // e.g. 14200
  kolCount: number; // e.g. 28
  color: string;
  textColor?: string;
  isTokenNarrative?: boolean;
  topTokens: string[];
  posts24h: string;
}

interface MindshareTreemapProps {
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  chain: string;
  xHandle?: string;
}

export function MindshareTreemap({
  tokenSymbol,
  tokenName,
  tokenAddress,
  chain,
  xHandle,
}: MindshareTreemapProps) {
  const [metricMode, setMetricMode] = useState<
    "MINDSHARE" | "HISTORICAL" | "MAXIS" | "SMART_FOLLOWERS"
  >("MINDSHARE");
  const [timeframe, setTimeframe] = useState<"24H" | "7D" | "30D">("30D");
  const [isRelative, setIsRelative] = useState<boolean>(true);
  const [hoveredSector, setHoveredSector] = useState<TreemapSector | null>(null);
  const [selectedSector, setSelectedSector] = useState<TreemapSector | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isNoumen = tokenSymbol.toUpperCase() === "NOUMEN";

  // Curated Sector Mindshare dataset matching the reference layout
  const sectors: TreemapSector[] = useMemo(() => {
    return [
      {
        id: "l1",
        name: "L1 & Orbit Chains",
        mindsharePercent: 27.5,
        historicalDelta: 18.4,
        smartFollowers: 34200,
        kolCount: 42,
        color: "#dc2626", // Red
        textColor: "#ffffff",
        isTokenNarrative: true,
        topTokens: [tokenSymbol, "ETH", "ARB", "ROBIN"],
        posts24h: "48,200 posts",
      },
      {
        id: "ai-agents",
        name: "AI-Agents & LLMs",
        mindsharePercent: isNoumen ? 18.5 : 8.5,
        historicalDelta: 42.1,
        smartFollowers: 28900,
        kolCount: 38,
        color: "#0284c7", // Sky blue
        textColor: "#ffffff",
        isTokenNarrative: true,
        topTokens: [tokenSymbol, "VIRTUAL", "AIXBT", "NOUMEN"],
        posts24h: "36,400 posts",
      },
      {
        id: "crypto-stocks",
        name: "Crypto-Stocks",
        mindsharePercent: 5.5,
        historicalDelta: 6.2,
        smartFollowers: 8200,
        kolCount: 12,
        color: "#ea580c", // Orange
        textColor: "#ffffff",
        topTokens: ["COIN", "MSTR"],
        posts24h: "14,200 posts",
      },
      {
        id: "derivatives",
        name: "Derivatives",
        mindsharePercent: 4.4,
        historicalDelta: -2.4,
        smartFollowers: 7100,
        kolCount: 9,
        color: "#ca8a04", // Gold/olive
        textColor: "#ffffff",
        topTokens: ["GMX", "DYDX", "HYPER"],
        posts24h: "9,800 posts",
      },
      {
        id: "nft",
        name: "NFT & Collectibles",
        mindsharePercent: 4.0,
        historicalDelta: -8.1,
        smartFollowers: 6400,
        kolCount: 8,
        color: "#f43f5e", // Coral
        textColor: "#ffffff",
        topTokens: ["PUDGY", "BAYC"],
        posts24h: "8,900 posts",
      },
      {
        id: "stablecoins",
        name: "Stablecoins",
        mindsharePercent: 3.9,
        historicalDelta: 1.5,
        smartFollowers: 9500,
        kolCount: 11,
        color: "#eab308", // Yellow
        textColor: "#18181b",
        topTokens: ["USDT", "USDC", "USDS"],
        posts24h: "11,200 posts",
      },
      {
        id: "memecoins",
        name: "Memecoins",
        mindsharePercent: 3.8,
        historicalDelta: 24.8,
        smartFollowers: 18200,
        kolCount: 24,
        color: "#f97316", // Bright orange
        textColor: "#ffffff",
        topTokens: ["DOGE", "PEPE", "ROBIN"],
        posts24h: "29,400 posts",
      },
      {
        id: "defi",
        name: "DeFi & Yield",
        mindsharePercent: 3.6,
        historicalDelta: 4.8,
        smartFollowers: 12400,
        kolCount: 16,
        color: "#7c3aed", // Vibrant purple
        textColor: "#ffffff",
        topTokens: ["AAVE", "UNI", "PONS"],
        posts24h: "14,800 posts",
      },
      {
        id: "pre-token",
        name: "Pre-Token & Points",
        mindsharePercent: 3.5,
        historicalDelta: 12.0,
        smartFollowers: 11200,
        kolCount: 15,
        color: "#9333ea", // Dark magenta
        textColor: "#ffffff",
        topTokens: ["BERA", "MONAD"],
        posts24h: "12,100 posts",
      },
      {
        id: "privacy",
        name: "Privacy & ZK",
        mindsharePercent: 2.9,
        historicalDelta: 5.3,
        smartFollowers: 6800,
        kolCount: 7,
        color: "#475569", // Dark slate
        textColor: "#ffffff",
        topTokens: ["ZEC", "RAIL"],
        posts24h: "7,400 posts",
      },
      {
        id: "launchpads",
        name: "Launchpads",
        mindsharePercent: 2.7,
        historicalDelta: 16.4,
        smartFollowers: 8900,
        kolCount: 14,
        color: "#78716c", // Stone
        textColor: "#ffffff",
        isTokenNarrative: true,
        topTokens: ["Pons V2", "Flap", "Pump.fun"],
        posts24h: "11,800 posts",
      },
      {
        id: "cex",
        name: "CEX & Infrastructure",
        mindsharePercent: 2.6,
        historicalDelta: -1.2,
        smartFollowers: 14200,
        kolCount: 10,
        color: "#0d9488", // Soft teal
        textColor: "#ffffff",
        topTokens: ["BNB", "OKB"],
        posts24h: "9,200 posts",
      },
      {
        id: "l2",
        name: "L2 & Rollups",
        mindsharePercent: 2.5,
        historicalDelta: 8.4,
        smartFollowers: 16400,
        kolCount: 18,
        color: "#16a34a", // Emerald green
        textColor: "#ffffff",
        isTokenNarrative: true,
        topTokens: ["Robinhood Orbit", "Base", "OP"],
        posts24h: "16,400 posts",
      },
      {
        id: "dex",
        name: "DEX & AMM",
        mindsharePercent: 1.7,
        historicalDelta: 9.1,
        smartFollowers: 7400,
        kolCount: 9,
        color: "#059669", // Sea green
        textColor: "#ffffff",
        topTokens: ["Pons", "Uniswap", "Raydium"],
        posts24h: "8,200 posts",
      },
      {
        id: "lending",
        name: "Lending",
        mindsharePercent: 1.7,
        historicalDelta: 3.2,
        smartFollowers: 5800,
        kolCount: 6,
        color: "#c026d3", // Fuchsia
        textColor: "#ffffff",
        topTokens: ["Morpho", "Euler"],
        posts24h: "6,100 posts",
      },
      {
        id: "ai",
        name: "General AI",
        mindsharePercent: 1.6,
        historicalDelta: 15.6,
        smartFollowers: 19400,
        kolCount: 22,
        color: "#0891b2", // Cyan
        textColor: "#ffffff",
        isTokenNarrative: true,
        topTokens: [tokenSymbol, "TAO", "RENDER"],
        posts24h: "24,800 posts",
      },
      {
        id: "oracles",
        name: "Oracles",
        mindsharePercent: 1.4,
        historicalDelta: 2.1,
        smartFollowers: 6100,
        kolCount: 8,
        color: "#14b8a6", // Mint
        textColor: "#ffffff",
        topTokens: ["LINK", "PYTH"],
        posts24h: "7,500 posts",
      },
      {
        id: "rwa",
        name: "RWA & Tokenization",
        mindsharePercent: 1.2,
        historicalDelta: 11.4,
        smartFollowers: 8200,
        kolCount: 10,
        color: "#94a3b8", // Light silver
        textColor: "#18181b",
        topTokens: ["ONDO", "CFG"],
        posts24h: "6,800 posts",
      },
      {
        id: "modular",
        name: "Modular",
        mindsharePercent: 1.0,
        historicalDelta: -3.5,
        smartFollowers: 5400,
        kolCount: 6,
        color: "#64748b", // Grey
        textColor: "#ffffff",
        topTokens: ["TIA", "DYM"],
        posts24h: "5,400 posts",
      },
      {
        id: "data",
        name: "Data & Storage",
        mindsharePercent: 0.9,
        historicalDelta: 1.2,
        smartFollowers: 4100,
        kolCount: 5,
        color: "#1e293b", // Deep navy
        textColor: "#ffffff",
        topTokens: ["FIL", "AR"],
        posts24h: "4,200 posts",
      },
    ];
  }, [tokenSymbol, isNoumen]);

  // Filter based on search query
  const filteredSectors = useMemo(() => {
    if (!searchQuery.trim()) return sectors;
    const q = searchQuery.toLowerCase();
    return sectors.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.topTokens.some((t) => t.toLowerCase().includes(q))
    );
  }, [sectors, searchQuery]);

  // Compute values dynamically based on active metric
  const processedSectors = useMemo(() => {
    return filteredSectors.map((s) => {
      let metricValue = s.mindsharePercent;
      let displayValue = `${s.mindsharePercent}%`;

      if (metricMode === "HISTORICAL") {
        metricValue = Math.max(1, s.historicalDelta + 20);
        displayValue = `${s.historicalDelta > 0 ? "+" : ""}${s.historicalDelta}%`;
      } else if (metricMode === "MAXIS") {
        metricValue = s.kolCount;
        displayValue = `${s.kolCount} KOLs`;
      } else if (metricMode === "SMART_FOLLOWERS") {
        metricValue = s.smartFollowers;
        displayValue = `${(s.smartFollowers / 1000).toFixed(1)}k`;
      }

      return {
        ...s,
        metricValue,
        displayValue,
      };
    });
  }, [filteredSectors, metricMode]);

  // Active sector being inspected
  const activeSector = selectedSector || hoveredSector;

  return (
    <div className="rounded-xl border border-[var(--nm-line)] bg-[var(--nm-surface)] overflow-hidden space-y-0">
      {/* Top Header matching reference image: Title, Controls, Timeframe */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--nm-line)] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[var(--nm-surface-hover)]/30 text-xs font-mono-tech">
        {/* Left: Title & Info */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[var(--nm-text)] text-[var(--nm-bg)] flex items-center justify-center shrink-0">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <span className="font-bold text-[var(--nm-text)] uppercase tracking-wider">
            X (CRYPTO TWITTER) SECTOR MINDSHARE HEATMAP
          </span>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)] cursor-pointer" />
            <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover:block w-64 p-2 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] shadow-xl text-[10px] text-[var(--nm-text-muted)] font-sans z-50">
              Proportional treemap sized by total engagement share, cashtag mentions, and influencer discussion velocity on X.
            </div>
          </div>
        </div>

        {/* Right: Search, Relative Toggle, Timeframe Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3 h-3 text-[var(--nm-text-subtle)] absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter narrative..."
              className="pl-6 pr-2 py-1 rounded bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-[11px] text-[var(--nm-text)] placeholder:text-[var(--nm-text-subtle)] focus:outline-none focus:border-[var(--nm-accent-cyan)] w-32 sm:w-36"
            />
          </div>

          {/* Relative Scale Toggle */}
          <button
            onClick={() => setIsRelative(!isRelative)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-[11px] text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)]"
          >
            <span>Relative</span>
            <span
              className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                isRelative ? "bg-[var(--nm-accent-cyan)] justify-end" : "bg-neutral-600 justify-start"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </button>

          {/* Timeframe Selector (24H, 7D, 30D) */}
          <div className="flex items-center rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] p-0.5">
            {(["24H", "7D", "30D"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  timeframe === t
                    ? "bg-[var(--nm-surface)] text-[var(--nm-text)] shadow-sm"
                    : "text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body: Treemap Grid (Left) + Social Metrics Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
        {/* Treemap Viewport (9 Cols) */}
        <div className="lg:col-span-9 p-2.5 sm:p-3 bg-[var(--nm-code-bg)] flex flex-col justify-between">
          <div className="w-full h-full min-h-[360px] sm:min-h-[420px] flex flex-wrap gap-1 content-start overflow-hidden rounded-lg bg-black/40 p-1">
            {processedSectors.map((sector) => {
              // Calculate responsive flex-basis / percentage based on mindshare %
              // High share = large blocks, low share = compact tiles
              const share = sector.mindsharePercent;
              const flexWidth =
                share >= 25
                  ? "w-full md:w-[38%] min-h-[160px] sm:min-h-[200px]"
                  : share >= 15
                  ? "w-[48%] md:w-[28%] min-h-[130px] sm:min-h-[160px]"
                  : share >= 5
                  ? "w-[48%] md:w-[22%] min-h-[90px] sm:min-h-[110px]"
                  : share >= 3
                  ? "w-[31%] md:w-[15%] min-h-[75px] sm:min-h-[90px]"
                  : "w-[23%] md:w-[11.5%] min-h-[60px] sm:min-h-[75px]";

              const isHighlighted =
                sector.isTokenNarrative && sector.topTokens.includes(tokenSymbol);
              const isHovered = hoveredSector?.id === sector.id;

              return (
                <div
                  key={sector.id}
                  onClick={() => setSelectedSector(sector)}
                  onMouseEnter={() => setHoveredSector(sector)}
                  onMouseLeave={() => setHoveredSector(null)}
                  style={{
                    backgroundColor: sector.color,
                    color: sector.textColor || "#ffffff",
                  }}
                  className={`${flexWidth} grow rounded-md p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all duration-150 hover:brightness-110 active:scale-[0.99] relative overflow-hidden select-none ${
                    isHighlighted ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""
                  } ${isHovered ? "shadow-2xl z-20 scale-[1.01]" : ""}`}
                >
                  {/* Subtle target token badge if matches scanned CA */}
                  {isHighlighted && (
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono-tech text-white font-bold flex items-center gap-1 border border-white/30">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>${tokenSymbol}</span>
                    </div>
                  )}

                  {/* Tile Label */}
                  <div className="space-y-0.5">
                    <span
                      className={`font-bold block leading-tight truncate ${
                        share >= 15
                          ? "text-base sm:text-xl font-serif-editorial"
                          : share >= 4
                          ? "text-xs sm:text-sm font-sans"
                          : "text-[10px] sm:text-[11px] font-sans"
                      }`}
                    >
                      {sector.name}
                    </span>
                    {share >= 3.5 && (
                      <span className="text-[10px] font-mono-tech opacity-80 block truncate">
                        {sector.topTokens.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>

                  {/* Tile Value */}
                  <div className="pt-2">
                    <div
                      className={`font-mono-tech font-bold ${
                        share >= 25
                          ? "text-2xl sm:text-4xl"
                          : share >= 15
                          ? "text-xl sm:text-2xl"
                          : share >= 4
                          ? "text-sm sm:text-base"
                          : "text-xs"
                      }`}
                    >
                      {sector.displayValue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Sector Quick Ticker Footer */}
          {activeSector && (
            <div className="mt-2 p-2.5 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech animate-in fade-in duration-100">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: activeSector.color }}
                />
                <span className="font-bold text-[var(--nm-text)]">{activeSector.name}</span>
                <span className="text-[var(--nm-text-subtle)]">|</span>
                <span className="text-[var(--nm-accent-cyan)] font-semibold">
                  {activeSector.posts24h} on X
                </span>
                <span className="text-[var(--nm-text-subtle)]">|</span>
                <span className="text-emerald-500 font-semibold">
                  +{activeSector.historicalDelta}% velocity
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[var(--nm-text-subtle)]">Leading cashtags:</span>
                <div className="flex items-center gap-1">
                  {activeSector.topTokens.map((t) => (
                    <a
                      key={t}
                      href={`https://x.com/search?q=%24${t}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1.5 py-0.5 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text)] border border-[var(--nm-line)] inline-flex items-center gap-0.5"
                    >
                      <span>${t}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 text-[var(--nm-text-subtle)]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Metrics Sidebar (3 Cols - Matching Reference UI) */}
        <div className="lg:col-span-3 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-[var(--nm-line)] bg-[var(--nm-surface)] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-[var(--nm-line)] pb-3">
              <h5 className="font-mono-tech font-bold text-xs uppercase tracking-wider text-[var(--nm-text)]">
                SOCIAL METRICS
              </h5>
              <p className="text-[11px] text-[var(--nm-text-muted)] font-sans mt-0.5">
                Filter Treemap heatmap scaling parameter across Crypto Twitter telemetry.
              </p>
            </div>

            {/* Metric Toggle Switches */}
            <div className="space-y-3 font-mono-tech text-xs">
              {/* Option 1: Mindshare */}
              <button
                onClick={() => setMetricMode("MINDSHARE")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "MINDSHARE"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">Mindshare</span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Share of total X CT attention
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "MINDSHARE"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 2: Historical Mindshare Performance */}
              <button
                onClick={() => setMetricMode("HISTORICAL")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "HISTORICAL"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Historical Velocity
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    24h momentum change rate
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "HISTORICAL"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 3: Maxis / KOL Consensus */}
              <button
                onClick={() => setMetricMode("MAXIS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "MAXIS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Maxis &amp; KOLs
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Verified research calls
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "MAXIS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 4: Smart Followers */}
              <button
                onClick={() => setMetricMode("SMART_FOLLOWERS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "SMART_FOLLOWERS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Smart Followers
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    High reputation CT accounts
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "SMART_FOLLOWERS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Token Positioning Callout Card */}
          <div className="p-3.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2 text-xs font-mono-tech">
            <div className="flex items-center gap-1.5 text-[var(--nm-accent-cyan)] font-bold text-[10px] uppercase">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>TOKEN NARRATIVE AUDIT</span>
            </div>
            <p className="text-[11px] text-[var(--nm-text)] font-sans leading-relaxed">
              ${tokenSymbol} captures high conviction within{" "}
              <strong className="text-[var(--nm-accent-cyan)]">AI-Agents</strong> and{" "}
              <strong className="text-emerald-500">Robinhood Orbit</strong> sectors on X.
            </p>
            {xHandle && (
              <a
                href={`https://x.com/${xHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)] flex items-center gap-1 pt-1 border-t border-[var(--nm-line)]"
              >
                <span>Official Account: {xHandle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
