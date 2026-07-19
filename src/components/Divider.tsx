"use client";

export default function Divider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const lineColor = light ? "var(--gold)" : "var(--gold)";
  const lineOpacity = light ? "0.4" : "0.35";
  const dotColor = light ? "var(--gold)" : "var(--terracotta)";
  const dotOpacity = light ? "0.7" : "0.6";

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg width="240" height="24" viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 12 Q60 4 120 12 Q180 20 230 12"
          stroke={lineColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity={lineOpacity}
        />
        <path
          d="M10 12 Q60 20 120 12 Q180 4 230 12"
          stroke={lineColor}
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          opacity={Number(lineOpacity) * 0.6 + ""}
        />
        <circle cx="120" cy="12" r="2.5" fill={dotColor} opacity={dotOpacity} />
        <circle cx="106" cy="12" r="1" fill={dotColor} opacity={Number(dotOpacity) * 0.5 + ""} />
        <circle cx="134" cy="12" r="1" fill={dotColor} opacity={Number(dotOpacity) * 0.5 + ""} />
        <path
          d="M108 12 Q114 7 120 12 Q126 17 132 12"
          stroke={dotColor}
          strokeWidth="0.8"
          fill="none"
          opacity={Number(dotOpacity) * 0.7 + ""}
        />
      </svg>
    </div>
  );
}
