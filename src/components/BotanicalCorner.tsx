"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BotanicalCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  parallaxSpeed?: number;
  variant?: "default" | "lush" | "light";
}

export default function BotanicalCorner({
  position,
  className = "",
  parallaxSpeed = 0.15,
  variant = "default",
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

  const isLight = variant === "light";

  return (
    <motion.div
      ref={ref}
      className={`absolute ${positions[position]} pointer-events-none w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 ${className}`}
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
      {/* Layer 1: Large leaves (back) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M5 195Q30 150 60 100Q35 75 20 40Q40 80 65 90Q85 50 100 15Q90 60 78 95Q100 85 130 60Q105 90 82 105Q95 130 80 170Q75 135 65 115Q50 140 25 180Z" fill={isLight ? "#c8d4be" : "var(--olive)"} opacity={isLight ? "0.35" : "0.25"} />
          <path d="M15 190Q40 140 75 85Q55 65 35 30Q55 70 80 78Q95 40 115 5Q105 50 90 85Q115 70 145 50Q120 80 95 100Q110 125 95 165Q88 130 78 110Q60 135 35 175Z" fill={isLight ? "#b8c8ae" : "var(--sage)"} opacity={isLight ? "0.30" : "0.20"} />
          {/* Leaf veins */}
          <path d="M20 185Q50 130 85 75" stroke={isLight ? "#a0b590" : "var(--olive)"} strokeWidth="0.6" opacity={isLight ? "0.30" : "0.20"} fill="none" />
          <path d="M35 180Q60 135 90 85" stroke={isLight ? "#a0b590" : "var(--sage)"} strokeWidth="0.5" opacity={isLight ? "0.25" : "0.15"} fill="none" />
        </svg>
      </motion.div>

      {/* Layer 2: Pampas + stems (mid) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [1, -1.5, 1] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M30 195Q38 130 35 65Q37 35 30 5" stroke={isLight ? "#e0d5c0" : "var(--sand)"} strokeWidth="2" opacity={isLight ? "0.50" : "0.55"} fill="none" />
          <ellipse cx="30" cy="30" rx="12" ry="28" fill={isLight ? "#e5ddd0" : "var(--sand)"} opacity={isLight ? "0.30" : "0.25"} transform="rotate(-5 30 30)" />
          <ellipse cx="26" cy="25" rx="9" ry="24" fill={isLight ? "#d8c8b8" : "var(--blush)"} opacity={isLight ? "0.25" : "0.20"} transform="rotate(-8 26 25)" />
          <ellipse cx="34" cy="38" rx="10" ry="22" fill={isLight ? "#e5ddd0" : "var(--sand)"} opacity={isLight ? "0.22" : "0.18"} transform="rotate(4 34 38)" />
          {/* Side wisps */}
          <path d="M35 65Q50 45 60 25" stroke={isLight ? "#e0d5c0" : "var(--sand)"} strokeWidth="0.8" opacity={isLight ? "0.30" : "0.25"} fill="none" />
          <path d="M32 55Q22 38 15 18" stroke={isLight ? "#d8c8b8" : "var(--blush)"} strokeWidth="0.7" opacity={isLight ? "0.25" : "0.20"} fill="none" />
          {/* Second stem */}
          <path d="M50 195Q56 145 52 85Q54 55 48 20" stroke={isLight ? "#b8c8ae" : "var(--sage)"} strokeWidth="1.2" opacity={isLight ? "0.40" : "0.35"} fill="none" />
          <ellipse cx="48" cy="45" rx="7" ry="18" fill={isLight ? "#b8c8ae" : "var(--sage)"} opacity={isLight ? "0.18" : "0.12"} transform="rotate(-3 48 45)" />
          {/* Third delicate stem */}
          <path d="M65 195Q70 155 65 110Q68 85 62 50" stroke={isLight ? "#c8d4be" : "var(--olive)"} strokeWidth="0.7" opacity={isLight ? "0.30" : "0.25"} fill="none" />
        </svg>
      </motion.div>

      {/* Layer 3: Roses & flowers (front) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0.5, -1.5, 0.5] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Large main rose */}
          <circle cx="60" cy="130" r="18" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.35" : "0.30"} />
          <circle cx="56" cy="126" r="13" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.40" : "0.35"} />
          <circle cx="60" cy="123" r="8" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.35" : "0.30"} />
          <circle cx="58" cy="121" r="4" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.40" : "0.35"} />
          {/* Rose petals detail */}
          <path d="M48 120Q55 112 65 118Q58 108 48 120Z" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.25" : "0.20"} />
          <path d="M68 124Q75 115 72 128Q78 120 68 124Z" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.30" : "0.25"} />
          <path d="M50 135Q44 128 52 125Q42 130 50 135Z" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.20" : "0.18"} />

          {/* Medium rose */}
          <circle cx="85" cy="155" r="12" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.35" : "0.30"} />
          <circle cx="82" cy="152" r="8" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.30" : "0.25"} />
          <circle cx="84" cy="150" r="4.5" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.35" : "0.30"} />

          {/* Small bud */}
          <circle cx="40" cy="105" r="7" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.28" : "0.22"} />
          <circle cx="38" cy="103" r="4" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.32" : "0.28"} />

          {/* Tiny accent flowers */}
          <circle cx="100" cy="140" r="5" fill={isLight ? "#d8b8a8" : "var(--blush)"} opacity={isLight ? "0.25" : "0.22"} />
          <circle cx="98" cy="138" r="2.5" fill={isLight ? "#e0c0b0" : "var(--sand)"} opacity={isLight ? "0.30" : "0.20"} />
          <circle cx="75" cy="175" r="4" fill={isLight ? "#c09080" : "var(--terracotta)"} opacity={isLight ? "0.20" : "0.18"} />

          {/* Gold accent dots */}
          <circle cx="95" cy="130" r="1.5" fill="var(--gold)" opacity={isLight ? "0.30" : "0.25"} />
          <circle cx="48" cy="115" r="1" fill="var(--gold)" opacity={isLight ? "0.25" : "0.20"} />
          <circle cx="90" cy="165" r="1.2" fill="var(--gold)" opacity={isLight ? "0.22" : "0.18"} />

          {/* Leaves */}
          <ellipse cx="78" cy="138" rx="18" ry="5" fill={isLight ? "#b8c8ae" : "var(--sage)"} opacity={isLight ? "0.30" : "0.22"} transform="rotate(-25 78 138)" />
          <ellipse cx="42" cy="145" rx="16" ry="4.5" fill={isLight ? "#a0b090" : "var(--olive)"} opacity={isLight ? "0.25" : "0.18"} transform="rotate(-40 42 145)" />
          <ellipse cx="90" cy="168" rx="14" ry="4" fill={isLight ? "#b8c8ae" : "var(--sage)"} opacity={isLight ? "0.25" : "0.18"} transform="rotate(15 90 168)" />
          <ellipse cx="55" cy="155" rx="12" ry="3.5" fill={isLight ? "#a0b090" : "var(--olive)"} opacity={isLight ? "0.20" : "0.15"} transform="rotate(-15 55 155)" />

          {/* Stems */}
          <path d="M60 148Q56 168 60 195" stroke={isLight ? "#a0b090" : "var(--olive)"} strokeWidth="1.2" opacity={isLight ? "0.30" : "0.25"} fill="none" />
          <path d="M85 167Q82 180 86 195" stroke={isLight ? "#b8c8ae" : "var(--sage)"} strokeWidth="0.9" opacity={isLight ? "0.25" : "0.20"} fill="none" />
          <path d="M40 112Q38 125 42 145" stroke={isLight ? "#a0b090" : "var(--olive)"} strokeWidth="0.8" opacity={isLight ? "0.25" : "0.18"} fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
