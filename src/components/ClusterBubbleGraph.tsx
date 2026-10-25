"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { HolderDetail, LaunchAudit, WalletCluster } from "@/lib/types";
import {
  ExternalLink,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Layers,
  Filter,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";

// Dynamic import with ssr: false for WebGL / Three.js Reagraph Engine
const ReagraphBubbleView = dynamic(() => import("./ReagraphBubbleView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] sm:h-[680px] flex flex-col items-center justify-center gap-3 bg-[#030712] rounded-2xl text-xs font-mono-tech text-cyan-400 border border-white/10 shadow-2xl">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      <span className="tracking-widest uppercase font-bold text-white/90">
        INITIALIZING GPU WEBGL 3D COSMOS (REAGRAPH)...
      </span>
      <span className="text-[10px] text-white/40">Loading Three.js shaders &amp; on-chain clusters</span>
    </div>
  ),
});

interface ClusterBubbleGraphProps {
  holders: HolderDetail[];
  launchAudit?: LaunchAudit;
  tokenSymbol: string;
  tokenName?: string;
  tokenAddress?: string;
  chain: string;
  marketCap?: string;
  liquidityUsd?: string;
  totalHolders?: number;
  riskScore?: number;
  verdict?: "SAFE" | "ELEVATED" | "DANGER";
  launchpad?: string;
  circulatingFloatPercent?: number;
  curveReservePercent?: number;
  clusters?: WalletCluster[];
}

