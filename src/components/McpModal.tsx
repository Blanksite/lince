"use client";

import React, { useState } from "react";
import { Cpu, X, Copy, Check } from "lucide-react";

interface McpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function McpModal({ isOpen, onClose }: McpModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const cursorConfig = {
    mcpServers: {
      lince: {
        url: "https://lince-crypto.vercel.app/api/mcp",
        transport: "http",
      },
    },
  };

  const claudeConfig = {
    mcpServers: {
      lince: {
        command: "npx",
        args: ["-y", "mcp-proxy-http", "https://lince-crypto.vercel.app/api/mcp"],
      },
    },
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0E111A] border border-[#1E2332] rounded-2xl p-6 shadow-2xl text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2332]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Model Context Protocol (MCP) Setup</h3>
              <p className="text-xs text-neutral-400 font-mono">
                Connect Lince crypto intelligence directly to Cursor, Claude Desktop, or Windsurf.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tools overview */}
        <div className="mb-5">
          <span className="text-xs font-mono text-neutral-400 block mb-2 font-semibold">
            AVAILABLE MCP TOOLS:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-[#141824] border border-[#1E2332]">
              <span className="text-cyan-400 font-bold">lince_get_narratives</span>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Sector rankings by mindshare % &amp; 24h velocity.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#141824] border border-[#1E2332]">
              <span className="text-emerald-400 font-bold">lince_get_alpha_divergence</span>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Tokens where social buzz disconnected from price.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#141824] border border-[#1E2332]">
              <span className="text-purple-400 font-bold">lince_get_kols</span>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Top crypto KOL calls, verified hit-rates, and theses.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#141824] border border-[#1E2332]">
              <span className="text-amber-400 font-bold">lince_get_social_platforms</span>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                X vs Telegram vs Farcaster conversation volume share.
              </p>
            </div>
          </div>
        </div>

        {/* Cursor Config */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
            <span>FOR CURSOR (~/.cursor/mcp.json):</span>
            <button
              onClick={() =>
                copyToClipboard(JSON.stringify(cursorConfig, null, 2), "cursor")
              }
              className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
            >
              {copied === "cursor" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2332] text-xs font-mono text-neutral-300 overflow-x-auto">
            {JSON.stringify(cursorConfig, null, 2)}
          </pre>
        </div>

        {/* Claude Desktop Config */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
            <span>FOR CLAUDE DESKTOP (claude_desktop_config.json):</span>
            <button
              onClick={() =>
                copyToClipboard(JSON.stringify(claudeConfig, null, 2), "claude")
              }
              className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
            >
              {copied === "claude" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2332] text-xs font-mono text-neutral-300 overflow-x-auto">
            {JSON.stringify(claudeConfig, null, 2)}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141824] hover:bg-[#1E2332] text-xs font-mono font-bold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
