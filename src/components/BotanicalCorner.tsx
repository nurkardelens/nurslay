"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BotanicalCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  parallaxSpeed?: number;
}

export default function BotanicalCorner({
  position,
  className = "",
  parallaxSpeed = 0.15,
}: BotanicalCornerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, position.includes("top") ? -40 * parallaxSpeed : 40 * parallaxSpeed]
  );

  const mirrorX = position.includes("right") ? -1 : 1;
  const mirrorY = position.includes("bottom") ? -1 : 1;

  const positions: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute ${positions[position]} pointer-events-none w-36 h-36 md:w-56 md:h-56 ${className}`}
      style={{
        y: yParallax,
        scaleX: mirrorX,
        scaleY: mirrorY,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 1.2 }}
    >
      {/* Layer 1: Palm fan (back, slow sway) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M5 185Q50 150 90 90Q65 135 25 170Z" fill="var(--olive)" opacity="0.12" />
          <path d="M15 190Q65 140 105 75Q80 125 40 175Z" fill="var(--sage)" opacity="0.10" />
          <path d="M10 180Q40 150 65 100Q45 135 20 170Z" fill="var(--olive)" opacity="0.08" />
          {/* Fan veins */}
          <path d="M10 185Q45 155 80 100" stroke="var(--olive)" strokeWidth="0.4" opacity="0.15" fill="none" />
          <path d="M18 188Q55 148 90 90" stroke="var(--sage)" strokeWidth="0.3" opacity="0.12" fill="none" />
        </svg>
      </motion.div>

      {/* Layer 2: Pampas grass (middle, medium sway) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [1, -1.5, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Main stem */}
          <path d="M25 190Q35 130 30 65Q32 40 25 10" stroke="var(--sand)" strokeWidth="1.5" opacity="0.5" fill="none" />
          {/* Plume shapes */}
          <ellipse cx="25" cy="35" rx="8" ry="20" fill="var(--sand)" opacity="0.15" transform="rotate(-5 25 35)" />
          <ellipse cx="22" cy="30" rx="6" ry="18" fill="var(--blush)" opacity="0.10" transform="rotate(-8 22 30)" />
          <ellipse cx="28" cy="40" rx="7" ry="16" fill="var(--sand)" opacity="0.12" transform="rotate(3 28 40)" />
          {/* Side wisps */}
          <path d="M30 60Q40 45 48 30" stroke="var(--sand)" strokeWidth="0.6" opacity="0.2" fill="none" />
          <path d="M28 55Q20 42 15 28" stroke="var(--blush)" strokeWidth="0.5" opacity="0.15" fill="none" />
          {/* Secondary stem */}
          <path d="M40 190Q48 140 42 80Q44 55 38 25" stroke="var(--sage)" strokeWidth="0.8" opacity="0.3" fill="none" />
          <ellipse cx="38" cy="50" rx="5" ry="14" fill="var(--sage)" opacity="0.08" transform="rotate(-3 38 50)" />
        </svg>
      </motion.div>

      {/* Layer 3: Roses/flowers (front, faster sway) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0.5, -2, 0.5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Main rose */}
          <circle cx="55" cy="140" r="12" fill="var(--terracotta)" opacity="0.20" />
          <circle cx="52" cy="137" r="8" fill="var(--blush)" opacity="0.25" />
          <circle cx="56" cy="135" r="4" fill="var(--terracotta)" opacity="0.30" />
          {/* Petal details */}
          <path d="M48 132Q52 128 58 130Q54 126 48 132Z" fill="var(--terracotta)" opacity="0.15" />
          <path d="M60 136Q64 130 62 138Q66 134 60 136Z" fill="var(--blush)" opacity="0.18" />

          {/* Small bud */}
          <circle cx="70" cy="160" r="6" fill="var(--terracotta)" opacity="0.15" />
          <circle cx="68" cy="158" r="3.5" fill="var(--blush)" opacity="0.20" />

          {/* Tiny accent flower */}
          <circle cx="35" cy="120" r="4" fill="var(--blush)" opacity="0.18" />
          <circle cx="34" cy="119" r="2" fill="var(--terracotta)" opacity="0.15" />

          {/* Leaves */}
          <ellipse cx="68" cy="145" rx="14" ry="4" fill="var(--sage)" opacity="0.15" transform="rotate(-25 68 145)" />
          <ellipse cx="42" cy="150" rx="12" ry="3.5" fill="var(--olive)" opacity="0.12" transform="rotate(-40 42 150)" />
          <ellipse cx="75" cy="168" rx="10" ry="3" fill="var(--sage)" opacity="0.10" transform="rotate(15 75 168)" />

          {/* Stem for rose */}
          <path d="M55 152Q52 165 55 185" stroke="var(--olive)" strokeWidth="0.8" opacity="0.2" fill="none" />
          <path d="M70 166Q68 178 72 192" stroke="var(--sage)" strokeWidth="0.6" opacity="0.15" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
