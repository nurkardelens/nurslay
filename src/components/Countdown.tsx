"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "@/lib/copy";
import { nikahDate, config } from "@/lib/weddingData";
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
        {/* Static background card */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-sand/40" />

        {/* Number with flip animation */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              className="font-heading text-3xl md:text-4xl font-semibold text-espresso"
              initial={changed ? { y: 20, opacity: 0, rotateX: -60 } : false}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -20, opacity: 0, rotateX: 60 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center divider line */}
        <div className="absolute left-2 right-2 top-1/2 h-px bg-sand/30" />

        {/* Gold shimmer accent on top */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent rounded-t-2xl" />
      </div>
      <span className="text-xs md:text-sm text-mocha/70 font-body tracking-wide mt-2">
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
    <section id="countdown" className="py-16 md:py-24 px-4">
      <Divider />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-8">
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
          <p className="text-mocha font-body mt-4 leading-relaxed">
            {copy.memory.thankYou}
          </p>
        )}
      </motion.div>
    </section>
  );
}
