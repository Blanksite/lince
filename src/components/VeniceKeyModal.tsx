"use client";

import React, { useState } from "react";
import { Shield, X, Check, Key, ExternalLink } from "lucide-react";
import VeniceLogo from "@/components/VeniceLogo";

interface VeniceKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  customApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export default function VeniceKeyModal({
  isOpen,
  onClose,
  customApiKey,
  onSaveApiKey,
}: VeniceKeyModalProps) {
  const [keyInput, setKeyInput] = useState<string>(customApiKey);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setKeyInput("");
    onSaveApiKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[var(--nm-surface)] border border-[var(--nm-line)] rounded-xl p-6 sm:p-8 shadow-2xl text-[var(--nm-text)] font-sans">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 mb-5 border-b border-[var(--nm-line)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <VeniceLogo className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[var(--nm-muted)]">
                [ VENICE AI · ZERO-LOGGING INFERENCE ]
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <VeniceLogo className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--nm-text)] font-normal tracking-tight">
                Venice AI Configuration
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--nm-muted)] mt-1.5 font-sans">
              Private, uncensored decentralized intelligence via Llama 3.3 70B &amp; DeepSeek R1.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--nm-surface-hover)] text-[var(--nm-dim)] hover:text-[var(--nm-text)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="p-4 rounded-md bg-purple-50 dark:bg-[#181520] border border-purple-300 dark:border-purple-500/25 text-xs text-purple-900 dark:text-purple-200/90 leading-relaxed mb-5">
          <p className="mb-2">
            <strong className="text-purple-950 dark:text-purple-100 font-semibold">Zero Data Retention:</strong> Unlike traditional AI vendors that store user prompts and censor crypto inquiries, Venice AI guarantees verifiable private inference without logs.
          </p>
          <p className="text-[11px] text-[var(--nm-muted)] font-mono-tech">
            *Note: If no custom key is configured, Lince automatically uses its built-in free deterministic intelligence engine at Rp 0 cost.
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-mono-tech text-[var(--nm-muted)] block font-medium flex items-center justify-between">
            <span>VENICE API KEY (OPTIONAL):</span>
            <a
              href="https://venice.ai/settings/api"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--nm-text)] hover:underline inline-flex items-center gap-1 font-sans text-[11px]"
            >
              Get Venice Key <ExternalLink className="w-3 h-3 text-[var(--nm-dim)]" />
            </a>
          </label>
          <div className="relative flex items-center">
            <Key className="w-4 h-4 text-[var(--nm-dim)] absolute left-3.5 pointer-events-none" />
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Paste your Venice API key (e.g. vnc_live_...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[var(--nm-bg)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-text)] placeholder-[var(--nm-dim)] focus:outline-none focus:border-[var(--nm-accent-cyan)]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            className="text-xs font-mono-tech text-[var(--nm-dim)] hover:text-[var(--nm-text)] underline cursor-pointer"
          >
            Clear key
          </button>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[var(--nm-surface)] hover:bg-[var(--nm-surface-hover)] border border-[var(--nm-line)] text-xs font-mono-tech text-[var(--nm-muted)] hover:text-[var(--nm-text)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-[var(--nm-btn-bg)] hover:bg-[var(--nm-btn-hover)] text-[var(--nm-btn-text)] font-semibold text-xs font-sans transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--nm-accent-green)]" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
