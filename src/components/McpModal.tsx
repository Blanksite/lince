"use client";

import React, { useState } from "react";
import { Cpu, X, Copy, Check, Terminal } from "lucide-react";

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
        url: "https://lince-alpha.vercel.app/api/mcp",
        transport: "http",
      },
    },
  };

  const claudeConfig = {
    mcpServers: {
      lince: {
        command: "npx",
        args: ["-y", "mcp-proxy-http", "https://lince-alpha.vercel.app/api/mcp"],
      },
    },
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#121211] border border-[#242421] rounded-xl p-6 sm:p-8 shadow-2xl text-[#f6f4ef] font-sans max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 mb-6 border-b border-[#242421]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#b5b3ac]">
                [ 05 / MCP INTEGRATION ]
              </span>
            </div>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] font-normal tracking-tight">
              Model Context Protocol (MCP) Setup
            </h3>
            <p className="text-xs sm:text-sm text-[#b5b3ac] mt-1.5 font-sans leading-relaxed">
              Equip Cursor, Claude Desktop, or Windsurf with live crypto mindshare data via JSON-RPC 2.0.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#1a1a18] text-[#73716a] hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tools overview */}
        <div className="mb-6">
          <span className="text-xs font-mono-tech text-[#73716a] uppercase tracking-wider block mb-3 font-medium">
            AVAILABLE INTELLIGENCE TOOLS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono-tech">
            <div className="p-3 rounded-md bg-[#161614] border border-[#242421]">
              <span className="text-[#06b6d4] font-semibold">lince_get_narratives</span>
              <p className="text-[11px] text-[#b5b3ac] font-sans mt-1">
                Sector rankings by mindshare % &amp; 24h velocity.
              </p>
            </div>
            <div className="p-3 rounded-md bg-[#161614] border border-[#242421]">
              <span className="text-[#10b981] font-semibold">lince_get_alpha_divergence</span>
              <p className="text-[11px] text-[#b5b3ac] font-sans mt-1">
                Tokens where social attention disconnected from price.
              </p>
            </div>
            <div className="p-3 rounded-md bg-[#161614] border border-[#242421]">
              <span className="text-[#b5b3ac] font-semibold">lince_get_kols</span>
              <p className="text-[11px] text-[#73716a] font-sans mt-1">
                Top crypto KOL calls, verified hit-rates, and theses.
              </p>
            </div>
            <div className="p-3 rounded-md bg-[#161614] border border-[#242421]">
              <span className="text-[#f59e0b] font-semibold">lince_get_social_platforms</span>
              <p className="text-[11px] text-[#b5b3ac] font-sans mt-1">
                X vs Telegram vs Farcaster conversation volume share.
              </p>
            </div>
          </div>
        </div>

        {/* Cursor Config */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#b5b3ac] mb-2">
            <span>FOR CURSOR (~/.cursor/mcp.json):</span>
            <button
              onClick={() => copyToClipboard(JSON.stringify(cursorConfig, null, 2), "cursor")}
              className="flex items-center gap-1.5 text-[11px] text-[#f6f4ef] hover:underline cursor-pointer"
            >
              {copied === "cursor" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="text-[#10b981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded-md bg-[#0d0d0c] border border-[#242421] text-xs font-mono-tech text-[#b5b3ac] overflow-x-auto">
            {JSON.stringify(cursorConfig, null, 2)}
          </pre>
        </div>

        {/* Claude Desktop Config */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#b5b3ac] mb-2">
            <span>FOR CLAUDE DESKTOP (claude_desktop_config.json):</span>
            <button
              onClick={() => copyToClipboard(JSON.stringify(claudeConfig, null, 2), "claude")}
              className="flex items-center gap-1.5 text-[11px] text-[#f6f4ef] hover:underline cursor-pointer"
            >
              {copied === "claude" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="text-[#10b981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded-md bg-[#0d0d0c] border border-[#242421] text-xs font-mono-tech text-[#b5b3ac] overflow-x-auto">
            {JSON.stringify(claudeConfig, null, 2)}
          </pre>
        </div>

        {/* Direct Endpoint copy */}
        <div className="p-3.5 rounded-md bg-[#161614] border border-[#242421] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-tech text-[#b5b3ac]">
          <div className="truncate">
            <span className="text-[#73716a] block text-[10px]">MCP HTTP ENDPOINT:</span>
            <span className="text-[#f6f4ef] font-semibold">https://lince-alpha.vercel.app/api/mcp</span>
          </div>
          <button
            onClick={() => copyToClipboard("https://lince-alpha.vercel.app/api/mcp", "url")}
            className="px-3 py-1.5 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] text-[#111110] font-semibold text-xs font-sans transition-all active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {copied === "url" ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Endpoint</span>
          </button>
        </div>
      </div>
    </div>
  );
}
