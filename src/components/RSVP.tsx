"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { copy } from "@/lib/copy";
import { config, nikahDate } from "@/lib/weddingData";
import { submitRSVP, submitGuestbook, getCounts } from "@/utils/api";
import Divider from "./Divider";

export default function RSVP() {
  const isMemoryMode = config.memoryModeOverride || new Date() > nikahDate;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [attendKina, setAttendKina] = useState(false);
  const [kinaGuests, setKinaGuests] = useState(1);
  const [attendNikah, setAttendNikah] = useState(false);
  const [nikahGuests, setNikahGuests] = useState(1);
  const [hasKids, setHasKids] = useState(false);
  const [kidsCount, setKidsCount] = useState(0);
  const [notes, setNotes] = useState("");
  const [wantGuestbook, setWantGuestbook] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    getCounts()
      .then((res) => {
        if (res.ok) setTotalCount(res.kina + res.nikah);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!name.trim()) return;
    if (!attendKina && !attendNikah) return;

    setStatus("sending");
    try {
      const res = await submitRSVP({
        name: name.trim(),
        contact: contact.trim(),
        attending_kina: attendKina,
        kina_guests: attendKina ? kinaGuests : 0,
        attending_nikah: attendNikah,
        nikah_guests: attendNikah ? nikahGuests : 0,
        kids_count: hasKids ? kidsCount : 0,
        notes: notes.trim(),
      });

      if (wantGuestbook && notes.trim()) {
        await submitGuestbook(name.trim(), notes.trim());
      }

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (isMemoryMode) {
    return (
      <section id="rsvp" className="py-16 md:py-24 px-4">
        <Divider />
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-4">
            {copy.rsvp.title}
          </h2>
          <p className="text-mocha/70 font-body">{copy.memory.rsvpClosed}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 md:py-24 px-4">
      <Divider />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso text-center mb-4">
          {copy.rsvp.title}
        </h2>
        <p className="text-mocha/70 font-body text-center mb-8 text-sm">
          {copy.rsvp.intro}
        </p>

        {totalCount !== null && totalCount > 0 && (
          <p className="text-center text-terracotta font-body text-sm mb-6">
            {copy.rsvp.counter(totalCount)}
          </p>
        )}

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl border border-sage/30 p-8 text-center"
          >
            <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-sage" size={24} />
            </div>
            <p className="text-mocha font-body">{copy.rsvp.successMsg}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute opacity-0 h-0 w-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name */}
            <div>
              <label className="block text-sm font-body text-espresso mb-1">
                {copy.rsvp.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors min-h-[44px]"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-body text-espresso mb-1">
                {copy.rsvp.contactLabel}
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors min-h-[44px]"
              />
            </div>

            {/* Events */}
            <fieldset>
              <legend className="text-sm font-body text-espresso mb-3">
                {copy.rsvp.eventsLabel} *
              </legend>

              <div className="space-y-4">
                {/* Kına */}
                <div className="bg-white/40 rounded-xl border border-sand/40 p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendKina}
                      onChange={(e) => setAttendKina(e.target.checked)}
                      className="w-5 h-5 rounded accent-terracotta min-w-[20px]"
                    />
                    <span className="font-body text-sm text-mocha">
                      {copy.rsvp.kinaOption}
                    </span>
                  </label>
                  {attendKina && (
                    <div className="mt-3 ml-8">
                      <label className="text-xs font-body text-mocha/70 mb-1 block">
                        {copy.rsvp.guestCountLabel}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={kinaGuests}
                        onChange={(e) => setKinaGuests(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 rounded-lg border border-sand/60 bg-white/60 font-body text-mocha text-sm focus:outline-none focus:border-terracotta/50 min-h-[44px]"
                      />
                    </div>
                  )}
                </div>

                {/* Nikah */}
                <div className="bg-white/40 rounded-xl border border-sand/40 p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendNikah}
                      onChange={(e) => setAttendNikah(e.target.checked)}
                      className="w-5 h-5 rounded accent-terracotta min-w-[20px]"
                    />
                    <span className="font-body text-sm text-mocha">
                      {copy.rsvp.nikahOption}
                    </span>
                  </label>
                  {attendNikah && (
                    <div className="mt-3 ml-8">
                      <label className="text-xs font-body text-mocha/70 mb-1 block">
                        {copy.rsvp.guestCountLabel}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={nikahGuests}
                        onChange={(e) => setNikahGuests(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 rounded-lg border border-sand/60 bg-white/60 font-body text-mocha text-sm focus:outline-none focus:border-terracotta/50 min-h-[44px]"
                      />
                    </div>
                  )}
                </div>

                {/* Gelin Alma */}
                {config.showGelinAlma && (
                  <div className="bg-white/40 rounded-xl border border-sand/40 p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded accent-terracotta min-w-[20px]" />
                      <span className="font-body text-sm text-mocha">
                        {copy.rsvp.gelinAlmaOption}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Kids */}
            <div className="bg-white/40 rounded-xl border border-sand/40 p-4">
              <p className="text-sm font-body text-espresso mb-2">{copy.rsvp.kidsLabel}</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="kids"
                    checked={hasKids}
                    onChange={() => setHasKids(true)}
                    className="accent-terracotta"
                  />
                  <span className="font-body text-sm text-mocha">{copy.rsvp.kidsYes}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="kids"
                    checked={!hasKids}
                    onChange={() => setHasKids(false)}
                    className="accent-terracotta"
                  />
                  <span className="font-body text-sm text-mocha">{copy.rsvp.kidsNo}</span>
                </label>
              </div>
              {hasKids && (
                <div className="mt-3">
                  <label className="text-xs font-body text-mocha/70 mb-1 block">
                    {copy.rsvp.kidsCountLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={kidsCount}
                    onChange={(e) => setKidsCount(parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 rounded-lg border border-sand/60 bg-white/60 font-body text-mocha text-sm focus:outline-none focus:border-terracotta/50 min-h-[44px]"
                  />
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-body text-espresso mb-1">
                {copy.rsvp.notesLabel}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors resize-none"
              />
            </div>

            {/* Guestbook checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={wantGuestbook}
                onChange={(e) => setWantGuestbook(e.target.checked)}
                className="w-5 h-5 rounded accent-terracotta min-w-[20px]"
              />
              <span className="font-body text-sm text-mocha">
                {copy.rsvp.guestbookCheckbox}
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta text-white rounded-full font-body text-sm hover:bg-clay transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
            >
              <Send size={16} />
              {status === "sending" ? copy.rsvp.submitting : copy.rsvp.submitBtn}
            </button>

            {status === "error" && (
              <p className="text-red-600 text-sm text-center font-body">
                {copy.rsvp.errorMsg}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
