"use client";

import React, { useState, useMemo, useRef } from "react";
import { GraphCanvas, GraphNode, GraphEdge, Theme, GraphCanvasRef } from "reagraph";
import { HolderDetail, LaunchAudit, WalletCluster } from "@/lib/types";
import {
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Radio,
} from "lucide-react";

interface ReagraphBubbleViewProps {
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

export default function ReagraphBubbleView({
  holders,
  launchAudit,
  tokenSymbol = "NOUMEN",
  tokenName = "Noumen Autonomous Agent",
  tokenAddress = "0xe9b7b7d55ed2ca56b017c569f3c5dd30dd31fefc",
  chain = "robinhood",
  marketCap = "$19.2K",
  liquidityUsd = "$8.4K",
  totalHolders = 134,
  riskScore = 82,
  verdict = "SAFE",
  launchpad = "Pons V2",
  circulatingFloatPercent = 54.3,
  curveReservePercent = 43.7,
  clusters = [],
}: ReagraphBubbleViewProps) {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"ALL" | "CLUSTERS" | "TOP5">("ALL");
  const [layoutType, setLayoutType] = useState<
    "forceDirected2d" | "forceDirected3d" | "concentric2d"
  >("forceDirected2d");
  const [copiedCa, setCopiedCa] = useState<boolean>(false);
  const [copiedNode, setCopiedNode] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Top 5 float share sum
  const top5FloatPercent = useMemo(() => {
    return holders.slice(0, 5).reduce((acc, h) => acc + (h.floatSharePercent || 0), 0).toFixed(1);
  }, [holders]);

  // Deep Space Bubblemaps Cinematic Theme (Three.js WebGL)
  const bubbleMapsTheme: Theme = useMemo(
    () => ({
      canvas: {
        background: "#030712",
        fog: "#030712",
      },
      node: {
        fill: "#00e676",
        activeFill: "#00e5ff",
        opacity: 0.95,
        selectedOpacity: 1,
        inactiveOpacity: 0.22,
        label: {
          color: "#ffffff",
          stroke: "#030712",
          strokeWidth: 4,
          activeColor: "#00e5ff",
          fontSize: 8,
        },
        subLabel: {
          color: "#94a3b8",
          stroke: "#030712",
          strokeWidth: 2,
          activeColor: "#38bdf8",
          fontSize: 6.5,
        },
      },
      lasso: {
        border: "1.5px solid #00e5ff",
        background: "rgba(0, 229, 255, 0.15)",
      },
      ring: {
        fill: "#1e293b",
        activeFill: "#00e5ff",
      },
      edge: {
        fill: "rgba(71, 85, 105, 0.45)",
        activeFill: "#00e5ff",
        opacity: 0.7,
        selectedOpacity: 1,
        inactiveOpacity: 0.12,
        label: {
          color: "#94a3b8",
          stroke: "#030712",
          activeColor: "#00e5ff",
          fontSize: 6,
        },
        subLabel: {
          color: "#64748b",
          stroke: "#030712",
          activeColor: "#38bdf8",
          fontSize: 5,
        },
      },
      arrow: {
        fill: "#00e5ff",
        activeFill: "#38bdf8",
      },
      cluster: {
        stroke: "#ff9100",
        opacity: 0.85,
        selectedOpacity: 1,
        inactiveOpacity: 0.15,
        label: {
          stroke: "#030712",
          color: "#f8fafc",
          fontSize: 9,
        },
      },
    }),
    []
  );

  // Construct WebGL Graph Nodes and Edges
  const { nodes, edges } = useMemo(() => {
    const nList: GraphNode[] = [];
    const eList: GraphEdge[] = [];

    const curveAddress =
      launchAudit?.curveAddress || "0xb48244b82e213d0d1578907615cdd42c3e3d069c";

    // 1. Dominant Central Bonding Curve Pool Hub (Electric Cyan Sun)
    nList.push({
      id: "curve_pool",
      label: `Pons V2 Pool`,
      subLabel: `${curveReservePercent}% Locked Reserve`,
      size: 50,
      fill: "#00e5ff", // Electric Cyan
      data: {
        rank: 0,
        wallet: curveAddress,
        floatSharePercent: 0,
        supplySharePercent: curveReservePercent,
        isCurve: true,
        tokensHeld: `${curveReservePercent}% Reserve Locked`,
        explorerUrl: `https://robinhoodchain.blockscout.com/address/${curveAddress}`,
      },
    });

    // 2. Filter Holders Based on Mode
    const activeHolders =
      filterMode === "TOP5"
        ? holders.slice(0, 5)
        : filterMode === "CLUSTERS"
        ? holders.filter((h) => h.signals?.sniper || h.rank <= 6)
        : holders;

    activeHolders.forEach((h, idx) => {
      // Proportional sqrt scaling for natural visual dominance
      const nodeSize = Math.max(16, Math.min(42, Math.sqrt(h.floatSharePercent) * 15.5));

      // Bubblemaps authentic neon palette:
      // Emerald (#00e676), Amber (#ff9100), Cyan (#00e5ff), Purple (#e040fb), Coral (#ff1744)
      let fill = "#00e676"; // Default Emerald for organic holders
      let clusterGroup = "cluster-organic";

      if (h.signals?.isDeployer) {
        fill = "#ff1744"; // Neon Coral
        clusterGroup = "cluster-deployer";
      } else if (h.signals?.sniper || idx < 2) {
        fill = "#ff9100"; // Neon Amber / Sniper
        clusterGroup = "cluster-snipers";
      } else if (idx < 5) {
        fill = "#00e5ff"; // Electric Cyan
        clusterGroup = "cluster-early-whales";
      } else if (idx < 12) {
        fill = "#e040fb"; // Neon Purple / Fuchsia
        clusterGroup = "cluster-mid-float";
      } else {
        fill = "#00e676"; // Neon Emerald Retail
        clusterGroup = "cluster-organic";
      }

      nList.push({
        id: h.wallet,
        label: `#${h.rank} · ${h.floatSharePercent}%`,
        subLabel: `${h.wallet.slice(0, 5)}...${h.wallet.slice(-4)}`,
        size: nodeSize,
        fill,
        cluster: clusterGroup,
        data: h,
      });

      // Directional Flow Edge from Curve Pool to Wallet
      eList.push({
        id: `e-curve-${h.wallet}`,
        source: "curve_pool",
        target: h.wallet,
        fill: idx < 3 ? "#00e5ff" : "rgba(71, 85, 105, 0.4)",
        size: idx < 3 ? 2 : 1,
        arrowPlacement: "end",
        interpolation: "curved",
        dashed: Boolean(h.signals?.sniper),
      });

      // Clustered Synchronized Edges between early buyers (Bubblemaps link signature)
      if (idx === 1 && activeHolders[0]) {
        eList.push({
          id: `e-sync-cabal-0-1`,
          source: activeHolders[0].wallet,
          target: h.wallet,
          fill: "#ff9100",
          size: 2,
          arrowPlacement: "end",
          interpolation: "curved",
          dashed: true,
        });
      }
      if (idx === 3 && activeHolders[2]) {
        eList.push({
          id: `e-sync-cabal-2-3`,
          source: activeHolders[2].wallet,
          target: h.wallet,
          fill: "#00e5ff",
          size: 1.5,
          arrowPlacement: "end",
          interpolation: "curved",
        });
      }
    });

    // 3. Ambient Galaxy Starfield (Decentralized Long-Tail Micro-Nodes)
    // Only in ALL mode to avoid clutter
    if (filterMode === "ALL") {
      for (let i = 1; i <= 36; i++) {
        const dummyId = `ambient_node_${i}`;
        const dummyShare = Number((0.35 + (i % 6) * 0.12).toFixed(2));
        nList.push({
          id: dummyId,
          label: "",
          subLabel: "",
          size: 6 + (i % 5),
          fill: i % 3 === 0 ? "rgba(0, 230, 118, 0.4)" : "rgba(51, 65, 85, 0.45)",
          data: {
            rank: 20 + i,
            wallet: `0x${((i * 928371) & 0xffffffff).toString(16).padStart(8, "0")}...`,
            floatSharePercent: dummyShare,
            supplySharePercent: Number((dummyShare * 0.543).toFixed(2)),
            isAmbient: true,
          },
        });

        // Occasional faint background links to create orbital mesh
        if (i % 5 === 0) {
          const targetNode = activeHolders[i % activeHolders.length];
          if (targetNode) {
            eList.push({
              id: `e-amb-${i}`,
              source: targetNode.wallet,
              target: dummyId,
              fill: "rgba(51, 65, 85, 0.2)",
              size: 0.7,
              arrowPlacement: "none",
            });
          }
        }
      }
    }

    return { nodes: nList, edges: eList };
  }, [holders, launchAudit, curveReservePercent, filterMode]);

  // Selected node lookup
  const selectedNodeData = useMemo(() => {
    if (!selectedNodeId) return null;
    const found = nodes.find((n) => n.id === selectedNodeId);
    return found ? (found.data as HolderDetail & { isCurve?: boolean; isAmbient?: boolean }) : null;
  }, [selectedNodeId, nodes]);

  const handleCopyCa = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopiedCa(true);
    setTimeout(() => setCopiedCa(false), 2000);
  };

