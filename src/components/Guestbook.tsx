"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { copy } from "@/lib/copy";
import { submitGuestbook, getGuestbookEntries } from "@/utils/api";
import Divider from "./Divider";

interface GuestbookEntry {
  date: string;
  name: string;
  message: string;
}

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  useEffect(() => {
    getGuestbookEntries()
      .then((res) => {
        if (res.ok) setEntries(res.items);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await submitGuestbook(name.trim(), message.trim());
      if (res.ok) {
        setStatus("success");
        setEntries((prev) => [
          { date: new Date().toISOString(), name: name.trim(), message: message.trim() },
          ...prev,
        ]);
        setName("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="guestbook" className="py-16 md:py-24 px-4">
      <Divider />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso text-center mb-4">
          {copy.guestbook.title}
        </h2>
        <p className="text-mocha/70 font-body text-center mb-8 text-sm">
          {copy.guestbook.intro}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12 space-y-4">
          <div>
            <label className="block text-sm font-body text-espresso mb-1">
              {copy.guestbook.nameLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-espresso mb-1">
              {copy.guestbook.messageLabel}
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta text-white rounded-full font-body text-sm hover:bg-clay transition-colors disabled:opacity-60 min-h-[44px]"
          >
            <Send size={16} />
            {status === "sending" ? copy.guestbook.submitting : copy.guestbook.submitBtn}
          </button>

          {status === "success" && (
            <p className="text-sage text-sm text-center font-body">
              {copy.guestbook.successMsg}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm text-center font-body">
              {copy.guestbook.errorMsg}
            </p>
          )}
        </form>

        {/* Entries */}
        {entries.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl border border-sand/40 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={12} className="text-terracotta fill-terracotta" />
                  <span className="font-heading text-sm text-espresso font-medium">
                    {entry.name}
                  </span>
                </div>
                <p className="text-mocha/80 font-body text-sm leading-relaxed">
                  {entry.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
