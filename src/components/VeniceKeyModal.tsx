"use client";

import React, { useState } from "react";
import { Shield, X, Check, Key, ExternalLink } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0E111A] border border-[#1E2332] rounded-2xl p-6 shadow-2xl text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2332]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Venice AI Configuration</h3>
              <p className="text-xs text-neutral-400 font-mono">
                Private, Zero-Logging Decentralized AI Inference
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

        {/* Informational Banner */}
        <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 leading-relaxed mb-4">
          <p className="mb-2">
            <strong>Why Venice AI?</strong> Unlike traditional providers that censor crypto discussions and log prompts, Venice AI provides <strong>verifiable private inference (Llama 3.3 70B &amp; DeepSeek R1)</strong> with zero data retention.
          </p>
          <p className="text-[11px] text-purple-300/80 font-mono">
            *Note: If no API key is provided, Lince automatically falls back to its built-in free deterministic intelligence engine at Rp 0 cost.
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-5 space-y-2">
          <label className="text-xs font-mono text-neutral-300 block font-semibold flex items-center justify-between">
            <span>VENICE API KEY (OPTIONAL):</span>
            <a
              href="https://venice.ai/settings/api"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-normal"
            >
              Get Venice Key <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <div className="relative flex items-center">
            <Key className="w-4 h-4 text-neutral-500 absolute left-3 pointer-events-none" />
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Paste your Venice API key (e.g. vnc_live_...)"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#090A0F] border border-[#1E2332] text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            className="text-xs font-mono text-neutral-400 hover:text-rose-400 transition-colors"
          >
            Clear Key (Use Free Engine)
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#141824] hover:bg-[#1E2332] text-xs font-mono text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-mono font-bold text-white transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
