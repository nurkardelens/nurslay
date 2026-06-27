"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { families, couple } from "@/lib/weddingData";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

export default function Closing() {
  return (
    <section id="closing" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="bottom-left" parallaxSpeed={0.1} />
      <BotanicalCorner position="bottom-right" parallaxSpeed={0.12} />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-6">
          {copy.closing.title}
        </h2>

        <p className="text-mocha font-body mb-8 leading-relaxed">
          {copy.closing.line}
        </p>

        {/* Family names */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8"
        >
          <div>
            <p className="font-heading text-sm text-mocha/60 mb-1">Karcı Ailesi</p>
            <p className="font-heading text-base text-espresso">{families.bride}</p>
          </div>
          <span className="text-gold text-2xl">&</span>
          <div>
            <p className="font-heading text-sm text-mocha/60 mb-1">Köse Ailesi</p>
            <p className="font-heading text-base text-espresso">{families.groom}</p>
          </div>
        </motion.div>

        {/* Couple names calligraphy with stroke animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4"
        >
          <svg viewBox="0 0 380 70" className="w-full max-w-sm mx-auto overflow-visible">
            <motion.text
              x="190"
              y="55"
              textAnchor="middle"
              fontFamily="'Pinyon Script', cursive"
              fontSize="48"
              fill="var(--espresso)"
              stroke="var(--espresso)"
              strokeWidth="0.4"
              initial={{ strokeDasharray: 600, strokeDashoffset: 600, fillOpacity: 0 }}
              whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
              viewport={{ once: true }}
              transition={{
                strokeDashoffset: { duration: 2, ease: "easeInOut" },
                fillOpacity: { delay: 1.5, duration: 0.8 },
              }}
            >
              {couple.displayName}
            </motion.text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-terracotta font-body text-sm italic"
        >
          {couple.tagline}
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16 text-center"
      >
        {/* Gold divider */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-4" />
        <p className="text-mocha/30 font-body text-xs">
          {couple.displayName} · 2026
        </p>
      </motion.div>
    </section>
  );
}
