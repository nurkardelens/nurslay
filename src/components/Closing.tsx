"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { families, couple } from "@/lib/weddingData";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

export default function Closing() {
  return (
    <section id="closing" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="bottom-left" className="opacity-15" />
      <BotanicalCorner position="bottom-right" className="opacity-15" />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-6">
          {copy.closing.title}
        </h2>

        <p className="text-mocha font-body mb-8 leading-relaxed">
          {copy.closing.line}
        </p>

        {/* Family names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
          <div>
            <p className="font-heading text-sm text-mocha/60 mb-1">Karcı Ailesi</p>
            <p className="font-heading text-base text-espresso">{families.bride}</p>
          </div>
          <span className="text-sand text-2xl hidden md:block">&</span>
          <div>
            <p className="font-heading text-sm text-mocha/60 mb-1">Köse Ailesi</p>
            <p className="font-heading text-base text-espresso">{families.groom}</p>
          </div>
        </div>

        {/* Couple names in calligraphy */}
        <p className="font-display text-4xl md:text-5xl text-espresso mb-4">
          {couple.displayName}
        </p>

        <p className="text-terracotta font-body text-sm italic">
          {couple.tagline}
        </p>
      </motion.div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-mocha/30 font-body text-xs">
          {couple.displayName} · 2026
        </p>
      </div>
    </section>
  );
}
