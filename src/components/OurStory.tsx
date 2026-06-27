"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

export default function OurStory() {
  return (
    <section id="story" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-right" className="opacity-10" />
      <BotanicalCorner position="bottom-left" className="opacity-10" />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-4">
          {copy.story.title}
        </h2>
        <p className="text-mocha/70 font-body">{copy.story.intro}</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 md:left-1/2 top-0 bottom-0 w-px bg-sand -translate-x-1/2 hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-sand md:hidden" />

        {copy.story.milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Mobile: dot on left line */}
            <div className="md:hidden flex-shrink-0 w-12 flex justify-center relative z-10">
              <div className="w-3 h-3 rounded-full bg-terracotta border-2 border-cream" />
            </div>

            {/* Content */}
            <div
              className={`flex-1 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
              }`}
            >
              {/* Photo placeholder */}
              <div className="w-full h-40 bg-blush/20 rounded-2xl border border-sand/40 mb-4 flex items-center justify-center">
                <span className="text-mocha/30 text-xs font-body">Fotoğraf eklenecek</span>
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
              <div className="w-4 h-4 rounded-full bg-terracotta border-3 border-cream shadow-sm" />
            </div>

            {/* Spacer for other side */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