export function ClusterBubbleGraph({
  holders,
  launchAudit,
  tokenSymbol,
  tokenName,
  tokenAddress,
  chain,
  marketCap,
  liquidityUsd,
  totalHolders,
  riskScore,
  verdict,
  launchpad,
  circulatingFloatPercent = 54.3,
  curveReservePercent = 43.7,
  clusters = [],
}: ClusterBubbleGraphProps) {
  const [engineMode, setEngineMode] = useState<"WEBGL" | "SVG">("WEBGL");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredNode, setHoveredNode] = useState<HolderDetail | null>(null);
  const [selectedNode, setSelectedNode] = useState<HolderDetail | null>(null);
  const [filterMode, setFilterMode] = useState<"ALL" | "TOP5" | "SNIPERS">("ALL");
  const [showCurveNode, setShowCurveNode] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Filter holders based on active mode (for SVG fallback)
  const filteredHolders = useMemo(() => {
    if (filterMode === "TOP5") {
      return holders.slice(0, 5);
    }
    if (filterMode === "SNIPERS") {
      return holders.filter((h) => h.signals?.sniper || (h.entryRank && h.entryRank <= 50));
    }
    return holders;
  }, [holders, filterMode]);

  // Center coordinates for SVG viewport (width 800, height 500)
  const cx = 400;
  const cy = 250;

  // Compute orbital positions for SVG fallback in a balanced circular layout
  const positionedNodes = useMemo(() => {
    const list = filteredHolders;
    const total = list.length;
    if (total === 0) return [];

    return list.map((holder, idx) => {
      const rawShare = holder.floatSharePercent || 3;
      const radius = Math.min(44, Math.max(22, Math.sqrt(rawShare) * 15.5));

      const isInner = idx < 6;
      const orbitDistance = isInner ? 140 : 215;

      const countInRing = isInner ? Math.min(6, total) : Math.max(1, total - 6);
      const ringIndex = isInner ? idx : idx - 6;
      const angle = (ringIndex / countInRing) * 2 * Math.PI - Math.PI / 2 + (isInner ? 0 : 0.3);

      const x = cx + orbitDistance * Math.cos(angle);
      const y = cy + orbitDistance * Math.sin(angle);

      let colorType: "EMERALD" | "AMBER" | "ROSE" | "CYAN" = "CYAN";
      if (holder.signals?.isDeployer || holder.floatSharePercent > 25) {
        colorType = "ROSE";
      } else if (holder.signals?.sniper) {
        colorType = "AMBER";
      } else if (holder.signals?.holdingAll) {
        colorType = "EMERALD";
      }

      return {
        ...holder,
        x,
        y,
        radius,
        colorType,
        angle,
      };
    });
  }, [filteredHolders, cx, cy]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const activeNode = selectedNode || hoveredNode;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070913] overflow-hidden space-y-0 shadow-2xl select-none">
      {/* Top Header & Interactive Engine Switcher */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a0f1d]/90 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-cyan-400 font-extrabold">
              ON-CHAIN CLUSTER TOPOLOGY · BUBBLEMAPS WEBGL ENGINE
            </span>
          </div>
          <h4 className="font-serif-editorial text-lg sm:text-xl text-white">
            Liquidity Pool &amp; Holder Distribution Graph
          </h4>
          <p className="text-xs text-white/50 font-sans">
            GPU-accelerated WebGL 3D cosmos powered by Reagraph &amp; Three.js. Inspect wallet clusters, directional token flows, and sniper rings.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          {/* Engine Mode: Reagraph WebGL vs 2D SVG */}
          <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5">
            <button
              onClick={() => setEngineMode("WEBGL")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                engineMode === "WEBGL"
                  ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>WebGL 3D (Reagraph)</span>
            </button>
            <button
              onClick={() => setEngineMode("SVG")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                engineMode === "SVG"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>2D SVG</span>
            </button>
          </div>

          {engineMode === "SVG" && (
            <>
              {/* Filter Pills for SVG fallback */}
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5">
                <button
                  onClick={() => setFilterMode("ALL")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    filterMode === "ALL"
                      ? "bg-cyan-500 text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  All (20)
                </button>
                <button
                  onClick={() => setFilterMode("TOP5")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    filterMode === "TOP5"
                      ? "bg-cyan-500 text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Top 5
                </button>
                <button
                  onClick={() => setFilterMode("SNIPERS")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    filterMode === "SNIPERS"
                      ? "bg-cyan-500 text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Snipers
                </button>
              </div>

              {/* Curve Toggle */}
              <button
                onClick={() => setShowCurveNode(!showCurveNode)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                  showCurveNode
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                    : "bg-white/5 border-white/10 text-white/60"
                }`}
                title="Toggle Bonding Curve Reserve Hub"
              >
                <Layers className="w-3 h-3" />
                <span>Bonding Pool</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 rounded-xl bg-white/5 border border-white/10 p-0.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
                  className="p-1 hover:text-white text-white/60 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                  className="p-1 hover:text-white text-white/60 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 hover:text-white text-white/60 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Interactive Graph Viewport */}
      {engineMode === "WEBGL" ? (
        <ReagraphBubbleView
          holders={holders}
          launchAudit={launchAudit}
          tokenSymbol={tokenSymbol}
          tokenName={tokenName}
          tokenAddress={tokenAddress}
          chain={chain}
          marketCap={marketCap}
          liquidityUsd={liquidityUsd}
          totalHolders={totalHolders}
          riskScore={riskScore}
          verdict={verdict}
          launchpad={launchpad}
          circulatingFloatPercent={circulatingFloatPercent}
          curveReservePercent={curveReservePercent}
          clusters={clusters}
        />
      ) : (
        <div className="relative w-full h-[520px] sm:h-[600px] bg-[#030712] overflow-hidden cursor-grab active:cursor-grabbing select-none">
          {/* Subtle Nebula Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.08) 0%, rgba(224, 64, 251, 0.04) 45%, rgba(3, 7, 18, 0.98) 90%)",
            }}
          />

          {/* Grid pattern sheen */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Orbit Guides */}
          <svg
            viewBox="0 0 800 500"
            className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            {/* Concentric orbit rings */}
            <circle cx={cx} cy={cy} r="140" fill="none" stroke="#38bdf8" strokeDasharray="3 3" className="opacity-25" />
            <circle cx={cx} cy={cy} r="215" fill="none" stroke="#38bdf8" strokeDasharray="3 3" className="opacity-15" />

            {/* Linking edges from center curve pool to holder nodes */}
            {showCurveNode &&
              positionedNodes.map((node) => (
                <line
                  key={`edge-${node.rank}`}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  stroke={
                    activeNode?.rank === node.rank
                      ? "#00e5ff"
                      : node.colorType === "ROSE"
                      ? "#ff1744"
                      : node.colorType === "AMBER"
                      ? "#ff9100"
                      : "rgba(71, 85, 105, 0.4)"
                  }
                  strokeWidth={activeNode?.rank === node.rank ? 2.5 : 1}
                  strokeOpacity={activeNode?.rank === node.rank ? 0.9 : 0.45}
                  strokeDasharray={node.signals?.sniper ? "4 2" : "none"}
                  className="transition-all duration-200"
                />
              ))}
          </svg>

          {/* Nodes Layer */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
          >
            <svg viewBox="0 0 800 500" className="w-full h-full">
              {/* Center Node: Bonding Curve Pool Hub */}
              {showCurveNode && (
                <g
                  className="cursor-pointer group"
                  onClick={() =>
                    setSelectedNode({
                      rank: 0,
                      wallet: launchAudit?.curveAddress || "0xb48244b82e213d0d1578907615cdd42c3e3d069c",
                      floatSharePercent: 0,
                      supplySharePercent: curveReservePercent,
                      tokensHeld: `${curveReservePercent}% Reserve Locked`,
                      signals: { holdingAll: true },
                      explorerUrl: launchAudit?.curveAddress
                        ? `https://robinhoodchain.blockscout.com/address/${launchAudit.curveAddress}`
                        : undefined,
                    })
                  }
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="52"
                    fill="url(#curveGlow)"
                    className="animate-pulse opacity-75"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="42"
                    fill="#0a0f1d"
                    stroke="#00e5ff"
                    strokeWidth="2.5"
                    className="group-hover:stroke-white transition-all shadow-[0_0_16px_rgba(0,229,255,0.4)]"
                  />
                  <text
                    x={cx}
                    y={cy - 8}
                    textAnchor="middle"
                    className="fill-cyan-400 font-mono-tech text-[11px] font-bold tracking-wider"
                  >
                    PONS V2
                  </text>
                  <text
                    x={cx}
                    y={cy + 8}
                    textAnchor="middle"
                    className="fill-white font-mono-tech text-[14px] font-bold"
                  >
                    {curveReservePercent}%
                  </text>
                  <text
                    x={cx}
                    y={cy + 22}
                    textAnchor="middle"
                    className="fill-white/50 font-mono-tech text-[9px] uppercase tracking-wider"
                  >
                    CURVE RESERVE
                  </text>
                </g>
              )}

              {/* Holder Bubble Nodes */}
              {positionedNodes.map((node) => {
                const isHovered = hoveredNode?.rank === node.rank;
                const isSelected = selectedNode?.rank === node.rank;
                const isActive = isHovered || isSelected;

                let strokeColor = "rgba(71, 85, 105, 0.6)";
                let fillColor = "#0a0f1d";
                let textColor = "#ffffff";

                if (node.colorType === "EMERALD") {
                  strokeColor = "#00e676";
                  textColor = "#00e676";
                } else if (node.colorType === "AMBER") {
                  strokeColor = "#ff9100";
                  textColor = "#ff9100";
                } else if (node.colorType === "ROSE") {
                  strokeColor = "#ff1744";
                  textColor = "#ff1744";
                } else {
                  strokeColor = "#00e5ff";
                  textColor = "#00e5ff";
                }

                return (
                  <g
                    key={`node-${node.rank}`}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(node)}
                  >
                    {isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius + 8}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ animationDuration: "8s" }}
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isActive ? 3 : 2}
                      className="hover:scale-110 transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                    />

                    <text
                      x={node.x}
                      y={node.radius >= 28 ? node.y - 4 : node.y + 4}
                      textAnchor="middle"
                      className="font-mono-tech font-bold text-[11px]"
                      fill={textColor}
                    >
                      #{node.rank}
                    </text>

                    {node.radius >= 28 && (
                      <text
                        x={node.x}
                        y={node.y + 11}
                        textAnchor="middle"
                        className="font-mono-tech text-[10px] font-semibold fill-white"
                      >
                        {node.floatSharePercent}%
                      </text>
                    )}

                    <text
                      x={node.x}
                      y={node.y + node.radius + 13}
                      textAnchor="middle"
                      className="font-mono-tech text-[9px] fill-white/50 font-medium"
                    >
                      {node.wallet.slice(0, 4)}...{node.wallet.slice(-2)}
                    </text>
                  </g>
                );
              })}

              <defs>
                <radialGradient id="curveGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Quick Legend (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 p-3 rounded-xl bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 text-[10px] font-mono-tech space-y-1.5 shadow-xl text-white">
            <div className="text-[9px] text-white/40 uppercase tracking-wider font-bold">
              CLUSTER LEGEND
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
              <span className="text-white/80">Organic Accumulator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9100]" />
              <span className="text-white/80">Early Sniper (&lt;60s)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff1744]" />
              <span className="text-white/80">High Risk / Cabal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
              <span className="text-white/80">Bonding Pool ({curveReservePercent}%)</span>
            </div>
          </div>

          {/* Selected / Hovered Node Inspector Popover */}
          {activeNode && (
            <div className="absolute top-3 right-3 max-w-[280px] sm:max-w-[320px] p-3.5 sm:p-4 rounded-xl bg-[#0a0f1d]/95 backdrop-blur-xl border border-cyan-500/50 text-xs font-mono-tech space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
                    {activeNode.rank === 0 ? "BONDING POOL" : `HOLDER #${activeNode.rank}`}
                  </span>
                  {activeNode.signals?.sniper && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                      SNIPER
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setHoveredNode(null);
                    setSelectedNode(null);
                  }}
                  className="text-white/40 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Wallet Address */}
              <div>
                <span className="text-[10px] text-white/40 block uppercase">WALLET ADDRESS</span>
                <div className="flex items-center justify-between text-xs font-semibold text-white mt-1 bg-white/5 p-2 rounded-lg border border-white/5">
                  <code>
                    {activeNode.wallet.slice(0, 8)}...{activeNode.wallet.slice(-6)}
                  </code>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(activeNode.wallet)}
                      className="p-1 hover:text-cyan-400 text-white/60 transition-colors"
                      title="Copy Address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {activeNode.explorerUrl && (
                      <a
                        href={activeNode.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-white text-white/60 transition-colors"
                        title="Block Explorer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 block uppercase">FLOAT SHARE</span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {activeNode.floatSharePercent}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block uppercase">SUPPLY SHARE</span>
                  <span className="text-sm font-extrabold text-white">
                    {activeNode.supplySharePercent}%
                  </span>
                </div>
                {activeNode.buyEth !== undefined && (
                  <div>
                    <span className="text-[10px] text-white/40 block uppercase">BUY COST</span>
                    <span className="text-xs text-white font-semibold">
                      {activeNode.buyEth} ETH
                    </span>
                  </div>
                )}
                {activeNode.multiple !== undefined && (
                  <div>
                    <span className="text-[10px] text-white/40 block uppercase">UNREALIZED PnL</span>
                    <span className="text-xs text-emerald-400 font-extrabold">
                      {activeNode.multiple}x
                    </span>
                  </div>
                )}
              </div>

              {/* Entry Timing */}
              {activeNode.entryTimeDelta && (
                <div className="pt-2 border-t border-white/10 text-[11px] text-white/80">
                  <span className="text-[10px] text-white/40 block uppercase">FIRST ENTRY</span>
                  <span className="text-cyan-400 font-medium">
                    {activeNode.entryTimeDelta}
                    {activeNode.entryRank ? ` (Tx #${activeNode.entryRank})` : ""}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer Telemetry Bar */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0a0f1d] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech text-white/60">
        <div className="flex flex-wrap items-center gap-4">
          <span>
            Circulating Float: <strong className="text-white">{circulatingFloatPercent}%</strong>
          </span>
          <span>
            Curve Liquidity: <strong className="text-cyan-400">{curveReservePercent}%</strong>
          </span>
          <span>
            Top 20 Float Sum:{" "}
            <strong className="text-amber-400">
              {holders.reduce((acc, h) => acc + h.floatSharePercent, 0).toFixed(1)}%
            </strong>
          </span>
          <span>
            Total Holders: <strong className="text-white">{totalHolders || 134}</strong>
          </span>
        </div>
        <div className="text-[10px] text-white/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Interactive 3D Orbit: Click any bubble to inspect, drag canvas to rotate</span>
        </div>
      </div>
    </div>
  );
}
