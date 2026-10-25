"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Graph, register, ExtensionCategory, Quadratic, Line, NodeEvent, CanvasEvent } from "@antv/g6";
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
  Zap,
  Activity,
  Play,
  Pause,
} from "lucide-react";

// Register custom Animated Flowing Quadratic Edge in AntV G6
let isEdgeRegistered = false;
function registerCustomEdges() {
  if (isEdgeRegistered || typeof window === "undefined") return;
  try {
    class FlowQuadraticEdge extends Quadratic {
      render(attributes: any, container: any) {
        super.render(attributes, container);
        const keyShape = this.getShape("key");
        if (keyShape && !(keyShape as any).__animated) {
          (keyShape as any).__animated = true;
          try {
            keyShape.animate(
              [{ lineDashOffset: 28 }, { lineDashOffset: 0 }],
              {
                duration: 1200,
                iterations: Infinity,
              }
            );
          } catch (e) {
            // fallback if animate not supported in current context
          }
        }
      }
    }

    register(ExtensionCategory.EDGE, "flow-quadratic-edge", FlowQuadraticEdge as any);
    isEdgeRegistered = true;
  } catch (err) {
    // Already registered or registration failed silently
    isEdgeRegistered = true;
  }
}

interface AntVG6BubbleViewProps {
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

export default function AntVG6BubbleView({
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
}: AntVG6BubbleViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);
  const [filterMode, setFilterMode] = useState<"ALL" | "TOP5" | "CLUSTERS">("ALL");
  const [layoutType, setLayoutType] = useState<"d3-force" | "radial" | "concentric">("d3-force");
  const [copiedCa, setCopiedCa] = useState<boolean>(false);
  const [copiedNode, setCopiedNode] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFlowing, setIsFlowing] = useState<boolean>(true);

  // Register the custom animated edge once in browser
  useEffect(() => {
    registerCustomEdges();
  }, []);

  // Top 5 float share sum
  const top5FloatPercent = useMemo(() => {
    return holders.slice(0, 5).reduce((acc, h) => acc + (h.floatSharePercent || 0), 0).toFixed(1);
  }, [holders]);

  // Construct AntV G6 Graph Data
  const graphData = useMemo(() => {
    const curveAddress =
      launchAudit?.curveAddress || "0xb48244b82e213d0d1578907615cdd42c3e3d069c";

    const nodes: any[] = [];
    const edges: any[] = [];

    // 1. Central Bonding Curve Pool Hub Node (Dominant Glowing Sun)
    nodes.push({
      id: "curve_pool",
      data: {
        rank: 0,
        isCurve: true,
        wallet: curveAddress,
        label: "Pons V2 Pool",
        floatSharePercent: 0,
        supplySharePercent: curveReservePercent,
        tokensHeld: `${curveReservePercent}% Reserve Locked`,
        explorerUrl: `https://robinhoodchain.blockscout.com/address/${curveAddress}`,
        color: "#00e5ff",
      },
      style: {
        size: 64,
        fill: "#00e5ff",
        stroke: "#ffffff",
        lineWidth: 3,
        halo: true,
        haloStroke: "#00e5ff",
        haloLineWidth: 18,
        haloStrokeOpacity: 0.4,
        labelText: "Pons V2 Pool",
        labelFill: "#ffffff",
        labelFontSize: 11,
        labelFontWeight: "bold",
        labelPlacement: "bottom",
        labelBackground: true,
        labelBackgroundFill: "#0a0f1d",
        labelBackgroundOpacity: 0.9,
        labelBackgroundPadding: [2, 6, 2, 6],
        labelBackgroundRadius: 4,
        badge: true,
        badgeText: "POOL",
        badgeFill: "#000000",
        badgeBackgroundFill: "#00e5ff",
        badgeFontSize: 8,
      },
    });

    // 2. Active Holders based on filter
    const activeHolders =
      filterMode === "TOP5"
        ? holders.slice(0, 5)
        : filterMode === "CLUSTERS"
        ? holders.filter((h) => h.signals?.sniper || h.rank <= 6)
        : holders;

    activeHolders.forEach((h, idx) => {
      // Sizing scale: square root scaling
      const nodeSize = Math.max(22, Math.min(48, Math.sqrt(h.floatSharePercent) * 16.5));

      // Saturated Neon Color Mapping
      let fill = "#00e676"; // Neon Emerald
      let badgeLabel = "";
      let badgeColor = "#00e676";

      if (h.signals?.isDeployer) {
        fill = "#ff1744"; // Neon Red
        badgeLabel = "DEV";
        badgeColor = "#ff1744";
      } else if (h.signals?.sniper || idx < 2) {
        fill = "#ff9100"; // Neon Amber
        badgeLabel = h.signals?.sniper ? "SNIPER" : "WHALE";
        badgeColor = "#ff9100";
      } else if (idx < 5) {
        fill = "#00e5ff"; // Electric Cyan
        badgeLabel = "EARLY";
        badgeColor = "#00e5ff";
      } else if (idx < 12) {
        fill = "#e040fb"; // Neon Purple / Fuchsia
        badgeLabel = "";
        badgeColor = "#e040fb";
      } else {
        fill = "#00e676"; // Neon Emerald
        badgeLabel = "";
        badgeColor = "#00e676";
      }

      nodes.push({
        id: h.wallet,
        data: {
          ...h,
          color: fill,
          isCurve: false,
          isAmbient: false,
        },
        style: {
          size: nodeSize,
          fill,
          stroke: "#ffffff",
          lineWidth: idx < 5 ? 2.5 : 1.5,
          halo: true,
          haloStroke: fill,
          haloLineWidth: idx < 3 ? 14 : 8,
          haloStrokeOpacity: 0.35,
          labelText: `#${h.rank} · ${h.floatSharePercent}%`,
          labelFill: "#ffffff",
          labelFontSize: 9,
          labelFontWeight: "bold",
          labelPlacement: "bottom",
          labelBackground: true,
          labelBackgroundFill: "#0a0f1d",
          labelBackgroundOpacity: 0.85,
          labelBackgroundPadding: [2, 4, 2, 4],
          labelBackgroundRadius: 3,
          badge: Boolean(badgeLabel),
          badgeText: badgeLabel,
          badgeFill: "#000000",
          badgeBackgroundFill: badgeColor,
          badgeFontSize: 7,
        },
      });

      // Directional Flow Edge from Curve Pool to Wallet with moving currents
      edges.push({
        id: `e-curve-${h.wallet}`,
        source: "curve_pool",
        target: h.wallet,
        type: "flow-quadratic-edge",
        style: {
          stroke: idx < 3 ? "#00e5ff" : "rgba(71, 85, 105, 0.6)",
          lineWidth: idx < 3 ? 2.5 : 1.5,
          lineDash: isFlowing ? [8, 6] : undefined,
          curveOffset: (idx % 2 === 0 ? 1 : -1) * 25,
          endArrow: true,
          halo: true,
          haloStroke: idx < 3 ? "#00e5ff" : "#334155",
          haloLineWidth: 4,
          haloStrokeOpacity: 0.25,
        },
      });

      // Synchronized Clustered Edges between early synchronized wallets
      if (idx === 1 && activeHolders[0]) {
        edges.push({
          id: `e-sync-cabal-0-1`,
          source: activeHolders[0].wallet,
          target: h.wallet,
          type: "flow-quadratic-edge",
          style: {
            stroke: "#ff9100",
            lineWidth: 2.5,
            lineDash: isFlowing ? [6, 4] : undefined,
            curveOffset: 35,
            endArrow: true,
            halo: true,
            haloStroke: "#ff9100",
            haloLineWidth: 6,
            haloStrokeOpacity: 0.35,
          },
        });
      }
      if (idx === 3 && activeHolders[2]) {
        edges.push({
          id: `e-sync-cabal-2-3`,
          source: activeHolders[2].wallet,
          target: h.wallet,
          type: "flow-quadratic-edge",
          style: {
            stroke: "#00e5ff",
            lineWidth: 2,
            lineDash: isFlowing ? [6, 4] : undefined,
            curveOffset: -30,
            endArrow: true,
          },
        });
      }
    });

    // 3. Ambient Galaxy Tail (Only in ALL mode to give cosmic backdrop)
    if (filterMode === "ALL") {
      for (let i = 1; i <= 36; i++) {
        const dummyId = `ambient_holder_${i}`;
        const dummyShare = Number((0.35 + (i % 6) * 0.12).toFixed(2));
        nodes.push({
          id: dummyId,
          data: {
            rank: 20 + i,
            wallet: `0x${((i * 928371) & 0xffffffff).toString(16).padStart(8, "0")}...`,
            floatSharePercent: dummyShare,
            supplySharePercent: Number((dummyShare * 0.543).toFixed(2)),
            isAmbient: true,
            isCurve: false,
            color: i % 3 === 0 ? "rgba(0, 230, 118, 0.4)" : "rgba(71, 85, 105, 0.4)",
          },
          style: {
            size: 8 + (i % 5),
            fill: i % 3 === 0 ? "rgba(0, 230, 118, 0.45)" : "rgba(51, 65, 85, 0.45)",
            stroke: "rgba(100, 116, 139, 0.3)",
            lineWidth: 1,
            labelText: "",
          },
        });

        // Faint constellation links
        if (i % 5 === 0) {
          const targetNode = activeHolders[i % activeHolders.length];
          if (targetNode) {
            edges.push({
              id: `e-amb-${i}`,
              source: targetNode.wallet,
              target: dummyId,
              type: "line",
              style: {
                stroke: "rgba(51, 65, 85, 0.25)",
                lineWidth: 0.8,
                lineDash: [3, 3],
              },
            });
          }
        }
      }
    }

    return { nodes, edges };
  }, [holders, launchAudit, curveReservePercent, filterMode, isFlowing]);

  // Layout Configuration
  const layoutConfig = useMemo(() => {
    if (layoutType === "radial") {
      return {
        type: "radial",
        unitRadius: 140,
        preventOverlap: true,
        maxPreventOverlapIteration: 200,
        nodeSize: 45,
      };
    }
    if (layoutType === "concentric") {
      return {
        type: "concentric",
        preventOverlap: true,
        nodeSize: 40,
        minNodeSpacing: 35,
      };
    }
    // Default physics d3-force layout
    return {
      type: "d3-force",
      preventOverlap: true,
      linkDistance: (d: any) => (d.source === "curve_pool" ? 175 : 90),
      nodeStrength: -280,
      edgeStrength: 0.35,
      collideStrength: 0.85,
      alphaMin: 0.005,
    };
  }, [layoutType]);

  // Initialize and Update AntV G6 Graph Instance
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 650;

    // Create G6 Graph
    const graph = new Graph({
      container,
      width,
      height,
      autoResize: true,
      background: "#030712",
      data: graphData,
      layout: layoutConfig,
      behaviors: [
        "drag-canvas",
        "zoom-canvas",
        "drag-element",
        "hover-activate",
        "click-select",
      ],
      node: {
        state: {
          active: {
            halo: true,
            haloLineWidth: 24,
            haloStrokeOpacity: 0.65,
          },
          selected: {
            halo: true,
            haloLineWidth: 28,
            haloStrokeOpacity: 0.85,
          },
        },
      },
      edge: {
        state: {
          active: {
            lineWidth: 3.5,
            halo: true,
            haloLineWidth: 8,
            haloStrokeOpacity: 0.5,
          },
        },
      },
      animation: {
        duration: 800,
      },
    });

    graphRef.current = graph;

    // Event Listeners
    graph.on(NodeEvent.CLICK, (evt: any) => {
      const nodeId = evt.target?.id || evt.targetId;
      if (!nodeId) return;

      const foundNode = graphData.nodes.find((n) => n.id === nodeId);
      if (foundNode && foundNode.data) {
        setSelectedNodeData(foundNode.data);
      }
    });

    graph.on(CanvasEvent.CLICK, () => {
      setSelectedNodeData(null);
    });

    // Render Graph
    graph.render().catch(() => {});

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (container && graphRef.current) {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
          graphRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
    };
  }, [graphData, layoutConfig]);

  const handleResetCamera = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.fitView();
    }
  }, []);

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
            "radial-gradient(circle at 48% 48%, rgba(0, 229, 255, 0.08) 0%, rgba(224, 64, 251, 0.05) 35%, rgba(3, 7, 18, 0.98) 85%)",
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
      {/* 1. FLOATING LEFT TOKEN DOSSIER HUD                       */}
      {/* ======================================================== */}
      <div className="absolute top-4 left-4 z-30 w-[270px] sm:w-[310px] p-3.5 sm:p-4 rounded-2xl bg-[#0a0f1d]/90 border border-white/10 backdrop-blur-xl text-white font-mono-tech space-y-3 pointer-events-auto shadow-[0_12px_36px_rgba(0,0,0,0.7)] animate-in fade-in duration-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_14px_rgba(0,229,255,0.4)] shrink-0 border border-cyan-400/30">
            {tokenSymbol.slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wide truncate">
                ${tokenSymbol}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-bold border border-cyan-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                ANTV G6
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
        {/* Animated Flow Toggle */}
        <button
          onClick={() => setIsFlowing(!isFlowing)}
          className={`px-2.5 py-1.5 rounded-xl border text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-xl shadow-xl transition-all ${
            isFlowing
              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              : "bg-[#0a0f1d]/90 border-white/10 text-white/50 hover:text-white"
          }`}
          title="Toggle Animated Edge Flowing Dash"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>{isFlowing ? "FLOW ANIMATION: ON" : "FLOW: OFF"}</span>
        </button>

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
            onClick={() => setLayoutType("d3-force")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "d3-force"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="D3 Physics Force Layout"
          >
            Force
          </button>
          <button
            onClick={() => setLayoutType("radial")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "radial"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="Radial Orbits"
          >
            Radial
          </button>
          <button
            onClick={() => setLayoutType("concentric")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              layoutType === "concentric"
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white"
            }`}
            title="Concentric Circles"
          >
            Concentric
          </button>
        </div>

        {/* Reset Camera */}
        <button
          onClick={handleResetCamera}
          className="p-2 rounded-xl bg-[#0a0f1d]/90 border border-white/10 text-white/70 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          title="Auto Fit & Reset Camera"
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
      {/* 3. ANTV G6 CANVAS CONTAINER                              */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
      />

      {/* ======================================================== */}
      {/* 4. FLOATING BOTTOM LEFT BUBBLEMAPS CLUSTER LEGEND        */}
      {/* ======================================================== */}
      <div className="absolute bottom-4 left-4 z-30 p-3 sm:p-3.5 rounded-2xl bg-[#0a0f1d]/90 border border-white/10 backdrop-blur-xl text-[10px] font-mono-tech space-y-2 pointer-events-auto shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] text-white/40 uppercase tracking-wider font-extrabold">
            ANTV G6 TOPOLOGY
          </span>
          <span className="text-[9px] text-cyan-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            ANIMATED FLOWS
          </span>
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
              onClick={() => setSelectedNodeData(null)}
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
                {selectedNodeData.wallet && selectedNodeData.wallet.length > 14
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
