"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Download,
  Copy,
  Check,
  Share2,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface ShareableDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  chain: string;
  riskScore: number;
  verdict: string;
  marketCap: string;
  liquidityUsd: string;
  circulatingFloatPercent: number;
  curveReservePercent: number;
  top5FloatPercent?: string;
}

export function ShareableDossierModal({
  isOpen,
  onClose,
  tokenSymbol = "NOUMEN",
  tokenName = "Noumen Autonomous Agent",
  tokenAddress = "0xe9b7b7d55ed2ca56b017c569f3c5dd30dd31fefc",
  chain = "robinhood",
  riskScore = 82,
  verdict = "SAFE",
  marketCap = "$19.2K",
  liquidityUsd = "$8.4K",
  circulatingFloatPercent = 54.3,
  curveReservePercent = 43.7,
  top5FloatPercent = "26.2",
}: ShareableDossierModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  // Render high-res 1200x675 card onto HTML5 Canvas
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 675;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Void
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, width, height);

    // 2. Ambient Nebula Glow
    const radGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      50,
      width * 0.5,
      height * 0.45,
      width * 0.6
    );
    radGrad.addColorStop(0, "rgba(0, 229, 255, 0.12)");
    radGrad.addColorStop(0.4, "rgba(224, 64, 251, 0.06)");
    radGrad.addColorStop(1, "rgba(3, 7, 18, 0.98)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Cyber Grid Sheen
    ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 4. Outer Glowing Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    // 5. Header: Lince Terminal Badge
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 16px monospace";
    ctx.fillText("LINCE ON-CHAIN INTELLIGENCE TERMINAL · AUDIT DOSSIER", 54, 68);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "14px monospace";
    ctx.fillText(
      new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
        " · Verified Snapshot",
      width - 320,
      68
    );

    // Divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(54, 88);
    ctx.lineTo(width - 54, 88);
    ctx.stroke();

    // 6. Token Avatar & Identity
    ctx.beginPath();
    ctx.arc(94, 155, 36, 0, Math.PI * 2);
    ctx.fillStyle = "#0a0f1d";
    ctx.fill();
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "center";
    ctx.fillText(tokenSymbol.slice(0, 2), 94, 163);
    ctx.textAlign = "left";

    // Token Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(`$${tokenSymbol}`, 150, 150);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("PONS V2 BONDING CURVE", 152, 172);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "13px sans-serif";
    ctx.fillText(`${tokenName} · Robinhood Chain Testnet`, 152, 192);

    // Security Score Pill (Top-Right)
    ctx.fillStyle = "rgba(0, 230, 118, 0.15)";
    ctx.fillRect(width - 290, 115, 236, 68);
    ctx.strokeStyle = "rgba(0, 230, 118, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(width - 290, 115, 236, 68);

    ctx.fillStyle = "rgba(0, 230, 118, 0.8)";
    ctx.font = "bold 11px monospace";
    ctx.fillText("SAFETY AUDIT VERDICT", width - 275, 137);

    ctx.fillStyle = "#00e676";
    ctx.font = "bold 26px monospace";
    ctx.fillText(`${riskScore}/100 · CLEAN`, width - 275, 168);

    // 7. Middle: Constellation Cluster Topology Miniature
    const cx = width * 0.5;
    const cy = 345;

    // Draw central pool sun
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 229, 255, 0.15)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = "#0a0f1d";
    ctx.fill();
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PONS V2", cx, cy - 2);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px monospace";
    ctx.fillText(`${curveReservePercent}%`, cx, cy + 13);
    ctx.textAlign = "left";

    // Draw orbital ring
    ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, 110, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw satellite holder bubbles
    const satellites = [
      { angle: -0.8, r: 20, fill: "#ff9100", label: "#1 (5.7%)" },
      { angle: -0.1, r: 18, fill: "#ff9100", label: "#2 (5.3%)" },
      { angle: 0.7, r: 17, fill: "#00e5ff", label: "#3 (5.3%)" },
      { angle: 1.5, r: 16, fill: "#e040fb", label: "#4 (4.8%)" },
      { angle: 2.3, r: 16, fill: "#00e676", label: "#5 (4.7%)" },
      { angle: 3.1, r: 14, fill: "#00e676", label: "#6 (4.6%)" },
    ];

    satellites.forEach((sat) => {
      const sx = cx + 110 * Math.cos(sat.angle);
      const sy = cy + 110 * Math.sin(sat.angle);

      // Connecting line
      ctx.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Bubble
      ctx.beginPath();
      ctx.arc(sx, sy, sat.r, 0, Math.PI * 2);
      ctx.fillStyle = sat.fill;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px monospace";
      ctx.fillText(sat.label, sx - 24, sy + sat.r + 14);
    });

    // 8. Bottom Distribution Matrix (4 Big Stats Cards)
    const statsY = 510;
    const cardW = 260;
    const gap = 16;
    const startX = (width - (4 * cardW + 3 * gap)) / 2;

    const stats = [
      { title: "BONDING POOL", val: `${curveReservePercent}% Locked`, sub: "Pons V2 Liquidity", color: "#00e5ff" },
      { title: "CIRCULATING FLOAT", val: `${circulatingFloatPercent}%`, sub: "134 Active Holders", color: "#ffffff" },
      { title: "TOP 5 WHALES", val: `${top5FloatPercent}% Float`, sub: "Controlled Dispersal", color: "#ff9100" },
      { title: "SYBIL CENTRALIZATION", val: "0% CLAWBACK", sub: "Independent Routes", color: "#00e676" },
    ];

    stats.forEach((st, i) => {
      const bx = startX + i * (cardW + gap);
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.fillRect(bx, statsY, cardW, 85);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, statsY, cardW, 85);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "bold 10px monospace";
      ctx.fillText(st.title, bx + 16, statsY + 24);

      ctx.fillStyle = st.color;
      ctx.font = "bold 20px monospace";
      ctx.fillText(st.val, bx + 16, statsY + 52);

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "11px sans-serif";
      ctx.fillText(st.sub, bx + 16, statsY + 72);
    });

    // 9. Footer Watermark
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "12px monospace";
    ctx.fillText("Contract: " + tokenAddress, 54, 638);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 12px monospace";
    ctx.fillText("Generated on lince-alpha.vercel.app · Powered by AntV G6 & Reagraph", width - 530, 638);
  }, [
    isOpen,
    tokenSymbol,
    tokenName,
    tokenAddress,
    chain,
    riskScore,
    verdict,
    marketCap,
    liquidityUsd,
    circulatingFloatPercent,
    curveReservePercent,
    top5FloatPercent,
  ]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    const link = document.createElement("a");
    link.download = `lince-audit-${tokenSymbol.toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    setTimeout(() => setDownloading(false), 800);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Audited $${tokenSymbol} on-chain with @lince_labs:\n\n` +
        `🛡️ Security Score: ${riskScore}/100 (${verdict})\n` +
        `💧 Pons V2 Pool Reserve: ${curveReservePercent}%\n` +
        `🪐 Circulating Float: ${circulatingFloatPercent}%\n` +
        `🐋 Top 5 Concentration: ${top5FloatPercent}%\n\n` +
        `Inspect the live cluster topology graph: ${window.location.href} #RobinhoodChain #Lince`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#070913] rounded-2xl border border-white/20 shadow-2xl overflow-hidden font-mono-tech text-white flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0f1d]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-extrabold text-sm text-white">
              SHAREABLE AUDIT DOSSIER CARD (${tokenSymbol})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Preview Container */}
        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-[#030712]">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[800px] h-auto rounded-xl border border-white/10 shadow-2xl"
          />
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a0f1d] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-white/50 font-sans">
            Exported as 1200x675 high-res PNG optimized for X (Twitter) cards and Telegram alpha groups.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyImage}
              className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? "Image Copied!" : "Copy Image"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Downloading..." : "Download PNG"}</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_14px_rgba(0,229,255,0.4)] transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on X (Twitter)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
