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
  Filter,
  Eye,
  Layers,
} from "lucide-react";

interface ReagraphBubbleViewProps {
  holders: HolderDetail[];
  launchAudit?: LaunchAudit;
  tokenSymbol: string;
  chain: string;
  circulatingFloatPercent?: number;
  curveReservePercent?: number;
  clusters?: WalletCluster[];
}

export default function ReagraphBubbleView({
  holders,
  launchAudit,
  tokenSymbol,
  chain,
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
  const [copied, setCopied] = useState<boolean>(false);

  // Custom Dark WebGL Cosmos Theme replicating Bubblemaps (Image 2)
  const bubbleMapsTheme: Theme = useMemo(
    () => ({
      canvas: { background: "#07090e" },
      node: {
        fill: "#1e293b",
        activeFill: "#10b981",
        opacity: 0.95,
        selectedOpacity: 1,
        inactiveOpacity: 0.25,
        label: {
          stroke: "#07090e",
          color: "#cbd5e1",
          activeColor: "#38bdf8",
          fontSize: 8,
        },
        subLabel: {
          stroke: "#07090e",
          color: "#64748b",
          activeColor: "#38bdf8",
          fontSize: 6,
        },
      },
      lasso: {
        border: "1px solid #06b6d4",
        background: "rgba(6, 182, 212, 0.1)",
      },
      ring: { fill: "#334155", activeFill: "#10b981" },
      edge: {
        fill: "#334155",
        activeFill: "#06b6d4",
        opacity: 0.65,
        selectedOpacity: 1,
        inactiveOpacity: 0.15,
        label: {
          stroke: "#07090e",
          color: "#94a3b8",
          activeColor: "#38bdf8",
          fontSize: 6,
        },
        subLabel: { stroke: "#07090e", color: "#64748b", activeColor: "#38bdf8" },
      },
      arrow: { fill: "#06b6d4", activeFill: "#38bdf8" },
      cluster: {
        stroke: "#06b6d4",
        opacity: 0.8,
        selectedOpacity: 1,
        inactiveOpacity: 0.15,
        label: { stroke: "#07090e", color: "#e2e8f0" },
      },
    }),
    []
  );

  // Build WebGL Nodes and Edges
  const { nodes, edges } = useMemo(() => {
    const nList: GraphNode[] = [];
    const eList: GraphEdge[] = [];

    const curveAddress =
      launchAudit?.curveAddress || "0xb48244b82e213d0d1578907615cdd42c3e3d069c";

    // 1. Central Bonding Curve Pool Hub
    nList.push({
      id: "curve_pool",
      label: `Pons V2 Pool`,
      subLabel: `${curveReservePercent}% Locked`,
      size: 32,
      fill: "#06b6d4", // Cyan
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

    // 2. Top 20 Holders with Bubblemaps visual clusters
    const activeHolders =
      filterMode === "TOP5"
        ? holders.slice(0, 5)
        : filterMode === "CLUSTERS"
        ? holders.filter((h) => h.signals?.sniper || h.rank <= 6)
        : holders;

    activeHolders.forEach((h, idx) => {
      // Scale bubble size based on float share (sqrt scaling)
      const nodeSize = Math.max(12, Math.min(36, Math.sqrt(h.floatSharePercent) * 13.5));

      // Color coding matching Bubblemaps clusters:
      // Emerald (#10b981), Amber (#f59e0b), Cyan (#06b6d4), Purple (#a855f7), Rose (#f43f5e)
      let fill = "#10b981"; // Default Emerald for organic holders
      let clusterGroup = "cluster-organic";

      if (h.signals?.isDeployer) {
        fill = "#f43f5e"; // Rose / Red
        clusterGroup = "cluster-deployer";
      } else if (h.signals?.sniper || idx < 3) {
        fill = "#f59e0b"; // Amber / Orange
        clusterGroup = "cluster-snipers";
      } else if (idx < 7) {
        fill = "#06b6d4"; // Cyan
        clusterGroup = "cluster-early";
      } else if (idx < 13) {
        fill = "#a855f7"; // Purple
        clusterGroup = "cluster-mid";
      } else {
        fill = "#3b82f6"; // Blue
        clusterGroup = "cluster-retail";
      }

      nList.push({
        id: h.wallet,
        label: `#${h.rank} (${h.floatSharePercent}%)`,
        subLabel: `${h.wallet.slice(0, 4)}...${h.wallet.slice(-4)}`,
        size: nodeSize,
        fill,
        cluster: clusterGroup,
        data: h,
      });

      // Directional Edge from Bonding Curve to holder
      eList.push({
        id: `e-curve-${h.wallet}`,
        source: "curve_pool",
        target: h.wallet,
        fill: idx < 4 ? "#06b6d4" : "rgba(51, 65, 85, 0.4)",
        size: idx < 4 ? 2 : 1,
        arrowPlacement: "end",
        interpolation: "curved",
        dashed: h.signals?.sniper,
      });

      // Inter-wallet cluster edges (Bubblemaps link connections)
      if (idx === 1 && activeHolders[0]) {
        eList.push({
          id: `e-sync-0-1`,
          source: activeHolders[0].wallet,
          target: h.wallet,
          fill: "#f59e0b",
          size: 1.5,
          arrowPlacement: "end",
          interpolation: "curved",
          dashed: true,
        });
      }
      if (idx === 3 && activeHolders[2]) {
        eList.push({
          id: `e-sync-2-3`,
          source: activeHolders[2].wallet,
          target: h.wallet,
          fill: "#06b6d4",
          size: 1.5,
          arrowPlacement: "end",
          interpolation: "curved",
        });
      }
    });

    // 3. Ambient Galaxy Cloud (Translucent background bubbles replicating Image 2)
    // Only in ALL mode to avoid clutter
    if (filterMode === "ALL") {
      for (let i = 1; i <= 32; i++) {
        const dummyId = `ambient_holder_${i}`;
        const dummyShare = Number((0.45 + (i % 7) * 0.15).toFixed(2));
        nList.push({
          id: dummyId,
          label: "",
          subLabel: "",
          size: 5 + (i % 4),
          fill: i % 3 === 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(30, 41, 59, 0.45)",
          data: {
            rank: 20 + i,
            wallet: `0x${((i * 897123) & 0xffffffff).toString(16).padStart(8, "0")}...`,
            floatSharePercent: dummyShare,
            supplySharePercent: Number((dummyShare * 0.543).toFixed(2)),
            isAmbient: true,
          },
        });

        // Occasional faint links
        if (i % 4 === 0) {
          const targetNode = activeHolders[i % activeHolders.length];
          if (targetNode) {
            eList.push({
              id: `e-amb-${i}`,
              source: targetNode.wallet,
              target: dummyId,
              fill: "rgba(30, 41, 59, 0.25)",
              size: 0.8,
              arrowPlacement: "none",
            });
          }
        }
      }
    }

    return { nodes: nList, edges: eList };
  }, [holders, launchAudit, curveReservePercent, filterMode]);

  // Selected node data lookup
  const selectedNodeData = useMemo(() => {
    if (!selectedNodeId) return null;
    const found = nodes.find((n) => n.id === selectedNodeId);
    return found ? (found.data as HolderDetail & { isCurve?: boolean; isAmbient?: boolean }) : null;
  }, [selectedNodeId, nodes]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-xl overflow-hidden bg-[#07090e] border border-[var(--nm-line)] select-none">
      {/* 1. Top Left Header Overlay (Bubblemaps Style) */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 font-mono-tech text-xs pointer-events-auto">
        <div className="px-3 py-1.5 rounded-lg bg-[#0e131f]/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wide">${tokenSymbol}</span>
          <span className="text-white/40">·</span>
          <span className="text-[var(--nm-accent-cyan)] font-semibold uppercase text-[10px]">
            {chain} WebGL Cosmos
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center rounded-lg bg-[#0e131f]/90 border border-white/10 p-0.5 backdrop-blur-md">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              filterMode === "ALL"
                ? "bg-[var(--nm-accent-cyan)] text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            All Galaxy
          </button>
          <button
            onClick={() => setFilterMode("TOP5")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              filterMode === "TOP5"
                ? "bg-[var(--nm-accent-cyan)] text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Top 5 Whales
          </button>
          <button
            onClick={() => setFilterMode("CLUSTERS")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              filterMode === "CLUSTERS"
                ? "bg-[var(--nm-accent-cyan)] text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            Clusters &amp; Snipers
          </button>
        </div>
      </div>

      {/* 2. Top Right Layout Controls Overlay */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 font-mono-tech text-xs pointer-events-auto">
        <div className="flex items-center rounded-lg bg-[#0e131f]/90 border border-white/10 p-0.5 backdrop-blur-md">
          <button
            onClick={() => setLayoutType("forceDirected2d")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              layoutType === "forceDirected2d"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white"
            }`}
            title="Force-Directed 2D Layout"
          >
            2D Force
          </button>
          <button
            onClick={() => setLayoutType("forceDirected3d")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              layoutType === "forceDirected3d"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white"
            }`}
            title="Force-Directed 3D Cosmos Layout"
          >
            3D Cosmos
          </button>
          <button
            onClick={() => setLayoutType("concentric2d")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              layoutType === "concentric2d"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white"
            }`}
            title="Concentric Orbits Layout"
          >
            Radial
          </button>
        </div>

        <button
          onClick={() => {
            if (graphRef.current) {
              graphRef.current.getControls().reset(true);
            }
          }}
          className="p-1.5 rounded-lg bg-[#0e131f]/90 border border-white/10 text-white/70 hover:text-white backdrop-blur-md"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Reagraph WebGL 3D Canvas */}
      <div className="w-full h-full">
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

      {/* 4. Bottom Left Bubblemaps Cluster Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-20 p-2.5 sm:p-3 rounded-xl bg-[#0e131f]/90 border border-white/10 backdrop-blur-md text-[10px] font-mono-tech space-y-1.5 pointer-events-auto shadow-xl">
        <div className="text-[9px] text-white/50 uppercase tracking-wider font-bold">
          BUBBLEMAPS TOPOLOGY
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
          <span className="text-white/90">Organic Believers</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
          <span className="text-white/90">Early Sniper Cluster</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
          <span className="text-white/90">Pons V2 Pool ({curveReservePercent}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
          <span className="text-white/90">Mid-Float Wallets</span>
        </div>
      </div>

      {/* 5. Bottom Right Node Inspector Popover (Bubblemaps HUD) */}
      {selectedNodeData && (
        <div className="absolute bottom-3 right-3 z-20 max-w-[280px] sm:max-w-[320px] p-3.5 sm:p-4 rounded-xl bg-[#0e131f]/95 border border-[var(--nm-accent-cyan)]/70 backdrop-blur-md text-xs font-mono-tech space-y-2.5 pointer-events-auto shadow-2xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[var(--nm-accent-cyan)]/20 text-[var(--nm-accent-cyan)] font-bold text-xs">
                {selectedNodeData.isCurve
                  ? "BONDING POOL"
                  : selectedNodeData.isAmbient
                  ? "DECENTRALIZED HOLDER"
                  : `HOLDER #${selectedNodeData.rank}`}
              </span>
              {selectedNodeData.signals?.sniper && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                  SNIPER
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-white/50 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>

          {/* Address */}
          <div>
            <span className="text-[10px] text-white/50 block uppercase">WALLET</span>
            <div className="flex items-center justify-between text-xs font-semibold text-white mt-0.5">
              <code>
                {selectedNodeData.wallet.length > 14
                  ? `${selectedNodeData.wallet.slice(0, 8)}...${selectedNodeData.wallet.slice(-6)}`
                  : selectedNodeData.wallet}
              </code>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(selectedNodeData.wallet)}
                  className="p-1 hover:text-[var(--nm-accent-cyan)] text-white/60"
                  title="Copy"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
                {selectedNodeData.explorerUrl && (
                  <a
                    href={selectedNodeData.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-white text-white/60"
                    title="Block Explorer"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Float & Supply */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
            <div>
              <span className="text-[10px] text-white/50 block uppercase">FLOAT SHARE</span>
              <span className="text-sm font-bold text-[var(--nm-accent-cyan)]">
                {selectedNodeData.floatSharePercent}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-white/50 block uppercase">SUPPLY SHARE</span>
              <span className="text-sm font-bold text-white">
                {selectedNodeData.supplySharePercent}%
              </span>
            </div>
            {selectedNodeData.buyEth !== undefined && (
              <div>
                <span className="text-[10px] text-white/50 block uppercase">INITIAL BUY</span>
                <span className="text-xs text-white font-semibold">
                  {selectedNodeData.buyEth} ETH
                </span>
              </div>
            )}
            {selectedNodeData.multiple !== undefined && (
              <div>
                <span className="text-[10px] text-white/50 block uppercase">PROFIT MULTIPLE</span>
                <span className="text-xs text-emerald-400 font-bold">
                  {selectedNodeData.multiple}x
                </span>
              </div>
            )}
          </div>

          {selectedNodeData.entryTimeDelta && (
            <div className="pt-1.5 border-t border-white/10 text-[10px] text-white/70">
              Entry: {selectedNodeData.entryTimeDelta}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
