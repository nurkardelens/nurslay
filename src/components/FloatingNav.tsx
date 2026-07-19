"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "@/lib/copy";

const sections = [
  { id: "hero", label: copy.nav.home },
  { id: "countdown", label: copy.nav.countdown },
  { id: "events", label: copy.nav.events },
  { id: "location", label: copy.nav.location },
  { id: "gallery", label: copy.nav.gallery },
  { id: "rsvp", label: copy.nav.rsvp },
  { id: "guestbook", label: copy.nav.guestbook },
  { id: "album", label: copy.nav.album },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: right side vertical nav */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group flex items-center gap-2 justify-end"
                aria-label={s.label}
              >
                <span
                  className={`text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                    activeSection === s.id ? "text-terracotta" : "text-mocha"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeSection === s.id
                      ? "w-3 h-3 bg-terracotta"
                      : "w-2 h-2 bg-sand group-hover:bg-blush"
                  }`}
                />
              </button>
            ))}
          </motion.nav>

          {/* Mobile: bottom dot nav */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="p-1"
                aria-label={s.label}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeSection === s.id
                      ? "w-2.5 h-2.5 bg-terracotta"
                      : "w-2 h-2 bg-sand"
                  }`}
                />
              </button>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
