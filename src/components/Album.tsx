"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { copy } from "@/lib/copy";
import { getSettings } from "@/utils/api";
import Divider from "./Divider";

export default function Album() {
  const [albumUrl, setAlbumUrl] = useState<string>("");

  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.ok && res.albumUrl) setAlbumUrl(res.albumUrl);
      })
      .catch(() => {});
  }, []);

  if (!albumUrl) return null;

  return (
    <section id="album" className="py-16 md:py-24 px-4">
      <Divider />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso mb-4">
          {copy.album.title}
        </h2>
        <p className="text-mocha/70 font-body text-sm mb-6">
          {copy.album.description}
        </p>

        <a
          href={albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white rounded-full font-body hover:bg-clay transition-colors min-h-[44px] mb-8"
        >
          <ExternalLink size={18} />
          {copy.album.button}
        </a>

        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-sand/40 inline-block mb-3">
            <QRCodeSVG
              value={albumUrl}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#4A3526"
              level="M"
            />
          </div>
          <p className="text-mocha/50 font-body text-xs">
            {copy.album.qrNote}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
