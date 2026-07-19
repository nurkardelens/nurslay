"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "@/lib/copy";
import { nikahDate, config } from "@/lib/weddingData";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = nikahDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getDaysSinceWedding(): number {
  const diff = new Date().getTime() - nikahDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const prevRef = useRef(value);
  const display = value.toString().padStart(2, "0");
  const changed = prevRef.current !== value;

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-24 md:w-24 md:h-28 perspective-[500px]">
        {/* Card bg — dark translucent */}
        <div className="absolute inset-0 bg-white/8 backdrop-blur-sm rounded-2xl shadow-sm border border-gold/15" />

        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              className="font-heading text-3xl md:text-4xl font-semibold text-cream"
              initial={changed ? { y: 20, opacity: 0, rotateX: -60 } : false}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -20, opacity: 0, rotateX: 60 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center divider */}
        <div className="absolute left-2 right-2 top-1/2 h-px bg-gold/10" />
        {/* Gold shimmer top */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent rounded-t-2xl" />
      </div>
      <span className="text-xs md:text-sm text-cream/60 font-body tracking-widest uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const isMemoryMode = config.memoryModeOverride || new Date() > nikahDate;

  useEffect(() => {
    if (isMemoryMode) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [isMemoryMode]);

  return (
    <section
      id="countdown"
      className="relative py-20 md:py-28 px-4 overflow-hidden bg-dark-sage"
    >
      {/* Subtle texture on dark bg */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Gold edge lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* Light-colored botanical corners */}
      <BotanicalCorner position="top-left" className="w-40 h-40 md:w-56 md:h-56" parallaxSpeed={0.1} variant="light" />
      <BotanicalCorner position="bottom-right" className="w-40 h-40 md:w-56 md:h-56" parallaxSpeed={0.12} variant="light" />

      <Divider light />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-cream mb-10">
          {isMemoryMode ? copy.memory.counter(getDaysSinceWedding()) : copy.countdown.title}
        </h2>

        {!isMemoryMode && (
          <div className="flex justify-center gap-3 md:gap-5">
            <FlipCard value={timeLeft.days} label={copy.countdown.days} />
            <FlipCard value={timeLeft.hours} label={copy.countdown.hours} />
            <FlipCard value={timeLeft.minutes} label={copy.countdown.minutes} />
            <FlipCard value={timeLeft.seconds} label={copy.countdown.seconds} />
          </div>
        )}

        {isMemoryMode && (
          <p className="text-cream/80 font-body mt-4 leading-relaxed">
            {copy.memory.thankYou}
          </p>
        )}

        {/* Gold decorative element below countdown */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9.5 6H15L10.5 9.5L12 15L8 11.5L4 15L5.5 9.5L1 6H6.5Z" fill="var(--gold)" opacity="0.4" />
          </svg>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
