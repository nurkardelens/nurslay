"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { copy } from "@/lib/copy";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

const maps = [
  {
    title: "Alyans Wedding Kır Bahçesi — Afyonkarahisar",
    query: "Dörtyol+Mahallesi+3206+Sokak+No:18+Afyonkarahisar",
  },
  {
    title: "Eymoria Garden — Ankara",
    query: "Eymoria+Garden+Yeşilkent+555+Cadde+Eymir+Gölü+Çankaya+Ankara",
  },
];

export default function Location() {
  return (
    <section id="location" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-left" parallaxSpeed={0.12} />
      <BotanicalCorner position="bottom-right" parallaxSpeed={0.1} />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso text-center mb-8">
          {copy.location.title}
        </h2>

        {/* Travel note */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-sand/40 p-6 mb-10 text-center">
          <p className="text-mocha font-body leading-relaxed">
            {copy.location.travelNote}
          </p>
        </div>

        {/* Maps */}
        <div className="space-y-8 mb-10">
          {maps.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-heading text-lg text-espresso mb-3">{m.title}</h3>
              <div className="rounded-2xl overflow-hidden border border-sand/40 shadow-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${m.query}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={m.title}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Airport note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-sand/40 p-5"
        >
          <Plane size={18} className="text-sage flex-shrink-0" />
          <p className="text-mocha/70 font-body text-sm">
            {copy.location.airportNote}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
