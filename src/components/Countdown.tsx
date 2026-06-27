"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const now = new Date();
  const diff = now.getTime() - nikahDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-sand/40 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-2">
        <span className="font-heading text-3xl md:text-4xl font-semibold text-espresso">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm text-mocha/70 font-body tracking-wide">
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-8">
          {isMemoryMode ? copy.memory.counter(getDaysSinceWedding()) : copy.countdown.title}
        </h2>

        {!isMemoryMode && (
          <div className="flex justify-center gap-4 md:gap-6">
            <CountdownCard value={timeLeft.days} label={copy.countdown.days} />
            <CountdownCard value={timeLeft.hours} label={copy.countdown.hours} />
            <CountdownCard value={timeLeft.minutes} label={copy.countdown.minutes} />
            <CountdownCard value={timeLeft.seconds} label={copy.countdown.seconds} />
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
