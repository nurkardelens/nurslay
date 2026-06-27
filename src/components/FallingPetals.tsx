"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
  color: string;
}

const COLORS = ["var(--blush)", "var(--terracotta)", "var(--sand)", "var(--sage)"];

function createPetal(id: number): Petal {
  return {
    id,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 10,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    swayAmount: 30 + Math.random() * 60,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const initial = Array.from({ length: 8 }, (_, i) => createPetal(i));
    setPetals(initial);

    let nextId = initial.length;
    const interval = setInterval(() => {
      setPetals((prev) => {
        const filtered = prev.length > 12 ? prev.slice(-10) : prev;
        return [...filtered, createPetal(nextId++)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.x}%`, top: -20 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 40 : 900,
            x: [0, petal.swayAmount, -petal.swayAmount / 2, petal.swayAmount / 3, 0],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            opacity: [0, 0.4, 0.35, 0.3, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            x: { duration: petal.duration, ease: "easeInOut" },
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 10 14"
          >
            <path
              d="M5 0 Q8 4 7 8 Q5 14 3 8 Q2 4 5 0Z"
              fill={petal.color}
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
