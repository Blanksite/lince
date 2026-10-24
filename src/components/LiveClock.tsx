"use client";

import React, { useState, useEffect } from "react";

interface LiveClockProps {
  className?: string;
  showSeconds?: boolean;
  prefix?: string;
}

export default function LiveClock({
  className = "",
  showSeconds = true,
  prefix = "",
}: LiveClockProps) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setTimeString(
        showSeconds
          ? `${hours}:${minutes}:${seconds} UTC`
          : `${hours}:${minutes} UTC`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [showSeconds]);

  if (!timeString) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono-tech tabular-nums opacity-80 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        <span>--:--:-- UTC</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tech tabular-nums ${className}`}
      title="Live Synchronized Network Time (UTC)"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
      {prefix && <span className="opacity-70">{prefix}</span>}
      <span className="tracking-wider">{timeString}</span>
    </span>
  );
}
