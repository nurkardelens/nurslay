"use client";

export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 10 Q50 2 100 10 Q150 18 190 10"
          stroke="var(--sand)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="10" r="2" fill="var(--terracotta)" opacity="0.5" />
        <path
          d="M90 10 Q95 6 100 10 Q105 14 110 10"
          stroke="var(--blush)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    </div>
  );
}
