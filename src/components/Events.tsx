"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarPlus } from "lucide-react";
import { copy } from "@/lib/copy";
import { events, config } from "@/lib/weddingData";
import { downloadICS } from "@/utils/ics";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

export default function Events() {
  const visibleEvents = events.filter(
    (e) => !e.optional || config.showGelinAlma
  );

  const afyonEvents = visibleEvents.filter((e) => e.city === "Afyonkarahisar");
  const ankaraEvents = visibleEvents.filter((e) => e.city === "Ankara");

  return (
    <section id="events" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-left" parallaxSpeed={0.1} />
      <BotanicalCorner position="bottom-right" parallaxSpeed={0.14} />
      <Divider />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso text-center mb-12">
          {copy.events.title}
        </h2>

        {/* Afyonkarahisar */}
        {afyonEvents.length > 0 && (
          <div className="mb-10">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-xl text-espresso mb-6 text-center"
            >
              {copy.events.cityAfyon}
            </motion.h3>
            {afyonEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}

        {/* Ankara */}
        {ankaraEvents.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-xl text-espresso mb-6 text-center"
            >
              {copy.events.cityAnkara}
            </motion.h3>
            <div className="space-y-6">
              {ankaraEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function EventCard({ event, index }: { event: (typeof events)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative bg-white/50 backdrop-blur-sm rounded-2xl border p-6 md:p-8 mb-6 overflow-hidden ${
        event.isMainEvent ? "border-terracotta/30 shadow-md" : "border-sand/40"
      }`}
    >
      {/* Gold shimmer line at top */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {event.badge && (
        <motion.span
          className="absolute -top-3 left-6 bg-terracotta text-white text-xs font-body px-3 py-1 rounded-full shadow-sm"
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {event.badge}
        </motion.span>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-heading text-xl text-espresso mb-2">
            {event.name}
          </h4>
          <p className="font-heading text-lg text-terracotta mb-1">
            {event.date} · {event.dayOfWeek}
          </p>
          <p className="font-heading text-2xl md:text-3xl text-espresso font-semibold mb-3">
            {event.time}
          </p>
          <div className="flex items-start gap-2 text-mocha/80">
            <MapPin size={16} className="flex-shrink-0 mt-0.5 text-sage" />
            <div>
              <p className="font-body text-sm font-medium">{event.venue}</p>
              <p className="font-body text-xs text-mocha/60">{event.address}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 md:flex-col">
          {event.mapQuery && (
            <motion.a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-terracotta text-white rounded-full text-sm font-body hover:bg-clay transition-colors min-h-[44px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin size={14} />
              {copy.events.directionsBtn}
            </motion.a>
          )}
          <motion.button
            onClick={() => downloadICS(event)}
            className="flex items-center gap-2 px-4 py-2.5 border border-terracotta text-terracotta rounded-full text-sm font-body hover:bg-terracotta/5 transition-colors min-h-[44px]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <CalendarPlus size={14} />
            {copy.events.calendarBtn}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
