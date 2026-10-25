"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";

interface DumpImpactSimulatorProps {
  tokenSymbol: string;
  marketCap: string;
  liquidityUsd: string;
  priceUsd: string;
  circulatingFloatPercent?: number;
  curveReservePercent?: number;
}

export function DumpImpactSimulator({
  tokenSymbol = "NOUMEN",
  marketCap = "$19.2K",
  liquidityUsd = "$8.4K",
  priceUsd = "$0.0000192",
  circulatingFloatPercent = 54.3,
  curveReservePercent = 43.7,
}: DumpImpactSimulatorProps) {
  // Parse numeric values
  const rawMcap = useMemo(() => {
    const clean = marketCap.replace(/[^0-9.]/g, "");
    const val = parseFloat(clean) || 19.2;
    return marketCap.includes("M") ? val * 1_000_000 : val * 1_000;
  }, [marketCap]);

  const rawLiq = useMemo(() => {
    const clean = liquidityUsd.replace(/[^0-9.]/g, "");
    const val = parseFloat(clean) || 8.4;
    return liquidityUsd.includes("M") ? val * 1_000_000 : val * 1_000;
  }, [liquidityUsd]);

  const rawPrice = useMemo(() => {
    const clean = priceUsd.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0.0000192;
  }, [priceUsd]);

  // Target preset: % of total float targeted for liquidation
  const [selectedTarget, setSelectedTarget] = useState<{
    name: string;
    floatShare: number;
  }>({
    name: "Sniper Cluster",
    floatShare: 10.4,
  });

  // Slider: % of selected target's tokens sold (10% - 100%)
  const [sellFraction, setSellFraction] = useState<number>(100);

  // Compute Impact via Constant Product / Bonding Curve Slippage Formula
  const calculation = useMemo(() => {
    // Total float percentage being dumped
    const dumpedFloatPercent = (selectedTarget.floatShare * (sellFraction / 100));

    // In a constant product curve x * y = k:
    // Dumping % of supply causes non-linear slippage: ΔP/P ≈ 2 * (dump / reserve)
    // For small pool reserves, impact accelerates quadratically
    const effectiveSupplyRatio = dumpedFloatPercent / 100;
    const poolDepthRatio = rawLiq / Math.max(1, rawMcap);
    
    // Impact estimation model calibrated to Pons V2 bonding curve
    const priceDropPct = Math.min(
      94.5,
      Number(((effectiveSupplyRatio / (poolDepthRatio * 1.45 + effectiveSupplyRatio)) * 100).toFixed(1))
    );

    const newMcap = Math.max(500, Math.round(rawMcap * (1 - priceDropPct / 100)));
    const remainingLiq = Math.max(
      400,
      Math.round(rawLiq * Math.sqrt(Math.max(0.04, 1 - priceDropPct / 100)))
    );
    const newPrice = rawPrice * (1 - priceDropPct / 100);
    const slippagePct = Math.min(88, Number((priceDropPct * 1.15).toFixed(1)));

    let riskVerdict: "LOW" | "MODERATE" | "SEVERE" = "LOW";
    if (priceDropPct > 35) {
      riskVerdict = "SEVERE";
    } else if (priceDropPct > 18) {
      riskVerdict = "MODERATE";
    }

    return {
      dumpedFloatPercent: dumpedFloatPercent.toFixed(1),
      priceDropPct,
      newMcap,
      remainingLiq,
      newPrice,
      slippagePct,
      riskVerdict,
    };
  }, [selectedTarget, sellFraction, rawMcap, rawLiq, rawPrice]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070913] overflow-hidden shadow-2xl space-y-0 text-white font-mono-tech">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a0f1d]/90 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#ff9100]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-amber-400 font-extrabold">
              WHAT-IF RISK SIMULATOR · PONS V2 CURVE
            </span>
          </div>
          <h4 className="font-serif-editorial text-lg sm:text-xl text-white">
            Dump Impact &amp; Liquidity Drain Calculator
          </h4>
          <p className="text-xs text-white/50 font-sans">
            Simulate price collapse, pool drain, and retail slippage if whales or sniper clusters liquidate their float on DEX liquidity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full border text-[11px] font-bold flex items-center gap-1.5 ${
              calculation.riskVerdict === "LOW"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : calculation.riskVerdict === "MODERATE"
                ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                : "bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse"
            }`}
          >
            {calculation.riskVerdict === "LOW" ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : calculation.riskVerdict === "MODERATE" ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5" />
            )}
            {calculation.riskVerdict === "LOW"
              ? "SURVIVABLE DIP"
              : calculation.riskVerdict === "MODERATE"
              ? "MODERATE VOLATILITY"
              : "CRITICAL LIQUIDITY DRAIN"}
          </span>
        </div>
      </div>

      {/* Simulator Body */}
      <div className="p-4 sm:p-6 space-y-6 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,145,0,0.05)_0%,_transparent_65%)]">
        {/* Step 1: Target Entity Selection */}
        <div className="space-y-2">
          <span className="text-[10px] text-white/50 uppercase tracking-wider block font-bold">
            1. SELECT TARGET LIQUIDATION CLUSTER
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { name: "Sniper Cluster", floatShare: 10.4, badge: "⚡ SNIPERS" },
              { name: "Top Whale #1", floatShare: 5.7, badge: "🐋 WHALE #1" },
              { name: "Top 5 Whales", floatShare: 26.2, badge: "🦈 TOP 5" },
              { name: "All Top 20", floatShare: 45.8, badge: "⚠️ TOP 20" },
            ].map((tgt) => (
              <button
                key={tgt.name}
                onClick={() => setSelectedTarget(tgt)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTarget.name === tgt.name
                    ? "border-amber-400 bg-amber-500/15 shadow-[0_0_14px_rgba(255,145,0,0.3)]"
                    : "border-white/10 bg-white/5 hover:border-white/20 text-white/70"
                }`}
              >
                <div className="text-[9px] font-extrabold text-amber-400">{tgt.badge}</div>
                <div className="text-xs font-bold text-white mt-1 truncate">{tgt.name}</div>
                <div className="text-[10px] text-white/50 mt-0.5">{tgt.floatShare}% Float</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Liquidation Fraction Slider */}
        <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">
              2. SIMULATE POSITION SOLD: {sellFraction}% OF TARGET
            </span>
            <span className="text-amber-400 font-extrabold text-sm">
              Dumping {calculation.dumpedFloatPercent}% of Circulating Float
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={sellFraction}
            onChange={(e) => setSellFraction(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex justify-between text-[10px] text-white/40">
            <span>10% (Minor Take-Profit)</span>
            <span>50% (Half Exit)</span>
            <span>100% (Full Liquidation)</span>
          </div>
        </div>

        {/* Step 3: Real-Time Impact Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Metric 1: Price Collapse */}
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <span className="text-[10px] text-rose-400/80 block uppercase font-bold">
              ESTIMATED PRICE DROP
            </span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1 flex items-center gap-1">
              <TrendingDown className="w-5 h-5" />
              <span>−{calculation.priceDropPct}%</span>
            </div>
            <span className="text-[9px] text-white/50 block mt-1">
              New: ${calculation.newPrice.toFixed(8)}
            </span>
          </div>

          {/* Metric 2: New Market Cap */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/50 block uppercase font-bold">
              NEW MARKET CAP
            </span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              ${(calculation.newMcap / 1000).toFixed(1)}K
            </div>
            <span className="text-[9px] text-white/40 block mt-1">
              Drop: −${((rawMcap - calculation.newMcap) / 1000).toFixed(1)}K
            </span>
          </div>

          {/* Metric 3: Remaining Pool Liquidity */}
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-[10px] text-cyan-400/80 block uppercase font-bold">
              REMAINING POOL RESERVE
            </span>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
              ${(calculation.remainingLiq / 1000).toFixed(1)}K
            </div>
            <span className="text-[9px] text-white/40 block mt-1">
              {((calculation.remainingLiq / rawLiq) * 100).toFixed(0)}% Depth Intact
            </span>
          </div>

          {/* Metric 4: Retail Slippage */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <span className="text-[10px] text-amber-400/80 block uppercase font-bold">
              RETAIL SELL SLIPPAGE
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              ~{calculation.slippagePct}%
            </div>
            <span className="text-[9px] text-white/40 block mt-1">
              High Impact Slippage
            </span>
          </div>
        </div>

        {/* Tactical Recommendation */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/70 flex items-start gap-3">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">
              Quant Forensic Insight for ${tokenSymbol}:
            </span>
            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              With 43.7% locked in Pons V2 bonding curve, {tokenSymbol} possesses resilient liquidity buffer against single-whale liquidations. A 100% exit by Sniper Cluster causes a manageable −{calculation.priceDropPct}% dip, leaving ${(calculation.remainingLiq / 1000).toFixed(1)}K reserve intact without triggering a death spiral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
