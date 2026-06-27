"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const reducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function EnvelopeOpening({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"sealed" | "cracking" | "opening" | "revealing" | "done">("sealed");
  const dragY = useMotionValue(0);
  const sealScale = useTransform(dragY, [0, -80], [1, 0.5]);
  const sealOpacity = useTransform(dragY, [0, -80], [1, 0]);

  const startOpening = useCallback(() => {
    if (phase !== "sealed") return;
    setPhase("cracking");
    setTimeout(() => setPhase("opening"), 600);
    setTimeout(() => setPhase("revealing"), 1400);
    setTimeout(() => setPhase("done"), 2600);
    setTimeout(onComplete, 2800);
  }, [phase, onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const alreadySeen = sessionStorage.getItem("envelope-opened");
    if (alreadySeen) {
      onComplete();
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 30 && phase === "sealed") startOpening();
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase, startOpening, onComplete]);

  useEffect(() => {
    if (phase === "done") {
      sessionStorage.setItem("envelope-opened", "true");
    }
  }, [phase]);

  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 50 && phase === "sealed") startOpening();
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [phase, startOpening]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--cream)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background botanical shadows */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "revealing" ? 0.15 : 0.05 }}
          transition={{ duration: 1 }}
        >
          <svg className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72" viewBox="0 0 200 200" fill="none">
            <path d="M10 180Q30 120 25 60Q28 40 20 10" stroke="var(--sage)" strokeWidth="1.5" opacity="0.4" />
            <path d="M5 170Q40 150 70 110Q50 130 30 160Z" fill="var(--olive)" opacity="0.1" />
            <ellipse cx="45" cy="145" rx="10" ry="6" fill="var(--terracotta)" opacity="0.15" transform="rotate(-20 45 145)" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 scale-[-1]" viewBox="0 0 200 200" fill="none">
            <path d="M10 180Q30 120 25 60Q28 40 20 10" stroke="var(--sage)" strokeWidth="1.5" opacity="0.4" />
            <path d="M5 170Q40 150 70 110Q50 130 30 160Z" fill="var(--olive)" opacity="0.1" />
            <ellipse cx="45" cy="145" rx="10" ry="6" fill="var(--terracotta)" opacity="0.15" transform="rotate(-20 45 145)" />
          </svg>
        </motion.div>

        {/* Envelope */}
        <div className="relative w-[85vw] max-w-[380px] aspect-[3/4]">
          {/* Envelope body */}
          <motion.div
            className="absolute inset-0 rounded-t-[45%] border border-sand/60"
            style={{ backgroundColor: "var(--sand)", boxShadow: "0 8px 40px rgba(74,53,38,0.08)" }}
            animate={
              phase === "opening" || phase === "revealing"
                ? { y: 40, scale: 0.95, opacity: 0.4 }
                : {}
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Gold trim on arch */}
            <div
              className="absolute inset-[3px] rounded-t-[45%] border border-gold/20 pointer-events-none"
            />
          </motion.div>

          {/* Envelope flap */}
          <motion.div
            className="absolute -top-1 left-0 right-0 h-[45%] origin-top"
            style={{ perspective: "600px" }}
          >
            <motion.div
              className="w-full h-full origin-top"
              style={{
                backgroundColor: "var(--sand)",
                clipPath: "polygon(0% 0%, 50% 85%, 100% 0%)",
                transformStyle: "preserve-3d",
                boxShadow: "inset 0 -2px 4px rgba(74,53,38,0.05)",
              }}
              animate={
                phase === "opening" || phase === "revealing"
                  ? { rotateX: 180, opacity: 0 }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* The card (rises from envelope) */}
          <motion.div
            className="absolute inset-x-4 top-4 bottom-4 rounded-t-[42%] flex flex-col items-center justify-center text-center px-6"
            style={{
              backgroundColor: "#FAF6EF",
              border: "1px solid var(--sand)",
              boxShadow: "0 4px 20px rgba(74,53,38,0.06)",
            }}
            animate={
              phase === "revealing"
                ? { y: -60, scale: 1.02 }
                : phase === "opening"
                  ? { y: -20 }
                  : {}
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Gold arch border on card */}
            <div className="absolute inset-[6px] rounded-t-[42%] border border-gold/15 pointer-events-none" />

            {/* Handwritten names with stroke animation */}
            <motion.svg
              viewBox="0 0 400 100"
              className="w-[80%] max-w-[300px] mb-4 overflow-visible"
              initial={{ opacity: 0 }}
              animate={phase === "revealing" ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <defs>
                <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--espresso)" />
                  <stop offset="100%" stopColor="var(--clay)" />
                </linearGradient>
              </defs>
              <motion.text
                x="200"
                y="65"
                textAnchor="middle"
                fontFamily="'Pinyon Script', cursive"
                fontSize="52"
                fill="none"
                stroke="url(#nameGrad)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={
                  phase === "revealing"
                    ? { pathLength: 1, fillOpacity: 1, fill: "var(--espresso)" }
                    : {}
                }
                transition={{ duration: 2, ease: "easeInOut", fillOpacity: { delay: 1.2, duration: 0.8 } }}
              >
                Büşra &amp; İlhan
              </motion.text>
            </motion.svg>

            <motion.p
              className="font-heading text-sm text-mocha/70 tracking-widest"
              initial={{ opacity: 0 }}
              animate={phase === "revealing" ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              1 Ağustos 2026
            </motion.p>
          </motion.div>

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer"
            style={{
              bottom: "38%",
              y: dragY,
              scale: sealScale,
              opacity: sealOpacity,
            }}
            drag={phase === "sealed" ? "y" : false}
            dragConstraints={{ top: -100, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.y < -50) startOpening();
              else dragY.set(0);
            }}
            onClick={() => phase === "sealed" && startOpening()}
            animate={
              phase === "cracking"
                ? { scale: [1, 1.1, 0.9, 0], rotate: [0, -5, 5, 0] }
                : {}
            }
            transition={
              phase === "cracking"
                ? { duration: 0.6, ease: "easeInOut" }
                : {}
            }
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative"
              style={{
                background: "radial-gradient(circle at 35% 35%, var(--terracotta), var(--clay))",
                boxShadow: "0 4px 15px rgba(140,90,60,0.4), inset 0 1px 2px rgba(255,255,255,0.15)",
              }}
            >
              {/* Seal texture */}
              <div
                className="absolute inset-[4px] rounded-full border border-white/10"
                style={{
                  background: "radial-gradient(circle at 40% 40%, transparent 30%, rgba(0,0,0,0.08) 100%)",
                }}
              />
              <span className="font-display text-xl md:text-2xl text-white/90 relative z-10 tracking-wider">
                B & İ
              </span>

              {/* Crack lines */}
              {phase === "cracking" && (
                <>
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <motion.path
                        d="M30 10 L45 35 L38 50 L50 70 L35 90"
                        stroke="var(--cream)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d="M70 15 L58 40 L65 55 L52 75 L68 95"
                        stroke="var(--cream)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </svg>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>

          {/* Scroll/tap hint */}
          {phase === "sealed" && (
            <motion.p
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-mocha/40 text-xs font-body whitespace-nowrap"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Davetiyeyi açmak için kaydırın ↑
            </motion.p>
          )}
        </div>

        {/* Bloom flowers on reveal */}
        {phase === "revealing" && (
          <>
            {[
              { x: "-10%", y: "15%", rotate: -15, delay: 0.2 },
              { x: "85%", y: "10%", rotate: 20, delay: 0.4 },
              { x: "-5%", y: "70%", rotate: -25, delay: 0.6 },
              { x: "88%", y: "65%", rotate: 15, delay: 0.5 },
            ].map((flower, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: flower.x, top: flower.y }}
                initial={{ scale: 0, opacity: 0, rotate: flower.rotate }}
                animate={{ scale: 1, opacity: 0.3, rotate: flower.rotate }}
                transition={{ delay: flower.delay, duration: 0.8, ease: "easeOut" }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="40" r="8" fill="var(--terracotta)" opacity="0.4" />
                  <circle cx="45" cy="37" r="5" fill="var(--blush)" opacity="0.5" />
                  <ellipse cx="50" cy="60" rx="4" ry="15" fill="var(--sage)" opacity="0.3" />
                  <ellipse cx="38" cy="50" rx="10" ry="3" fill="var(--olive)" opacity="0.2" transform="rotate(-30 38 50)" />
                  <ellipse cx="62" cy="48" rx="10" ry="3" fill="var(--sage)" opacity="0.2" transform="rotate(25 62 48)" />
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
