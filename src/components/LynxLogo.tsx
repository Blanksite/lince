import React from "react";

interface LynxLogoProps {
  className?: string;
  size?: number;
}

export default function LynxLogo({ className = "w-6 h-6", size = 24 }: LynxLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Eye Contour (Almond Lynx Eye) */}
      <path
        d="M2 12C4.5 7 8.5 4 12 4C15.5 4 19.5 7 22 12C19.5 17 15.5 20 12 20C8.5 20 4.5 17 2 12Z"
        stroke="#06B6D4"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Iris Radar Arc */}
      <circle
        cx="12"
        cy="12"
        r="4.5"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      {/* Vertical Slit Pupil (Feline Lynx Pupil) */}
      <path
        d="M12 9.5V14.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Top Lynx Ear Tuft Accents */}
      <path
        d="M7 4.5L5 2M17 4.5L19 2"
        stroke="#06B6D4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
