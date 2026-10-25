"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Terminal,
  Search,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Zap,
  TrendingDown,
  Layers,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import VeniceLogo from "@/components/VeniceLogo";
import Footer from "@/components/Footer";
import {
  scanContractAddress,
  detectChainFromAddress,
  PRESET_SCAN_TARGETS,
} from "@/lib/scanner";
import { ChainNetwork, ClusterScanResult } from "@/lib/types";

export default function ScannerPage() {
  const [selectedChain, setSelectedChain] = useState<ChainNetwork>("robinhood");
  const [addressInput, setAddressInput] = useState<string>("0x9c42c7e8a9f24510b1a03e1e2d778d91a9807b1a");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [result, setResult] = useState<ClusterScanResult | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const CRAWL_STEPS = [
    "Reading on-chain contract & DEX liquidity pool...",
    "Crawling top 100 token holder balances...",
    "Tracing gas dispersers & first inbound funding transactions...",
    "Executing graph clustering algorithm & sybil mapping...",
    "Cross-referencing Lince social mindshare velocity...",
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const executeScan = (targetAddr: string, chainHint?: ChainNetwork) => {
    const addr = targetAddr.trim();
    if (!addr) return;

    setIsScanning(true);
    setScanStep(0);
    setResult(null);

    // Simulate multi-stage graph crawler progression
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < CRAWL_STEPS.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        const scanRes = scanContractAddress(addr, chainHint || selectedChain);
        setResult(scanRes);
        setIsScanning(false);
      }
    }, 280);
  };

  // Initial scan on mount
  useEffect(() => {
    executeScan("0x9c42c7e8a9f24510b1a03e1e2d778d91a9807b1a", "robinhood");
  }, []);

  const handleSelectPreset = (preset: (typeof PRESET_SCAN_TARGETS)[0]) => {
    setSelectedChain(preset.chain);
    setAddressInput(preset.address);
    executeScan(preset.address, preset.chain);
  };

  return (
    <div className="min-h-screen bg-[var(--nm-bg)] text-[var(--nm-text)] flex flex-col font-sans selection:bg-[var(--nm-action)] selection:text-[var(--nm-action-text)] transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--nm-line)] bg-[var(--nm-surface)]/95 backdrop-blur-md px-4 sm:px-6 h-14 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] transition-colors"
            title="Return to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--nm-bg)] border border-[var(--nm-line)] overflow-hidden shrink-0 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Lince Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-tech font-bold text-sm tracking-[0.2em] text-[var(--nm-text)]">
                LINCE
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.14em] text-[var(--nm-accent-cyan)] font-semibold hidden sm:inline">
                / CLUSTERGUARD
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-[var(--nm-text-muted)]">
          <Link href="/" className="hover:text-[var(--nm-text)] transition-colors">
            Home
          </Link>
          <Link href="/scanner" className="text-[var(--nm-text)] font-semibold transition-colors">
            ClusterGuard
          </Link>
          <Link href="/how-it-works" className="hover:text-[var(--nm-text)] transition-colors">
            How it works
          </Link>
          <Link href="/docs" className="hover:text-[var(--nm-text)] transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans transition-all active:scale-95 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </Link>
        </div>
      </header>

      {/* Main Scanner Section */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-10">
        {/* Header Kicker */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-cyan)] animate-pulse" />
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
              [ ON-CHAIN SYBIL &amp; CABAL CLUSTERGUARD ]
            </span>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.06]">
            Detect hidden wallet syndicates &amp; supply concentration.
          </h1>

          <p className="text-sm sm:text-base text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Don&apos;t be fooled by high holder counts. Lince crawls the top 100 holders, traces common gas dispersers, and maps out coordinated wallet clusters across Robinhood Chain (Pons &amp; Flap), Solana, Base, and Ethereum.
          </p>
        </div>

        {/* Scanner Control Box */}
        <div className="p-5 sm:p-7 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] shadow-sm space-y-5">
          {/* Chain Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech">
            <span className="text-[11px] text-[var(--nm-text-subtle)] mr-1">NETWORK:</span>

            <button
              onClick={() => setSelectedChain("robinhood")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChain === "robinhood"
                  ? "bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] font-bold"
                  : "bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text-muted)]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Robinhood Chain (Pons / Flap)</span>
            </button>

            <button
              onClick={() => setSelectedChain("solana")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChain === "solana"
                  ? "bg-purple-500/15 border border-purple-500/40 text-purple-600 dark:text-purple-300 font-bold"
                  : "bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text-muted)]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Solana (pump.fun / Raydium)</span>
            </button>

            <button
              onClick={() => setSelectedChain("base")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChain === "base"
                  ? "bg-blue-500/15 border border-blue-500/40 text-blue-600 dark:text-blue-300 font-bold"
                  : "bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text-muted)]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Base (Aerodrome / Uniswap)</span>
            </button>

            <button
              onClick={() => setSelectedChain("ethereum")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChain === "ethereum"
                  ? "bg-zinc-500/15 border border-zinc-500/40 text-[var(--nm-text)] font-bold"
                  : "bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text-muted)]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span>Ethereum</span>
            </button>
          </div>

          {/* Search Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeScan(addressInput);
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--nm-text-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Paste token contract address (e.g. 0x9c42c7... or ...pump)"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-xs sm:text-sm font-mono-tech text-[var(--nm-text)] placeholder-[var(--nm-text-subtle)] focus:outline-none focus:border-[var(--nm-accent-cyan)]"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning || !addressInput.trim()}
              className="px-6 py-3 rounded-lg bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] disabled:opacity-40 text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[var(--nm-accent-cyan)]" />
                  <span>Crawling Wallets...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Scan Contract</span>
                </>
              )}
            </button>
          </form>

          {/* Presets Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono-tech">
            <span className="text-[11px] text-[var(--nm-text-subtle)] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--nm-accent-amber)]" /> PRESETS:
            </span>
            {PRESET_SCAN_TARGETS.map((p) => (
              <button
                key={p.address}
                onClick={() => handleSelectPreset(p)}
                className="px-2.5 py-1 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[11px] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)] transition-colors cursor-pointer"
              >
                ${p.symbol} ({p.tag})
              </button>
            ))}
          </div>
        </div>

        {/* Crawling Progress Status Bar */}
        {isScanning && (
          <div className="p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-accent-cyan)]/30 animate-pulse space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[var(--nm-accent-cyan)] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--nm-accent-cyan)] animate-ping" />
                STAGE {scanStep + 1} OF {CRAWL_STEPS.length}: {CRAWL_STEPS[scanStep]}
              </span>
              <span className="text-[var(--nm-text-subtle)]">{Math.round(((scanStep + 1) / CRAWL_STEPS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--nm-code-bg)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--nm-accent-cyan)] transition-all duration-300"
                style={{ width: `${((scanStep + 1) / CRAWL_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Scan Results Canvas */}
        {result && !isScanning && (
          <div className="space-y-6">
            {/* Master Verdict Card */}
            <div
              className={`p-6 sm:p-8 rounded-xl border transition-all shadow-sm ${
                result.verdict === "DANGER"
                  ? "bg-rose-500/5 border-rose-500/30"
                  : result.verdict === "ELEVATED"
                  ? "bg-amber-500/5 border-amber-500/30"
                  : "bg-emerald-500/5 border-emerald-500/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--nm-line)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold uppercase tracking-wider ${
                        result.verdict === "DANGER"
                          ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          : result.verdict === "ELEVATED"
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      VERDICT: {result.verdict} ({result.riskScore}/100 RISK)
                    </span>

                    <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                      {result.chain.toUpperCase()} · {result.launchpad || "DEX POOL"}
                    </span>
                  </div>

                  <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--nm-text)] leading-tight mb-1">
                    {result.verdictHeadline}
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed max-w-2xl">
                    {result.verdictDescription}
                  </p>
                </div>

                {/* Token identity & CA copy */}
                <div className="p-3.5 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] shrink-0 space-y-1 text-xs font-mono-tech">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-[var(--nm-text)] text-sm">${result.tokenSymbol}</span>
                    <span className="text-[var(--nm-text-subtle)]">{result.priceUsd}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--nm-text-muted)] pt-1">
                    <span className="truncate max-w-[140px]">{result.tokenAddress}</span>
                    <button
                      onClick={() => handleCopy(result.tokenAddress, "ca")}
                      className="p-1 hover:text-[var(--nm-text)] cursor-pointer"
                      title="Copy CA"
                    >
                      {copiedText === "ca" ? <Check className="w-3 h-3 text-[var(--nm-accent-emerald)]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Core Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <div className="p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    REAL OPERATORS
                  </span>
                  <div className="font-mono-tech text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.realOperatorsCount} <span className="text-xs font-normal text-[var(--nm-text-subtle)]">entities</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-rose-500 font-semibold">
                    Sybil Ratio: {result.sybilRatio}%
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    CABAL CONCENTRATION
                  </span>
                  <div className="font-mono-tech text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.cabalConcentrationPercent}%
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    of total supply in clusters
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    POTENTIAL RUG DROP
                  </span>
                  <div className="font-mono-tech text-2xl font-bold text-rose-500 my-1">
                    -{result.potentialRugDropPercent}%
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    estimated impact on DEX liq
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    ON-CHAIN LIQUIDITY
                  </span>
                  <div className="font-mono-tech text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.liquidityUsd}
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    MCAP: {result.marketCap}
                  </span>
                </div>
              </div>
            </div>

            {/* Lince Social Mindshare Cross-Correlation (Lince Unique Advantage) */}
            {result.socialMindshareCorrelated && (
              <div className="p-5 sm:p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="font-bold text-[var(--nm-text)] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
                    LINCE SOCIAL MINDSHARE CORRELATION
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)]">
                    MULTI-PLATFORM TELEMETRY
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                  <p className="text-[var(--nm-text-muted)] font-sans leading-relaxed">
                    {result.socialMindshareCorrelated.warningNote}
                  </p>
                  <Link
                    href={`/terminal`}
                    className="shrink-0 px-3 py-1.5 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Analyze in Copilot</span>
                    <Terminal className="w-3 h-3 text-[var(--nm-accent-cyan)]" />
                  </Link>
                </div>
              </div>
            )}

            {/* Identified Wallet Clusters Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="font-bold uppercase tracking-wider text-[var(--nm-text)]">
                  IDENTIFIED WALLET CLUSTERS ({result.clusters.length})
                </span>
                <span className="text-[var(--nm-text-subtle)]">
                  CRAWLED AT: {result.scannedAt}
                </span>
              </div>

              <div className="space-y-4">
                {result.clusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    className="p-5 sm:p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--nm-line)]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif-editorial text-xl text-[var(--nm-text)]">
                            {cluster.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono-tech font-bold px-2 py-0.2 rounded ${
                              cluster.riskTag === "CRITICAL_CONCENTRATION"
                                ? "bg-rose-500/10 text-rose-500"
                                : cluster.riskTag === "SUSPICIOUS_FUNDING"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-emerald-500/10 text-emerald-500"
                            }`}
                          >
                            {cluster.riskTag.replace("_", " ")}
                          </span>
                        </div>
                        <div className="text-xs font-mono-tech text-[var(--nm-text-subtle)] mt-1">
                          Common Funder: <code className="text-[var(--nm-text)]">{cluster.funderAddress}</code>
                        </div>
                      </div>

                      <div className="text-right font-mono-tech text-xs">
                        <span className="text-base font-bold text-[var(--nm-text)] block">
                          {cluster.totalSupplyPercent}% Supply
                        </span>
                        <span className="text-[11px] text-[var(--nm-text-subtle)]">
                          {cluster.walletCount} Linked Wallets · {cluster.estimatedValue}
                        </span>
                      </div>
                    </div>

                    {/* Member Wallets Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono-tech">
                        <thead className="text-[10px] uppercase text-[var(--nm-text-subtle)] border-b border-[var(--nm-line)]">
                          <tr>
                            <th className="pb-2">WALLET ADDRESS</th>
                            <th className="pb-2">SUPPLY %</th>
                            <th className="pb-2">FIRST FUNDED</th>
                            <th className="pb-2 text-right">FUNDING ORIGIN TX</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--nm-line)]">
                          {cluster.wallets.map((w, idx) => (
                            <tr key={idx} className="hover:bg-[var(--nm-surface-hover)]">
                              <td className="py-2.5 font-semibold text-[var(--nm-text)] flex items-center gap-1.5">
                                <span>{w.address}</span>
                                {w.isDevWallet && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-500 text-[10px]">
                                    DEPLOYER
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 font-bold text-[var(--nm-accent-emerald)]">
                                {w.sharePercent}%
                              </td>
                              <td className="py-2.5 text-[var(--nm-text-muted)]">{w.firstFundedAt}</td>
                              <td className="py-2.5 text-right text-[var(--nm-text-subtle)]">
                                {w.fundingTx}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
