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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#121211] border border-[#242421] rounded-xl p-6 sm:p-8 shadow-2xl text-[#f6f4ef] font-sans">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 mb-5 border-b border-[#242421]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#b5b3ac]">
                [ ZERO-LOGGING INFERENCE ]
              </span>
            </div>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#f6f4ef] font-normal tracking-tight">
              Venice AI Configuration
            </h3>
            <p className="text-xs sm:text-sm text-[#b5b3ac] mt-1 font-sans">
              Private, uncensored decentralized intelligence via Llama 3.3 70B &amp; DeepSeek R1.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#1a1a18] text-[#73716a] hover:text-[#f6f4ef] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="p-4 rounded-md bg-[#181520] border border-purple-500/25 text-xs text-purple-200/90 leading-relaxed mb-5">
          <p className="mb-2">
            <strong className="text-purple-100 font-semibold">Zero Data Retention:</strong> Unlike traditional AI vendors that store user prompts and censor crypto inquiries, Venice AI guarantees verifiable private inference without logs.
          </p>
          <p className="text-[11px] text-[#b5b3ac] font-mono-tech">
            *Note: If no custom key is configured, Lince automatically uses its built-in free deterministic intelligence engine at Rp 0 cost.
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-mono-tech text-[#b5b3ac] block font-medium flex items-center justify-between">
            <span>VENICE API KEY (OPTIONAL):</span>
            <a
              href="https://venice.ai/settings/api"
              target="_blank"
              rel="noreferrer"
              className="text-[#f6f4ef] hover:underline inline-flex items-center gap-1 font-sans text-[11px]"
            >
              Get Venice Key <ExternalLink className="w-3 h-3 text-[#73716a]" />
            </a>
          </label>
          <div className="relative flex items-center">
            <Key className="w-4 h-4 text-[#73716a] absolute left-3.5 pointer-events-none" />
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Paste your Venice API key (e.g. vnc_live_...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#0d0d0c] border border-[#242421] text-xs font-mono-tech text-[#f6f4ef] placeholder-[#73716a] focus:outline-none focus:border-[#403f3a]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            className="text-xs font-mono-tech text-[#73716a] hover:text-[#f6f4ef] underline cursor-pointer"
          >
            Clear key
          </button>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#141413] hover:bg-[#1a1a18] border border-[#242421] text-xs font-mono-tech text-[#b5b3ac] hover:text-[#f6f4ef] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-[#f7f6f1] hover:bg-[#e5e2db] text-[#111110] font-semibold text-xs font-sans transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
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
