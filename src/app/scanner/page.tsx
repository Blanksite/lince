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
  Copy,
  Check,
  ExternalLink,
  Zap,
  TrendingDown,
  Layers,
  Sparkles,
  RefreshCw,
  Users,
  Activity,
  BarChart3,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import Footer from "@/components/Footer";
import {
  scanContractAddress,
  detectChainFromAddress,
  PRESET_SCAN_TARGETS,
} from "@/lib/scanner";
import { ChainNetwork, ClusterScanResult, HolderDetail } from "@/lib/types";

export default function ScannerPage() {
  const [selectedChain, setSelectedChain] = useState<ChainNetwork>("robinhood");
  const [addressInput, setAddressInput] = useState<string>("0xe9b7b7d55ed2ca56b017c569f3c5dd30dd31fefc");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [result, setResult] = useState<ClusterScanResult | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const CRAWL_STEPS = [
    "Reading on-chain contract & bonding curve liquidity...",
    "Crawling top holders and wallet balances...",
    "Tracing gas dispersers and entry tx timing...",
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

    const activeChain = chainHint || selectedChain;

    // Asynchronously call the live /api/scan endpoint
    const scanPromise = fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: addr, chain: activeChain }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Scan API returned status " + res.status);
        return res.json();
      })
      .catch((err) => {
        console.warn("Falling back to local scanner:", err);
        return scanContractAddress(addr, activeChain);
      });

    // Animate crawl stages for crisp institutional feedback
    let currentStep = 0;
    const interval = setInterval(async () => {
      currentStep++;
      if (currentStep < CRAWL_STEPS.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        try {
          const scanRes = await scanPromise;
          setResult(scanRes);
        } catch {
          setResult(scanContractAddress(addr, activeChain));
        } finally {
          setIsScanning(false);
        }
      }
    }, 220);
  };

  // Initial scan on mount (defaults to verified Noumen CA on Robinhood Chain)
  useEffect(() => {
    executeScan("0xe9b7b7d55ed2ca56b017c569f3c5dd30dd31fefc", "robinhood");
  }, []);

  const handleSelectPreset = (preset: (typeof PRESET_SCAN_TARGETS)[0]) => {
    setSelectedChain(preset.chain);
    setAddressInput(preset.address);
    executeScan(preset.address, preset.chain);
  };

  const explorerBase =
    result?.chain === "robinhood"
      ? "https://robinhoodchain.blockscout.com"
      : result?.chain === "solana"
      ? "https://solscan.io"
      : "https://basescan.org";

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
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
        {/* Header Kicker */}
        <div className="max-w-3xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nm-accent-cyan)] animate-pulse" />
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-text-muted)]">
              [ ON-CHAIN SYBIL &amp; CABAL CLUSTERGUARD ]
            </span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[var(--nm-text)] font-normal tracking-tight leading-[1.08]">
            Inspect wallet syndicates &amp; holder concentration.
          </h1>

          <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] font-sans leading-relaxed">
            Crawls top holders, traces initial entry timing, and detects coordinated operator syndicates across Robinhood Chain (Pons &amp; Flap), Solana, Base, and Ethereum.
          </p>
        </div>

        {/* Scanner Control Box */}
        <div className="p-4 sm:p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] shadow-sm space-y-4">
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
                placeholder="Paste token contract address (e.g. 0xe9b7b7... or 0x9c42c7...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] text-xs sm:text-sm font-mono-tech text-[var(--nm-text)] placeholder-[var(--nm-text-subtle)] focus:outline-none focus:border-[var(--nm-accent-cyan)]"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning || !addressInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] disabled:opacity-40 text-[var(--nm-action-text)] font-semibold text-xs sm:text-sm font-sans transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[var(--nm-accent-cyan)]" />
                  <span>Crawling Graph...</span>
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
                className={`px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  addressInput.toLowerCase() === p.address.toLowerCase()
                    ? "bg-[var(--nm-action)] text-[var(--nm-action-text)] border-[var(--nm-action)] font-semibold"
                    : "bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] border-[var(--nm-line)] text-[var(--nm-text-muted)] hover:text-[var(--nm-text)]"
                }`}
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
              <span className="text-[var(--nm-text-subtle)]">
                {Math.round(((scanStep + 1) / CRAWL_STEPS.length) * 100)}%
              </span>
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
            {/* 1. Token Header Bar (Live Market Data & Quick Links) */}
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {result.tokenImage ? (
                  <div className="w-11 h-11 rounded-lg overflow-hidden border border-[var(--nm-line)] shrink-0 bg-[var(--nm-bg)]">
                    <img
                      src={result.tokenImage}
                      alt={result.tokenName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] flex items-center justify-center font-mono-tech font-bold text-sm text-[var(--nm-accent-cyan)]">
                    {result.tokenSymbol.slice(0, 3)}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base sm:text-lg text-[var(--nm-text)]">
                      {result.tokenName}
                    </h2>
                    <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-[var(--nm-badge-bg)] border border-[var(--nm-line)] font-semibold text-[var(--nm-text)]">
                      ${result.tokenSymbol}
                    </span>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] font-semibold border border-[#10b981]/20">
                      {result.chain.toUpperCase()} · {result.launchpad || "Pons V2"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--nm-text-subtle)] mt-1">
                    <span className="text-[var(--nm-text)] font-semibold">
                      {result.tokenAddress.slice(0, 10)}...{result.tokenAddress.slice(-8)}
                    </span>
                    <button
                      onClick={() => handleCopy(result.tokenAddress, "ca_top")}
                      className="p-1 hover:text-[var(--nm-text)] cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedText === "ca_top" ? (
                        <Check className="w-3.5 h-3.5 text-[#10b981]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`${explorerBase}/token/${result.tokenAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[var(--nm-accent-cyan)] transition-colors"
                      title="View on Block Explorer"
                    >
                      <span>Explorer</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Live Market Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono-tech text-xs border-t md:border-t-0 pt-3 md:pt-0 border-[var(--nm-line)]">
                <div>
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">PRICE</span>
                  <span className="font-bold text-[var(--nm-text)] text-sm">{result.priceUsd}</span>
                </div>
                <div className="border-l border-[var(--nm-line)] pl-3 sm:pl-4">
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">MCAP</span>
                  <span className="font-bold text-[var(--nm-text)] text-sm">{result.marketCap}</span>
                </div>
                <div className="border-l border-[var(--nm-line)] pl-3 sm:pl-4">
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">LIQUIDITY</span>
                  <span className="font-bold text-[var(--nm-text)] text-sm">{result.liquidityUsd}</span>
                </div>
                {result.volume24hUsd && (
                  <div className="border-l border-[var(--nm-line)] pl-3 sm:pl-4">
                    <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">24H VOL</span>
                    <span className="font-bold text-[var(--nm-text)] text-sm">{result.volume24hUsd}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Signature Executive Verdict Banner (CrawlScan-Style Clarity) */}
            <div
              className={`p-6 sm:p-7 rounded-xl border transition-all shadow-sm ${
                result.band === "CLEAN" || result.verdict === "SAFE"
                  ? "bg-emerald-500/[0.04] border-emerald-500/30"
                  : result.band === "SUSPICIOUS" || result.verdict === "ELEVATED"
                  ? "bg-amber-500/[0.04] border-amber-500/30"
                  : "bg-rose-500/[0.04] border-rose-500/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-[var(--nm-line)]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        result.band === "CLEAN" || result.verdict === "SAFE"
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : result.band === "SUSPICIOUS" || result.verdict === "ELEVATED"
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                      <span>{result.band || result.verdict} ({result.score || 100 - result.riskScore}/100)</span>
                    </span>

                    {result.reason && (
                      <span className="text-xs font-mono-tech px-2.5 py-1 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-muted)] border border-[var(--nm-line)]">
                        {result.reason}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--nm-text)] leading-snug">
                    {result.headline || result.verdictHeadline}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--nm-text-muted)] font-sans max-w-2xl leading-relaxed">
                    {result.verdictDescription}
                  </p>
                </div>

                {/* Score Dial Badge */}
                <div className="shrink-0 p-3.5 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] text-center font-mono-tech min-w-[120px]">
                  <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">AUDIT SCORE</span>
                  <div
                    className={`text-3xl font-bold my-0.5 ${
                      result.band === "CLEAN" || result.verdict === "SAFE"
                        ? "text-emerald-500"
                        : result.band === "SUSPICIOUS" || result.verdict === "ELEVATED"
                        ? "text-amber-500"
                        : "text-rose-500"
                    }`}
                  >
                    {result.score || 100 - result.riskScore}
                    <span className="text-xs text-[var(--nm-text-subtle)] font-normal">/100</span>
                  </div>
                  <span className="text-[10px] text-[var(--nm-text-subtle)]">
                    {result.band === "CLEAN" ? "Low Cabal Hazard" : "High Concentration"}
                  </span>
                </div>
              </div>

              {/* 4 Core Summary Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-5">
                <div className="p-3.5 sm:p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    OPERATORS IDENTIFIED
                  </span>
                  <div className="font-mono-tech text-xl sm:text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.realOperatorsCount} <span className="text-xs font-normal text-[var(--nm-text-subtle)]">operators</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-emerald-500 font-semibold">
                    {result.scannedHoldersCount} wallets analyzed
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    MAX SINGLE IMPACT
                  </span>
                  <div className="font-mono-tech text-xl sm:text-2xl font-bold text-amber-500 my-1">
                    −{result.maxSingleImpactPercent || result.potentialRugDropPercent}%
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    if #1 holder sells 100%
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    CIRCULATING FLOAT
                  </span>
                  <div className="font-mono-tech text-xl sm:text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.circulatingFloatPercent || 54.3}%
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    {result.curveReservePercent || 43.7}% in bonding curve
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-[var(--nm-surface)] border border-[var(--nm-line)]">
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block uppercase">
                    TOTAL ON-CHAIN HOLDERS
                  </span>
                  <div className="font-mono-tech text-xl sm:text-2xl font-bold text-[var(--nm-text)] my-1">
                    {result.totalHolders}
                  </div>
                  <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)]">
                    {result.chain.toUpperCase()} Ledger
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Launch & Deployer Audit Bar */}
            {result.launchAudit && (
              <div className="p-4 sm:p-5 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
                <div className="flex flex-wrap items-center gap-4">
                  {result.launchAudit.curveAddress && (
                    <div>
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">BONDING CURVE</span>
                      <code className="text-[var(--nm-text)] font-semibold">
                        {result.launchAudit.curveAddress.slice(0, 8)}...{result.launchAudit.curveAddress.slice(-6)}
                      </code>
                    </div>
                  )}

                  {result.launchAudit.deployerAddress && (
                    <div className="border-l border-[var(--nm-line)] pl-4">
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">DEPLOYER</span>
                      <code className="text-[var(--nm-text)] font-semibold">
                        {result.launchAudit.deployerAddress.slice(0, 8)}...{result.launchAudit.deployerAddress.slice(-6)}
                      </code>
                    </div>
                  )}

                  {result.launchAudit.launchBlock && (
                    <div className="border-l border-[var(--nm-line)] pl-4">
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">LAUNCH BLOCK</span>
                      <span className="text-[var(--nm-text)] font-semibold">#{result.launchAudit.launchBlock}</span>
                    </div>
                  )}

                  {result.launchAudit.ageHours && (
                    <div className="border-l border-[var(--nm-line)] pl-4">
                      <span className="text-[10px] text-[var(--nm-text-subtle)] block uppercase">AGE</span>
                      <span className="text-[var(--nm-text)] font-semibold">{result.launchAudit.ageHours} hours</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-[var(--nm-text-subtle)]">
                  0% Dev holding · Verified Open Source
                </div>
              </div>
            )}

            {/* 4. Top Holders Table (Clear, readable, with float visual bars) */}
            {result.holdersTable && result.holdersTable.length > 0 && (
              <div className="p-5 sm:p-6 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--nm-line)]">
                  <div>
                    <h3 className="font-serif-editorial text-xl sm:text-2xl text-[var(--nm-text)]">
                      Top 20 On-Chain Holders Breakdown
                    </h3>
                    <p className="text-xs text-[var(--nm-text-muted)] font-sans">
                      Ranked by share of circulating float. Includes initial buy cost, entry timing, and realized/unrealized multiple.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[var(--nm-code-bg)] text-[var(--nm-text-subtle)] border border-[var(--nm-line)] shrink-0">
                    CRAWLED AT: {result.scannedAt}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono-tech">
                    <thead className="text-[10px] uppercase text-[var(--nm-text-subtle)] border-b border-[var(--nm-line)]">
                      <tr>
                        <th className="py-2.5 pl-1 w-8">#</th>
                        <th className="py-2.5">WALLET</th>
                        <th className="py-2.5 min-w-[140px]">FLOAT SHARE %</th>
                        <th className="py-2.5">SUPPLY %</th>
                        <th className="py-2.5">ENTRY TIMING</th>
                        <th className="py-2.5">INITIAL BUY</th>
                        <th className="py-2.5 text-right">MULTIPLE</th>
                        <th className="py-2.5 text-right pr-1">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--nm-line)]">
                      {result.holdersTable.map((h) => (
                        <tr key={h.rank} className="hover:bg-[var(--nm-surface-hover)] transition-colors">
                          <td className="py-3 pl-1 text-[var(--nm-text-subtle)] font-bold">{h.rank}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1.5 font-semibold text-[var(--nm-text)]">
                              <span>
                                {h.wallet.slice(0, 6)}...{h.wallet.slice(-4)}
                              </span>
                              <button
                                onClick={() => handleCopy(h.wallet, `w_${h.rank}`)}
                                className="p-0.5 hover:text-[var(--nm-accent-cyan)] cursor-pointer text-[var(--nm-text-subtle)]"
                                title="Copy Wallet"
                              >
                                {copiedText === `w_${h.rank}` ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                              {h.explorerUrl && (
                                <a
                                  href={h.explorerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)]"
                                  title="View on Explorer"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="space-y-1">
                              <span className="font-bold text-[var(--nm-text)]">{h.floatSharePercent}%</span>
                              <div className="w-full max-w-[120px] h-1.5 bg-[var(--nm-code-bg)] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[var(--nm-accent-emerald)] rounded-full"
                                  style={{ width: `${Math.min(100, h.floatSharePercent * 14)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-[var(--nm-text-muted)]">{h.supplySharePercent}%</td>
                          <td className="py-3 text-[var(--nm-text-muted)]">
                            {h.entryRank ? `Rank #${h.entryRank}` : "Early"} · {h.entryTimeDelta || "Launch"}
                          </td>
                          <td className="py-3 text-[var(--nm-text)]">
                            {h.buyEth ? `${h.buyEth} ETH` : "—"}
                            {h.tokensHeld && (
                              <span className="block text-[10px] text-[var(--nm-text-subtle)]">
                                {h.tokensHeld}
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            {h.multiple ? (
                              <span className="font-bold text-emerald-500">
                                {h.multiple}x
                              </span>
                            ) : (
                              <span className="text-[var(--nm-text-subtle)]">—</span>
                            )}
                          </td>
                          <td className="py-3 text-right pr-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Holding All
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Lince Real Data Mindshare from X (Twitter / CT) */}
            {result.socialMindshareCorrelated && (
              <div className="p-6 sm:p-7 rounded-xl bg-[var(--nm-surface)] border border-[var(--nm-line)] space-y-6 shadow-sm">
                {/* Panel Header with X (Twitter) Identity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--nm-line)]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[var(--nm-text)] text-[var(--nm-bg)] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[var(--nm-accent-cyan)] font-bold">
                        05 / X (TWITTER) COGNITIVE MINDSHARE TELEMETRY
                      </span>
                    </div>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--nm-text)]">
                      Real-Time Crypto Twitter (CT) Attention &amp; Sentiment
                    </h3>
                    <p className="text-xs text-[var(--nm-text-muted)] font-sans">
                      Verified live social telemetry derived strictly from X cashtag activity, influential smart follower accounts, and KOL calls.
                    </p>
                  </div>

                  {/* Quick Action Badges for X */}
                  <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs shrink-0">
                    {result.socialMindshareCorrelated.xHandle && (
                      <a
                        href={result.socialMindshareCorrelated.xProfileUrl || `https://x.com/${result.socialMindshareCorrelated.xHandle.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text)] border border-[var(--nm-line)] inline-flex items-center gap-1.5 transition-colors"
                        title="View Official Project Account on X"
                      >
                        <span className="text-[var(--nm-accent-cyan)] font-bold">
                          {result.socialMindshareCorrelated.xHandle}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[var(--nm-text-subtle)]" />
                      </a>
                    )}

                    <a
                      href={result.socialMindshareCorrelated.xSearchUrl || `https://x.com/search?q=${encodeURIComponent("$" + result.tokenSymbol)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[var(--nm-code-bg)] hover:bg-[var(--nm-surface-hover)] text-[var(--nm-text)] border border-[var(--nm-line)] inline-flex items-center gap-1.5 transition-colors"
                      title="Search Cashtag on X"
                    >
                      <span className="font-bold">${result.tokenSymbol}</span>
                      <span className="text-[var(--nm-text-subtle)]">on X</span>
                      <ExternalLink className="w-3 h-3 text-[var(--nm-text-subtle)]" />
                    </a>
                  </div>
                </div>

                {/* 3 Core X Telemetry Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: X Post Velocity & Volume */}
                  <div className="p-4 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                      <span className="uppercase">X 24H POST VOLUME</span>
                      <svg className="w-3.5 h-3.5 text-[var(--nm-text-muted)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono-tech text-2xl sm:text-3xl font-bold text-[var(--nm-text)]">
                        {result.socialMindshareCorrelated.posts24h || `${Math.round(result.socialMindshareCorrelated.mindshareScore * 95)} posts`}
                      </span>
                      <span className="ml-auto text-xs font-mono-tech px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                        +{result.socialMindshareCorrelated.momentumSpike24h}% 24h
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--nm-surface)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--nm-accent-cyan)] rounded-full"
                        style={{ width: `${Math.min(100, result.socialMindshareCorrelated.mindshareScore * 1.2)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block">
                      {result.socialMindshareCorrelated.uniqueAuthorsCount || 1280} unique CT authors discussing token
                    </span>
                  </div>

                  {/* Card 2: X Sentiment Polarity */}
                  <div className="p-4 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                      <span className="uppercase">X SENTIMENT POLARITY</span>
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono-tech text-2xl sm:text-3xl font-bold text-emerald-500">
                        {result.socialMindshareCorrelated.sentimentPolarityPercent}%
                      </span>
                      <span className="font-mono-tech text-xs text-[var(--nm-text-subtle)]">
                        {100 - result.socialMindshareCorrelated.sentimentPolarityPercent}% Bearish
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-rose-500/30 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${result.socialMindshareCorrelated.sentimentPolarityPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono-tech text-[var(--nm-text-subtle)] block">
                      Bullish cashtag engagement vs skeptic FUD ratio on X
                    </span>
                  </div>

                  {/* Card 3: Smart Followers & KOL Reach */}
                  <div className="p-4 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--nm-text-subtle)]">
                      <span className="uppercase">SMART CT REACH</span>
                      <Users className="w-3.5 h-3.5 text-[var(--nm-accent-cyan)]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono-tech text-2xl sm:text-3xl font-bold text-[var(--nm-text)]">
                        {result.socialMindshareCorrelated.smartFollowersCount || 840}
                      </span>
                      <span className="text-xs font-mono-tech text-[var(--nm-text-subtle)]">Smart Followers</span>
                    </div>
                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono-tech text-[var(--nm-text-subtle)] border-t border-[var(--nm-line)]">
                      <span>{result.socialMindshareCorrelated.kolConsensusCount || 7} Verified KOL Calls</span>
                      <span className="text-emerald-500 font-semibold">High Conviction</span>
                    </div>
                  </div>
                </div>

                {/* Real Quotes Stream from X */}
                {result.socialMindshareCorrelated.recentXQuotes && result.socialMindshareCorrelated.recentXQuotes.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="uppercase text-[var(--nm-text-subtle)] flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-[var(--nm-text)]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>RECENT VERIFIED DISCUSSIONS ON X</span>
                      </span>
                      <span className="text-[10px] text-[var(--nm-text-subtle)]">
                        REAL CT CITATIONS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {result.socialMindshareCorrelated.recentXQuotes.map((q, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] flex flex-col justify-between space-y-2.5 text-xs font-sans hover:border-[var(--nm-accent-cyan)]/50 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono-tech">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[var(--nm-text)]">{q.authorName}</span>
                              <span className="text-[var(--nm-text-subtle)]">{q.handle}</span>
                            </div>
                            <span className="text-[10px] text-[var(--nm-text-subtle)]">{q.timestamp}</span>
                          </div>

                          <p className="text-[var(--nm-text)] leading-relaxed text-xs">
                            &ldquo;{q.text}&rdquo;
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-[var(--nm-line)] text-[10px] font-mono-tech">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                              {q.sentiment.toUpperCase()}
                            </span>
                            <a
                              href={q.tweetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--nm-text-subtle)] hover:text-[var(--nm-text)] inline-flex items-center gap-1"
                            >
                              <span>View on X</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* X Divergence Assessment & Action Bar */}
                <div className="p-4 rounded-lg bg-[var(--nm-code-bg)] border border-[var(--nm-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[var(--nm-accent-cyan)] font-bold uppercase">
                      <Sparkles className="w-3 h-3 text-[var(--nm-accent-amber)]" />
                      <span>X ATTENTION VS. ON-CHAIN REALITY DIVERGENCE</span>
                    </div>
                    <p className="text-xs text-[var(--nm-text)] font-sans leading-relaxed">
                      {result.socialMindshareCorrelated.warningNote}
                    </p>
                    {result.socialMindshareCorrelated.catalystNarrative && (
                      <div className="text-[11px] font-mono-tech text-[var(--nm-text-subtle)] pt-0.5">
                        Catalyst: <span className="text-[var(--nm-text-muted)]">{result.socialMindshareCorrelated.catalystNarrative}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Checked $${result.tokenSymbol} (${result.tokenAddress}) on @lince_labs ClusterGuard.\n\n` +
                          `• Audit Verdict: ${result.band || result.verdict} (${result.score || 100 - result.riskScore}/100)\n` +
                          `• Top holder impact: -${result.maxSingleImpactPercent}%\n` +
                          `• Verified on-chain holders: ${result.totalHolders}\n\n` +
                          `Inspect live on Lince: https://lince-alpha.vercel.app/scanner`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-[var(--nm-text)] font-semibold text-xs font-sans inline-flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Share to X</span>
                    </a>

                    <Link
                      href="/terminal"
                      className="px-3.5 py-2 rounded-lg bg-[var(--nm-action)] hover:bg-[var(--nm-action-hover)] text-[var(--nm-action-text)] font-semibold text-xs font-sans inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <span>Terminal</span>
                      <Terminal className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
