"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { copy } from "@/lib/copy";
import { nikahDate, config } from "@/lib/weddingData";
import BotanicalCorner from "./BotanicalCorner";

export default function Hero() {
  const isMemoryMode = config.memoryModeOverride || new Date() > nikahDate;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BotanicalCorner position="top-left" className="w-44 h-44 md:w-72 md:h-72" parallaxSpeed={0.2} />
      <BotanicalCorner position="top-right" className="w-44 h-44 md:w-72 md:h-72" parallaxSpeed={0.15} />
      <BotanicalCorner position="bottom-left" className="w-36 h-36 md:w-56 md:h-56" parallaxSpeed={0.1} />
      <BotanicalCorner position="bottom-right" className="w-36 h-36 md:w-56 md:h-56" parallaxSpeed={0.12} />

      {/* Arch shape */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
        <motion.div
          className="relative bg-sand/30 rounded-t-[50%] px-8 pt-16 pb-12 md:px-16 md:pt-24 md:pb-16 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Gold shimmer arch border */}
          <div className="absolute inset-0 rounded-t-[50%] border border-sand/50" />
          <div className="absolute inset-[2px] rounded-t-[50%] border border-gold/10" />
          {/* Top gold accent line */}
          <div className="absolute inset-x-0 top-[20%] mx-auto w-[60%] h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

          {/* COUPLE PHOTO PLACEHOLDER */}
          <motion.div
            className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 rounded-full bg-blush/40 border-2 border-sand flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* COUPLE PHOTO HERE */}
            <span className="text-mocha/40 text-xs text-center px-4 font-body">
              Çift fotoğrafı eklenecek
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display text-2xl md:text-3xl text-terracotta mb-2"
          >
            {copy.hero.topLabel}
          </motion.p>

          {/* Names with elegant reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl text-espresso mb-4 leading-tight"
          >
            {copy.hero.names}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-heading text-lg md:text-xl text-mocha tracking-wide mb-1"
          >
            {isMemoryMode ? copy.memory.heroSubtitle : copy.hero.dateLine}
          </motion.p>

          {!isMemoryMode && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="font-heading text-sm text-mocha/70 mb-4"
            >
              {copy.hero.subLine}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-terracotta text-sm md:text-base font-body italic"
          >
            {copy.hero.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="mt-12"
        >
          <button
            onClick={() => document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center text-mocha/50 hover:text-terracotta transition-colors"
          >
            <span className="text-xs font-body mb-1">{copy.hero.scrollCue}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
