"use client";

interface BotanicalCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export default function BotanicalCorner({ position, className = "" }: BotanicalCornerProps) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
  };

  const positions: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <div
      className={`absolute ${positions[position]} pointer-events-none opacity-20 w-32 h-32 md:w-48 md:h-48 ${className}`}
      style={{ transform: transforms[position] }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pampas grass plumes */}
        <path
          d="M10 180 Q30 120 25 60 Q28 40 20 10"
          stroke="var(--sage)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M20 180 Q40 130 35 70 Q38 50 30 20"
          stroke="var(--sage)"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M25 60 Q15 45 8 30 Q5 20 10 10"
          stroke="var(--blush)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        {/* Palm fan shapes */}
        <path
          d="M5 170 Q40 150 70 110 Q50 130 30 160 Z"
          fill="var(--olive)"
          opacity="0.15"
        />
        <path
          d="M15 175 Q55 140 80 95 Q60 120 35 155 Z"
          fill="var(--sage)"
          opacity="0.12"
        />
        <path
          d="M10 165 Q30 140 50 100 Q35 125 20 155 Z"
          fill="var(--olive)"
          opacity="0.1"
        />
        {/* Rose accent */}
        <circle cx="45" cy="145" r="8" fill="var(--terracotta)" opacity="0.2" />
        <circle cx="42" cy="142" r="5" fill="var(--blush)" opacity="0.25" />
        <circle cx="55" cy="160" r="5" fill="var(--terracotta)" opacity="0.15" />
        {/* Small leaf details */}
        <ellipse cx="60" cy="130" rx="12" ry="4" fill="var(--sage)" opacity="0.15" transform="rotate(-30 60 130)" />
        <ellipse cx="35" cy="100" rx="10" ry="3" fill="var(--olive)" opacity="0.12" transform="rotate(-45 35 100)" />
      </svg>
    </div>
  );
}
