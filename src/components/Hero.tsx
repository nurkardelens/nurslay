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
      {/* Watercolor wash background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blush/15 to-transparent" />
        <div className="absolute bottom-0 right-0 w-2/3 h-1/4 bg-gradient-to-tl from-sage/8 to-transparent" />
      </div>

      {/* Large lush floral corners */}
      <BotanicalCorner position="top-left" className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 -top-4 -left-4" parallaxSpeed={0.2} variant="lush" />
      <BotanicalCorner position="top-right" className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 -top-4 -right-4" parallaxSpeed={0.15} variant="lush" />
      <BotanicalCorner position="bottom-left" className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 -bottom-2 -left-2" parallaxSpeed={0.1} variant="lush" />
      <BotanicalCorner position="bottom-right" className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 -bottom-2 -right-2" parallaxSpeed={0.12} variant="lush" />

      {/* Arch + content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
        <motion.div
          className="relative bg-cream/40 backdrop-blur-sm rounded-t-[50%] px-8 pt-14 pb-12 md:px-16 md:pt-20 md:pb-16 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Gold arch borders */}
          <div className="absolute inset-0 rounded-t-[50%] border-2 border-gold/25" />
          <div className="absolute inset-[3px] rounded-t-[50%] border border-gold/12" />
          <div className="absolute inset-[6px] rounded-t-[50%] border border-sand/20" />

          {/* Gold shimmer lines */}
          <div className="absolute inset-x-0 top-[18%] mx-auto w-[70%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* COUPLE PHOTO */}
          <motion.div
            className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Photo frame ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
            <div className="absolute inset-[3px] rounded-full border border-blush/40" />
            <div className="absolute inset-[6px] rounded-full bg-blush/30 flex items-center justify-center overflow-hidden">
              <span className="text-mocha/40 text-xs text-center px-4 font-body">
                Çift fotoğrafı eklenecek
              </span>
            </div>
            {/* Gold corner accents on photo */}
            <svg className="absolute -top-2 -left-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M2 12 L2 2 L12 2" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            </svg>
            <svg className="absolute -top-2 -right-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M22 12 L22 2 L12 2" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            </svg>
            <svg className="absolute -bottom-2 -left-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M2 12 L2 22 L12 22" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            </svg>
            <svg className="absolute -bottom-2 -right-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M22 12 L22 22 L12 22" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display text-2xl md:text-3xl text-terracotta mb-2"
          >
            {copy.hero.topLabel}
          </motion.p>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl text-espresso mb-2 leading-tight"
          >
            {copy.hero.names}
          </motion.h1>

          {/* Gold underline beneath names */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="w-32 md:w-40 h-[1.5px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4"
          />

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
          className="mt-10"
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
