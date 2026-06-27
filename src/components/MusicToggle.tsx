"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        {/* BACKGROUND MUSIC: Place your music file at /public/music.mp3 */}
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggle}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-terracotta hover:bg-white transition-colors"
        aria-label={isPlaying ? "Müziği kapat" : "Müziği aç"}
      >
        {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </>
  );
}
