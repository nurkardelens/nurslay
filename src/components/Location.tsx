"use client";

import { motion } from "framer-motion";
import { Plane, Hotel } from "lucide-react";
import { copy } from "@/lib/copy";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

const maps = [
  {
    title: "Alyans Wedding Kır Bahçesi — Afyonkarahisar",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.0!2d30.55!3d38.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzQ4LjAiTiAzMMKwMzMnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
    query: "Dörtyol+Mahallesi+3206+Sokak+No:18+Afyonkarahisar",
  },
  {
    title: "Eymoria Garden — Ankara",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.0!2d32.75!3d39.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUxJzAwLjAiTiAzMsKwNDUnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
    query: "Eymoria+Garden+Yeşilkent+555+Cadde+Eymir+Gölü+Çankaya+Ankara",
  },
];

export default function Location() {
  return (
    <section id="location" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-left" className="opacity-10" />
      <BotanicalCorner position="bottom-right" className="opacity-10" />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
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

        {/* Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl border border-sand/40 p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Hotel size={18} className="text-sage" />
            <h3 className="font-heading text-lg text-espresso">
              {copy.location.accommodationTitle}
            </h3>
          </div>
          <p className="text-mocha/70 font-body text-sm">
            {copy.location.accommodationContent}
          </p>
        </motion.div>

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
