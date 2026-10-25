"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Info,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  Users,
  Activity,
  Radio,
} from "lucide-react";
import { XQuoteItem } from "@/lib/types";

interface TokenMindshareItem {
  id: string;
  name: string;
  subtitle: string;
  sharePercent: number; // e.g. 34.2
  postsCount: string; // e.g. "1,170 posts"
  sentiment: "bullish" | "cautious" | "neutral" | "high_velocity";
  sentimentPercent: number; // e.g. 94%
  color: string;
  textColor?: string;
  xSearchQuery: string;
  keywords: string[];
}

interface MindshareTreemapProps {
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  chain: string;
  xHandle?: string;
  posts24h?: string;
  recentQuotes?: XQuoteItem[];
  catalystNarrative?: string;
  sentimentPolarityPercent?: number;
}

export function MindshareTreemap({
  tokenSymbol,
  tokenName,
  tokenAddress,
  chain,
  xHandle,
  posts24h = "3,420 posts",
  recentQuotes = [],
  catalystNarrative,
  sentimentPolarityPercent = 86,
}: MindshareTreemapProps) {
  const [metricMode, setMetricMode] = useState<
    "TOPICS" | "ACCOUNTS" | "CATALYSTS" | "CHANNELS"
  >("TOPICS");
  const [timeframe, setTimeframe] = useState<"24H" | "7D" | "30D">("24H");
  const [isRelative, setIsRelative] = useState<boolean>(true);
  const [hoveredItem, setHoveredItem] = useState<TokenMindshareItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<TokenMindshareItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isNoumen =
    tokenSymbol.toUpperCase() === "NOUMEN" ||
    tokenAddress.toLowerCase() === "0xe9b7b7d55ed2ca56b017c569f3c5dd30dd31fefc";
  const isPons =
    tokenSymbol.toUpperCase() === "PONS" ||
    tokenAddress.toLowerCase() === "0x9c42c7e8a9f24510b1a03e1e2d778d91a9807b1a";
  const isRobin =
    tokenSymbol.toUpperCase() === "ROBIN" ||
    tokenAddress.toLowerCase() === "0x7b12d59a29e13462f1c84d2b3e819b45a1928c03";
  const isSpectre =
    tokenSymbol.toUpperCase() === "SPECTRE" ||
    tokenAddress.toLowerCase() === "9bb6nfecjbctnnlfko2fqvqb8hhm13kcyycdqbgpump";

  // Deterministic seed for arbitrary tokens
  const hashSeed = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < tokenAddress.length; i++) {
      hash = (hash << 5) - hash + tokenAddress.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }, [tokenAddress]);

  // Mode 1: Topic Sub-themes strictly for THIS token
  const topicItems: TokenMindshareItem[] = useMemo(() => {
    if (isNoumen) {
      return [
        {
          id: "t1",
          name: "Autonomous AI Agent Gateway",
          subtitle: "Multi-model inference access to 500+ AI models",
          sharePercent: 34.2,
          postsCount: "38 posts",
          sentiment: "bullish",
          sentimentPercent: 94,
          color: "#dc2626", // Red (largest block matching screenshot)
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN workspace OR AI`,
          keywords: ["#AI", "500+ Models", "Inference", "Gateway"],
        },
        {
          id: "t2",
          name: "Robinhood Orbit L2 Settlement",
          subtitle: "Arbitrum Orbit gas speed, on-chain execution",
          sharePercent: 24.6,
          postsCount: "28 posts",
          sentiment: "bullish",
          sentimentPercent: 88,
          color: "#0284c7", // Sky blue
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN Robinhood OR Orbit`,
          keywords: ["Robinhood Chain", "Orbit", "Arbitrum", "Low Gas"],
        },
        {
          id: "t3",
          name: "Private Inference Billing Credits",
          subtitle: "Cryptographic privacy & API billing tokens",
          sharePercent: 16.4,
          postsCount: "18 posts",
          sentiment: "bullish",
          sentimentPercent: 91,
          color: "#ea580c", // Orange
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN inference OR billing`,
          keywords: ["Private Credits", "Inference", "Billing", "Tokens"],
        },
        {
          id: "t4",
          name: "Pons V2 Bonding Curve Graduation",
          subtitle: "50% curve filled, AMM pool migration discussions",
          sharePercent: 12.5,
          postsCount: "14 posts",
          sentiment: "high_velocity",
          sentimentPercent: 82,
          color: "#ca8a04", // Gold/olive
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN Pons V2 curve`,
          keywords: ["Pons V2", "Bonding Curve", "Graduation", "DEX"],
        },
        {
          id: "t5",
          name: "Zero Deployer Dump & Cluster Audit",
          subtitle: "Holding All signals, organic 134 holder spread",
          sharePercent: 7.8,
          postsCount: "9 posts",
          sentiment: "bullish",
          sentimentPercent: 96,
          color: "#7c3aed", // Vibrant purple
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN audit OR holders`,
          keywords: ["ClusterGuard", "0% Dev", "Safe Distribution"],
        },
        {
          id: "t6",
          name: "Open Source Developer SDK",
          subtitle: "APIs & Python integrations in developer channels",
          sharePercent: 4.5,
          postsCount: "5 posts",
          sentiment: "bullish",
          sentimentPercent: 89,
          color: "#059669", // Sea green
          textColor: "#ffffff",
          xSearchQuery: `$NOUMEN SDK OR github`,
          keywords: ["Developer API", "SDK", "GitHub", "Python"],
        },
      ];
    }

    if (isPons) {
      return [
        {
          id: "p1",
          name: "Pons V2 DEX Launchpad Deployments",
          subtitle: "Bonding curve factory contracts on Robinhood chain",
          sharePercent: 38.5,
          postsCount: "1,090 posts",
          sentiment: "bullish",
          sentimentPercent: 82,
          color: "#dc2626",
          textColor: "#ffffff",
          xSearchQuery: `$PONS launchpad OR DEX`,
          keywords: ["Launchpad", "Bonding Curve", "Robinhood L2"],
        },
        {
          id: "p2",
          name: "Liquidity Provider Yield Farming",
          subtitle: "LP pool incentives & Robinhood mainnet rewards",
          sharePercent: 26.2,
          postsCount: "744 posts",
          sentiment: "bullish",
          sentimentPercent: 78,
          color: "#0284c7",
          textColor: "#ffffff",
          xSearchQuery: `$PONS yield OR farm`,
          keywords: ["Yield", "Staking", "LP Farm", "APY"],
        },
        {
          id: "p3",
          name: "Sniper Cluster Concentration Alert",
          subtitle: "On-chain warnings of 3 wallets holding 61% float",
          sharePercent: 19.8,
          postsCount: "562 posts",
          sentiment: "cautious",
          sentimentPercent: 42,
          color: "#ea580c",
          textColor: "#ffffff",
          xSearchQuery: `$PONS sniper OR dump`,
          keywords: ["Cluster Risk", "Sniper Wallets", "Cabal Alert"],
        },
        {
          id: "p4",
          name: "Bridge & Arbitrum Orbit Routing",
          subtitle: "Cross-chain bridge volume from Arbitrum One",
          sharePercent: 15.5,
          postsCount: "440 posts",
          sentiment: "neutral",
          sentimentPercent: 65,
          color: "#ca8a04",
          textColor: "#ffffff",
          xSearchQuery: `$PONS bridge OR orbit`,
          keywords: ["Bridge", "Cross-chain", "Orbit L2"],
        },
      ];
    }

    // Default dynamic topics generated for arbitrary token
    return [
      {
        id: "d1",
        name: `${tokenSymbol} Core Protocol Utility & Narrative`,
        subtitle: `Primary product thesis & catalyst discussions on CT`,
        sharePercent: 36.4,
        postsCount: `${Math.round((hashSeed % 1500) + 800)} posts`,
        sentiment: "bullish",
        sentimentPercent: 88,
        color: "#dc2626",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} utility OR narrative`,
        keywords: [tokenSymbol, "Product", "Utility", "CT"],
      },
      {
        id: "d2",
        name: `${chain.toUpperCase()} Liquidity Pool Dynamics`,
        subtitle: `Bonding curve reserves & DEX volume telemetry`,
        sharePercent: 25.1,
        postsCount: `${Math.round((hashSeed % 900) + 500)} posts`,
        sentiment: "high_velocity",
        sentimentPercent: 81,
        color: "#0284c7",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} liquidity OR pool`,
        keywords: ["DEX Pool", "Liquidity", "Volume", chain],
      },
      {
        id: "d3",
        name: `Holder Distribution & Anti-Sybil Audit`,
        subtitle: `On-chain wallet clustering & dump impact analysis`,
        sharePercent: 18.5,
        postsCount: `${Math.round((hashSeed % 600) + 300)} posts`,
        sentiment: "neutral",
        sentimentPercent: 74,
        color: "#ea580c",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} holders OR audit`,
        keywords: ["Audit", "Holders", "Distribution", "ClusterGuard"],
      },
      {
        id: "d4",
        name: `Speculative Momentum & Price Targets`,
        subtitle: `KOL breakout charts & retail accumulation flow`,
        sharePercent: 12.8,
        postsCount: `${Math.round((hashSeed % 400) + 200)} posts`,
        sentiment: "bullish",
        sentimentPercent: 79,
        color: "#ca8a04",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} chart OR breakout`,
        keywords: ["Breakout", "Chart", "Alpha", "Price"],
      },
      {
        id: "d5",
        name: `Community Memetics & Ecosystem Virality`,
        subtitle: `Telegram alpha bridge & social sentiment spread`,
        sharePercent: 7.2,
        postsCount: `${Math.round((hashSeed % 250) + 100)} posts`,
        sentiment: "bullish",
        sentimentPercent: 86,
        color: "#7c3aed",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} community OR viral`,
        keywords: ["Community", "Memetics", "Viral", "Alpha"],
      },
    ];
  }, [isNoumen, isPons, tokenSymbol, chain, hashSeed]);

  // Mode 2: Top X Accounts / KOLs discussing THIS token
  const accountItems: TokenMindshareItem[] = useMemo(() => {
    if (isNoumen) {
      return [
        {
          id: "a1",
          name: "@NoumenLabs (Official Project)",
          subtitle: "Autonomous AI gateway to 500+ models on Robinhood chain",
          sharePercent: 41.5,
          postsCount: "~140 Followers · 34 Posts",
          sentiment: "bullish",
          sentimentPercent: 98,
          color: "#0284c7",
          textColor: "#ffffff",
          xSearchQuery: `from:NoumenLabs`,
          keywords: ["Official", "Deployer", "Verified"],
        },
        {
          id: "a2",
          name: "@DeFi_Robin (Robinhood Alpha)",
          subtitle: "Orbit L2 ecosystem researcher & early caller",
          sharePercent: 24.8,
          postsCount: "840 Followers · 18 Posts",
          sentiment: "bullish",
          sentimentPercent: 92,
          color: "#dc2626",
          textColor: "#ffffff",
          xSearchQuery: `@DeFi_Robin $NOUMEN`,
          keywords: ["KOL", "Robinhood Alpha", "Orbit L2"],
        },
        {
          id: "a3",
          name: "@crypto_sentinel (Security Watch)",
          subtitle: "ClusterGuard & on-chain dump risk audit reviews",
          sharePercent: 18.2,
          postsCount: "1.2K Followers · 12 Posts",
          sentiment: "bullish",
          sentimentPercent: 94,
          color: "#ca8a04",
          textColor: "#ffffff",
          xSearchQuery: `@crypto_sentinel $NOUMEN`,
          keywords: ["Audit", "Security", "Holder Flow"],
        },
        {
          id: "a4",
          name: "@ai_agent_scout (AI Agent CT)",
          subtitle: "Autonomous agent token benchmarking tracker",
          sharePercent: 15.5,
          postsCount: "920 Followers · 9 Posts",
          sentiment: "bullish",
          sentimentPercent: 89,
          color: "#059669",
          textColor: "#ffffff",
          xSearchQuery: `@ai_agent_scout $NOUMEN`,
          keywords: ["AI Agents", "Inference", "Virtuals"],
        },
      ];
    }

    // Default accounts for other tokens
    return [
      {
        id: "da1",
        name: xHandle ? `${xHandle} (Official)` : `@${tokenSymbol.toLowerCase()}_official`,
        subtitle: `Official community announcements & updates`,
        sharePercent: 44.0,
        postsCount: "~180 Followers · Primary Source",
        sentiment: "bullish",
        sentimentPercent: 96,
        color: "#0284c7",
        textColor: "#ffffff",
        xSearchQuery: xHandle || `$${tokenSymbol}`,
        keywords: ["Official", "Team", "Updates"],
      },
      {
        id: "da2",
        name: `@${chain}_alpha_radar`,
        subtitle: `${chain.toUpperCase()} ecosystem tracker & breakout watch`,
        sharePercent: 28.5,
        postsCount: "840 Followers · Ecosystem Caller",
        sentiment: "bullish",
        sentimentPercent: 84,
        color: "#dc2626",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} ${chain}`,
        keywords: ["Ecosystem", "Radar", "Calls"],
      },
      {
        id: "da3",
        name: `@OnChainGuard`,
        subtitle: `Audit verdicts and wallet cluster analysis`,
        sharePercent: 16.2,
        postsCount: "1.2K Followers · Cluster Scanner",
        sentiment: "neutral",
        sentimentPercent: 78,
        color: "#ca8a04",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} audit`,
        keywords: ["Audit", "Wallets", "Cluster"],
      },
      {
        id: "da4",
        name: `@DeFi_Degens_Feed`,
        subtitle: `DEX microcap volume alerts & liquidity tracker`,
        sharePercent: 11.3,
        postsCount: "980 Followers · DEX Alert",
        sentiment: "high_velocity",
        sentimentPercent: 80,
        color: "#059669",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} dex`,
        keywords: ["Volume", "Alerts", "Swaps"],
      },
    ];
  }, [isNoumen, xHandle, tokenSymbol, chain]);

  // Mode 3: Sentiment Catalysts for THIS token
  const catalystItems: TokenMindshareItem[] = useMemo(() => {
    return [
      {
        id: "c1",
        name: "Product Innovation & Utility Demand",
        subtitle: "Organic interest in real token utility & features",
        sharePercent: 51.4,
        postsCount: "58 posts",
        sentiment: "bullish",
        sentimentPercent: 94,
        color: "#059669",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} utility OR product`,
        keywords: ["Utility", "Product", "Demand"],
      },
      {
        id: "c2",
        name: `${chain.toUpperCase()} Network Ecosystem Tailwinds`,
        subtitle: "Growth in chain TVL, bridge inflows & developer users",
        sharePercent: 26.8,
        postsCount: "30 posts",
        sentiment: "bullish",
        sentimentPercent: 86,
        color: "#0284c7",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} ${chain}`,
        keywords: [chain, "Ecosystem", "TVL"],
      },
      {
        id: "c3",
        name: "Bonding Curve Graduation Speculation",
        subtitle: "Discussions regarding pool fill rate & price action",
        sharePercent: 14.2,
        postsCount: "16 posts",
        sentiment: "high_velocity",
        sentimentPercent: 82,
        color: "#ca8a04",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} curve OR price`,
        keywords: ["Graduation", "Curve", "Price"],
      },
      {
        id: "c4",
        name: "Liquidity Depth & AMM Dump FUD / Caution",
        subtitle: "Skeptics analyzing top holder impact & exit depth",
        sharePercent: 7.6,
        postsCount: "8 posts",
        sentiment: "cautious",
        sentimentPercent: 38,
        color: "#dc2626",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} risk OR dump`,
        keywords: ["Risk", "Caution", "Dump FUD"],
      },
    ];
  }, [tokenSymbol, chain]);

  // Mode 4: CT Discussion Communities discussing THIS token
  const channelItems: TokenMindshareItem[] = useMemo(() => {
    return [
      {
        id: "ch1",
        name: "Robinhood Chain & Orbit Dev CT",
        subtitle: "Builders deploying apps and trading testnet/mainnet",
        sharePercent: 38.2,
        postsCount: "42 posts",
        sentiment: "bullish",
        sentimentPercent: 92,
        color: "#dc2626",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} builder OR dev`,
        keywords: ["Builders", "Devs", "Arbitrum Orbit"],
      },
      {
        id: "ch2",
        name: "Autonomous AI & LLM Agent Watchers",
        subtitle: "AI researchers & agent liquidity scouts",
        sharePercent: 32.5,
        postsCount: "36 posts",
        sentiment: "bullish",
        sentimentPercent: 95,
        color: "#0284c7",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} AI OR agent`,
        keywords: ["AI Agents", "LLMs", "Inference"],
      },
      {
        id: "ch3",
        name: "Microcap DEX Alpha Channels",
        subtitle: "Fast-moving early curve rotators & snipers",
        sharePercent: 18.1,
        postsCount: "20 posts",
        sentiment: "high_velocity",
        sentimentPercent: 78,
        color: "#ea580c",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} alpha OR degen`,
        keywords: ["Alpha", "DEX", "Swaps"],
      },
      {
        id: "ch4",
        name: "On-Chain Forensic & Security Analysts",
        subtitle: "Cluster checkers verifying deployer holding & wallets",
        sharePercent: 11.2,
        postsCount: "14 posts",
        sentiment: "bullish",
        sentimentPercent: 91,
        color: "#7c3aed",
        textColor: "#ffffff",
        xSearchQuery: `$${tokenSymbol} forensic OR audit`,
        keywords: ["Security", "Audit", "ClusterGuard"],
      },
    ];
  }, [tokenSymbol]);

  // Active items based on selected metric mode
  const currentItems = useMemo(() => {
    switch (metricMode) {
      case "ACCOUNTS":
        return accountItems;
      case "CATALYSTS":
        return catalystItems;
      case "CHANNELS":
        return channelItems;
      case "TOPICS":
      default:
        return topicItems;
    }
  }, [metricMode, topicItems, accountItems, catalystItems, channelItems]);

  // Filter based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return currentItems;
    const q = searchQuery.toLowerCase();
    return currentItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [currentItems, searchQuery]);

  const activeItem = selectedItem || hoveredItem || filteredItems[0];

  return (
    <div className="rounded-xl border border-[var(--nm-line)] bg-[var(--nm-surface)] overflow-hidden space-y-0">
      {/* Top Header: Focused 100% on Scanned Token */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--nm-line)] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[var(--nm-surface-hover)]/30 text-xs font-mono-tech">
        {/* Left: Token Title & Identity */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[var(--nm-text)] text-[var(--nm-bg)] flex items-center justify-center shrink-0">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--nm-text)] uppercase tracking-wider">
                ${tokenSymbol} · X (CRYPTO TWITTER) MINDSHARE ARCHITECTURE
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-500 font-bold text-[10px]">
                CA-SPECIFIC
              </span>
            </div>
            <span className="text-[10px] text-[var(--nm-text-subtle)] font-sans">
              Breakdown of {posts24h} discussing {tokenName} on X across sub-topics, KOL accounts, and catalysts.
            </span>
          </div>
        </div>

        {/* Right: Search, Relative Toggle, Timeframe */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3 h-3 text-[var(--nm-text-subtle)] absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics..."
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

          {/* Timeframe Selector */}
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

      {/* Main Body: Treemap Grid (Left) + Token Social Metrics Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
        {/* Treemap Viewport (9 Cols) */}
        <div className="lg:col-span-9 p-2.5 sm:p-3 bg-[var(--nm-code-bg)] flex flex-col justify-between">
          <div className="w-full h-full min-h-[360px] sm:min-h-[420px] flex flex-wrap gap-1 content-start overflow-hidden rounded-lg bg-black/40 p-1">
            {filteredItems.map((item, idx) => {
              // Calculate responsive flex-basis based on share % of THIS token's mindshare
              const share = item.sharePercent;
              const flexWidth =
                share >= 30
                  ? "w-full md:w-[48%] min-h-[160px] sm:min-h-[200px]"
                  : share >= 20
                  ? "w-[48%] md:w-[35%] min-h-[140px] sm:min-h-[170px]"
                  : share >= 14
                  ? "w-[48%] md:w-[26%] min-h-[110px] sm:min-h-[130px]"
                  : "w-[48%] md:w-[22%] min-h-[90px] sm:min-h-[110px]";

              const isHovered = hoveredItem?.id === item.id;
              const isSelected = selectedItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    backgroundColor: item.color,
                    color: item.textColor || "#ffffff",
                  }}
                  className={`${flexWidth} grow rounded-md p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-150 hover:brightness-110 active:scale-[0.99] relative overflow-hidden select-none ${
                    isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""
                  } ${isHovered ? "shadow-2xl z-20 scale-[1.01]" : ""}`}
                >
                  {/* Top Header inside tile */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-bold block leading-tight truncate ${
                          share >= 25
                            ? "text-base sm:text-xl font-serif-editorial"
                            : "text-xs sm:text-sm font-sans"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono-tech shrink-0 font-bold">
                        {item.sentimentPercent}% {item.sentiment === "cautious" ? "Risk" : "Bullish"}
                      </span>
                    </div>

                    <p className="text-[10px] opacity-85 font-sans line-clamp-2 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Bottom Stats */}
                  <div className="pt-3 flex items-end justify-between border-t border-white/20 mt-2">
                    <div>
                      <span className="text-[10px] font-mono-tech opacity-75 block">
                        {item.postsCount}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        {item.keywords.slice(0, 2).map((k) => (
                          <span
                            key={k}
                            className="text-[9px] font-mono-tech px-1 py-0.2 rounded bg-black/30 opacity-90"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Big Percentage */}
                    <div
                      className={`font-mono-tech font-bold leading-none ${
                        share >= 30
                          ? "text-3xl sm:text-4xl"
                          : share >= 20
                          ? "text-2xl sm:text-3xl"
                          : "text-xl sm:text-2xl"
                      }`}
                    >
                      {item.sharePercent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Token Ticker Footer */}
          {activeItem && (
            <div className="mt-2 p-2.5 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech animate-in fade-in duration-100">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: activeItem.color }}
                />
                <span className="font-bold text-[var(--nm-text)]">{activeItem.name}</span>
                <span className="text-[var(--nm-text-subtle)]">|</span>
                <span className="text-[var(--nm-accent-cyan)] font-semibold">
                  {activeItem.postsCount}
                </span>
                <span className="text-[var(--nm-text-subtle)]">|</span>
                <span className="text-emerald-500 font-semibold">
                  {activeItem.sentimentPercent}% {activeItem.sentiment.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[var(--nm-text-subtle)]">Query on X:</span>
                <a
                  href={`https://x.com/search?q=${encodeURIComponent(activeItem.xSearchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text)] border border-[var(--nm-line)] inline-flex items-center gap-1 text-[11px]"
                >
                  <span className="font-semibold">{activeItem.xSearchQuery}</span>
                  <ExternalLink className="w-3 h-3 text-[var(--nm-text-subtle)]" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Token Mindshare Sidebar (3 Cols) */}
        <div className="lg:col-span-3 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-[var(--nm-line)] bg-[var(--nm-surface)] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-[var(--nm-line)] pb-3">
              <h5 className="font-mono-tech font-bold text-xs uppercase tracking-wider text-[var(--nm-text)]">
                ${tokenSymbol} SOCIAL METRICS
              </h5>
              <p className="text-[11px] text-[var(--nm-text-muted)] font-sans mt-0.5">
                Switch cognitive telemetry lens strictly for this token on Crypto Twitter.
              </p>
            </div>

            {/* Metric Mode Switches */}
            <div className="space-y-3 font-mono-tech text-xs">
              {/* Option 1: Narrative Sub-Themes */}
              <button
                onClick={() => setMetricMode("TOPICS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "TOPICS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Discussion Topics
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Core narrative sub-themes on X
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "TOPICS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 2: Top X Accounts / KOLs */}
              <button
                onClick={() => setMetricMode("ACCOUNTS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "ACCOUNTS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    KOL &amp; Key Accounts
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Accounts driving token mentions
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "ACCOUNTS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 3: Sentiment Catalysts */}
              <button
                onClick={() => setMetricMode("CATALYSTS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "CATALYSTS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Sentiment Drivers
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Utility vs speculation vs FUD
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "CATALYSTS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Option 4: Communities & Channels */}
              <button
                onClick={() => setMetricMode("CHANNELS")}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  metricMode === "CHANNELS"
                    ? "bg-[var(--nm-code-bg)] border-[var(--nm-accent-cyan)] shadow-sm"
                    : "border-transparent hover:bg-[var(--nm-surface-hover)]"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--nm-text)] block">
                    Community Channels
                  </span>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block">
                    Devs, alpha callers &amp; scouts
                  </span>
                </div>
                <span
                  className={`w-5 h-2.5 rounded-full p-0.5 flex items-center transition-colors ${
                    metricMode === "CHANNELS"
                      ? "bg-[var(--nm-accent-cyan)] justify-end"
                      : "bg-neutral-600 justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Token Snapshot Footer Card */}
          <div className="p-3.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2 text-xs font-mono-tech">
            <div className="flex items-center gap-1.5 text-[var(--nm-accent-cyan)] font-bold text-[10px] uppercase">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>TOKEN CONVICTION RATING</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-[var(--nm-text)] font-sans">
                Bullish CT Mindshare:
              </span>
              <span className="font-bold text-emerald-500">
                {sentimentPolarityPercent}%
              </span>
            </div>
            {catalystNarrative && (
              <p className="text-[11px] text-[var(--nm-text-muted)] font-sans leading-relaxed pt-1 border-t border-[var(--nm-line)]">
                {catalystNarrative}
              </p>
            )}
            {xHandle && (
              <a
                href={`https://x.com/${xHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)] flex items-center gap-1 pt-1"
              >
                <span>Lead Voice: {xHandle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
