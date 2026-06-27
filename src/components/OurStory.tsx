"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

export default function OurStory() {
  return (
    <section id="story" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-right" parallaxSpeed={0.18} />
      <BotanicalCorner position="bottom-left" parallaxSpeed={0.12} />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-4">
          {copy.story.title}
        </h2>
        <p className="text-mocha/70 font-body">{copy.story.intro}</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Animated vertical line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{ background: "linear-gradient(to bottom, transparent, var(--sand), var(--gold), var(--sand), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute left-6 top-0 bottom-0 w-px md:hidden"
          style={{ background: "linear-gradient(to bottom, transparent, var(--sand), var(--gold), var(--sand), transparent)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {copy.story.milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Mobile: dot on left line */}
            <div className="md:hidden flex-shrink-0 w-12 flex justify-center relative z-10">
              <motion.div
                className="w-3.5 h-3.5 rounded-full bg-terracotta border-2 border-cream shadow-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 300 }}
              />
            </div>

            {/* Content */}
            <div
              className={`flex-1 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
              }`}
            >
              {/* Photo placeholder */}
              <div className="w-full h-40 bg-blush/20 rounded-2xl border border-sand/40 mb-4 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand/10" />
                <span className="text-mocha/30 text-xs font-body relative z-10">Fotoğraf eklenecek</span>
              </div>
              <h3 className="font-heading text-lg text-espresso mb-1">
                {milestone.label}
              </h3>
              <p className="text-xs text-terracotta font-body mb-2">
                {milestone.date}
              </p>
              <p className="text-sm text-mocha/70 font-body">
                {milestone.description}
              </p>
            </div>

            {/* Desktop: center dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
              <motion.div
                className="w-4 h-4 rounded-full bg-terracotta border-[3px] border-cream shadow-md"
                style={{ boxShadow: "0 0 0 2px var(--gold), 0 2px 8px rgba(181,117,79,0.3)" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 300 }}
              />
            </div>

            {/* Spacer for other side */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