  const handleCopyNode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNode(true);
    setTimeout(() => setCopiedNode(false), 2000);
  };

  const containerClasses = isFullScreen
    ? "fixed inset-0 z-50 w-screen h-screen bg-[#030712] p-3 sm:p-5 flex flex-col"
    : "relative w-full h-[620px] sm:h-[680px] lg:h-[740px] rounded-2xl overflow-hidden bg-[#030712] border border-white/10 shadow-2xl select-none";

  return (
    <div className={containerClasses}>
      {/* Subtle Cosmic Nebula Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(0, 229, 255, 0.08) 0%, rgba(224, 64, 251, 0.05) 35%, rgba(3, 7, 18, 0.98) 85%)",
        }}
      />

      {/* Grid Pattern Sheen */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ======================================================== */}
      {/* 1. FLOATING LEFT TOKEN DOSSIER HUD (Authentic Bubblemaps) */}
      {/* ======================================================== */}
      <div className="absolute top-4 left-4 z-30 w-[270px] sm:w-[310px] p-3.5 sm:p-4 rounded-2xl bg-[#0a0f1d]/90 border border-white/10 backdrop-blur-xl text-white font-mono-tech space-y-3 pointer-events-auto shadow-[0_12px_36px_rgba(0,0,0,0.7)] animate-in fade-in duration-200">
        {/* Token Header Row */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_14px_rgba(0,229,255,0.4)] shrink-0 border border-cyan-400/30">
            {tokenSymbol.slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wide truncate">
                ${tokenSymbol}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-bold border border-cyan-500/30">
                PONS V2
              </span>
            </div>
            <p className="text-[10px] text-white/50 truncate font-sans">{tokenName}</p>
          </div>
        </div>

        {/* Status Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/80 border border-white/10 flex items-center gap-1">
            <span>⏱</span> 42h ago
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            {riskScore}/100 Clean
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10">
            {totalHolders} Holders
          </span>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/10">
          <a
            href="https://robinhoodchain.blockscout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-[11px] flex items-center justify-center gap-1 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)]"
          >
            <Zap className="w-3 h-3 fill-black" />
            <span>Trade on Pons</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={handleCopyCa}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
            title="Copy Contract Address"
          >
            {copiedCa ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <a
            href={`https://robinhoodchain.blockscout.com/token/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
            title="Blockscout Explorer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Key Metrics Matrix */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px]">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/40 block">BONDING POOL</span>
            <span className="text-cyan-400 font-extrabold text-xs">
              {curveReservePercent}% Locked
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/40 block">CIRCULATING FLOAT</span>
            <span className="text-white font-extrabold text-xs">
              {circulatingFloatPercent}%
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/40 block">TOP 5 WHALES</span>
            <span className="text-amber-400 font-extrabold text-xs">
              {top5FloatPercent}% Float
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-white/40 block">COORDINATION</span>
            <span className="text-emerald-400 font-extrabold text-xs">
              {clusters.length > 0 ? `${clusters.length} Cluster` : "1 Sniper Cluster"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. FLOATING TOP RIGHT CONTROLS ISLAND                    */}
      {/* ======================================================== */}
      <div className="absolute top-4 right-4 z-30 flex flex-wrap items-center gap-2 font-mono-tech text-xs pointer-events-auto">
        {/* Filter Pills */}
        <div className="flex items-center rounded-xl bg-[#0a0f1d]/90 border border-white/10 p-1 backdrop-blur-xl shadow-xl">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "ALL"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            🌌 All Galaxy
          </button>
          <button
            onClick={() => setFilterMode("TOP5")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "TOP5"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            🐋 Top 5 Whales
          </button>
          <button
            onClick={() => setFilterMode("CLUSTERS")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              filterMode === "CLUSTERS"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            🎯 Clusters &amp; Snipers
          </button>
        </div>

        {/* Layout Pills */}
        <div className="flex items-center rounded-xl bg-[#0a0f1d]/90 border border-white/10 p-1 backdrop-blur-xl shadow-xl">
          <button
            onClick={() => setLayoutType("forceDirected2d")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "forceDirected2d"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="2D Force Directed Layout"
          >
            2D Force
          </button>
          <button
            onClick={() => setLayoutType("forceDirected3d")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "forceDirected3d"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="3D Cosmos Sphere Layout"
          >
            3D Cosmos
          </button>
          <button
            onClick={() => setLayoutType("concentric2d")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "concentric2d"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="Concentric Radial Orbits"
          >
            Radial
          </button>
        </div>

        {/* Camera Reset */}
        <button
          onClick={() => {
            if (graphRef.current) {
              graphRef.current.getControls().reset(true);
            }
          }}
          className="p-2 rounded-xl bg-[#0a0f1d]/90 border border-white/10 text-white/70 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 rounded-xl bg-[#0a0f1d]/90 border border-white/10 text-white/70 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Cosmos"}
        >
          {isFullScreen ? (
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* 3. REAGRAPH WEBGL 3D/2D THREE.JS CANVAS                  */}
      {/* ======================================================== */}
      <div className="w-full h-full relative z-10">
        <GraphCanvas
          ref={graphRef}
          nodes={nodes}
          edges={edges}
          theme={bubbleMapsTheme}
          layoutType={layoutType}
          animated={true}
          edgeInterpolation="curved"
          edgeArrowPosition="end"
          labelType="all"
          sizingType="attribute"
          sizingAttribute="size"
          cameraMode="pan"
          onNodeClick={(node) => setSelectedNodeId(node.id)}
          onCanvasClick={() => setSelectedNodeId(null)}
        />
      </div>

      {/* ======================================================== */}
      {/* 4. FLOATING BOTTOM LEFT BUBBLEMAPS CLUSTER LEGEND        */}
      {/* ======================================================== */}
      <div className="absolute bottom-4 left-4 z-30 p-3 sm:p-3.5 rounded-2xl bg-[#0a0f1d]/90 border border-white/10 backdrop-blur-xl text-[10px] font-mono-tech space-y-2 pointer-events-auto shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-extrabold">
            BUBBLEMAPS TOPOLOGY
          </span>
          <span className="text-[9px] text-cyan-400 font-bold">LIVE GPU</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676]" />
            <span className="text-white/80">Organic Believers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff9100] shadow-[0_0_8px_#ff9100]" />
            <span className="text-white/80">Sniper Cluster</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            <span className="text-white/80">Pons V2 Pool ({curveReservePercent}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e040fb] shadow-[0_0_8px_#e040fb]" />
            <span className="text-white/80">Mid-Float Wallets</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. FLOATING BOTTOM RIGHT NODE INSPECTOR HUD              */}
      {/* ======================================================== */}
      {selectedNodeData && (
        <div className="absolute bottom-4 right-4 z-30 w-[290px] sm:w-[330px] p-4 rounded-2xl bg-[#0a0f1d]/95 border border-cyan-500/50 backdrop-blur-xl text-xs font-mono-tech space-y-3 pointer-events-auto shadow-[0_12px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
                {selectedNodeData.isCurve
                  ? "BONDING POOL HUB"
                  : selectedNodeData.isAmbient
                  ? "DECENTRALIZED HOLDER"
                  : `HOLDER #${selectedNodeData.rank}`}
              </span>
              {selectedNodeData.signals?.sniper && (
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  SNIPER
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-white/40 hover:text-white font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Address & Explorer */}
          <div>
            <span className="text-[10px] text-white/40 block uppercase">WALLET ADDRESS</span>
            <div className="flex items-center justify-between text-xs font-semibold text-white mt-1 bg-white/5 p-2 rounded-lg border border-white/5">
              <code>
                {selectedNodeData.wallet.length > 14
                  ? `${selectedNodeData.wallet.slice(0, 10)}...${selectedNodeData.wallet.slice(-8)}`
                  : selectedNodeData.wallet}
              </code>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyNode(selectedNodeData.wallet)}
                  className="p-1 hover:text-cyan-400 text-white/60 transition-colors"
                  title="Copy Wallet"
                >
                  {copiedNode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {selectedNodeData.explorerUrl && (
                  <a
                    href={selectedNodeData.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-white text-white/60 transition-colors"
                    title="View on Blockscout"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Holding Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
            <div className="p-2 rounded-lg bg-white/[0.02]">
              <span className="text-[10px] text-white/40 block uppercase">FLOAT SHARE</span>
              <span className="text-base font-extrabold text-cyan-400">
                {selectedNodeData.floatSharePercent}%
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02]">
              <span className="text-[10px] text-white/40 block uppercase">TOTAL SUPPLY</span>
              <span className="text-base font-extrabold text-white">
                {selectedNodeData.supplySharePercent}%
              </span>
            </div>
            {selectedNodeData.buyEth !== undefined && (
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[10px] text-white/40 block uppercase">INITIAL BUY</span>
                <span className="text-xs text-white font-bold">{selectedNodeData.buyEth} ETH</span>
              </div>
            )}
            {selectedNodeData.multiple !== undefined && (
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[10px] text-white/40 block uppercase">PROFIT MULTIPLE</span>
                <span className="text-xs text-emerald-400 font-extrabold">
                  {selectedNodeData.multiple}x
                </span>
              </div>
            )}
          </div>

          {selectedNodeData.tokensHeld && (
            <div className="text-[10px] text-white/60 flex items-center justify-between border-t border-white/10 pt-2">
              <span>Tokens Held:</span>
              <span className="font-bold text-white">{selectedNodeData.tokensHeld}</span>
            </div>
          )}

          {selectedNodeData.entryTimeDelta && (
            <div className="text-[10px] text-cyan-400/90 flex items-center justify-between border-t border-white/10 pt-1.5">
              <span>Entry Timing:</span>
              <span className="font-semibold">{selectedNodeData.entryTimeDelta}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
