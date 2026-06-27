"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Camera } from "lucide-react";
import { copy } from "@/lib/copy";
import { uploadPhoto } from "@/utils/api";
import BotanicalCorner from "./BotanicalCorner";
import Divider from "./Divider";

const placeholderPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  alt: `Çift fotoğrafı ${i + 1}`,
}));

function compressImage(file: File, maxWidth = 1600): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        const base64 = dataUrl.split(",")[1];
        resolve({ data: base64, mimeType: "image/jpeg" });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploaderName, setUploaderName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploaderName.trim()) return;

    setUploading(true);
    try {
      const { data, mimeType } = await compressImage(file);
      await uploadPhoto(uploaderName.trim(), file.name, mimeType, data);
      setUploadSuccess(true);
      setUploaderName("");
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch {
      // silently fail
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section id="gallery" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <BotanicalCorner position="top-right" parallaxSpeed={0.15} />
      <BotanicalCorner position="bottom-left" parallaxSpeed={0.1} />
      <Divider />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-espresso text-center mb-8">
          {copy.gallery.title}
        </h2>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
          {placeholderPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="aspect-[3/4] bg-blush/20 rounded-2xl border border-sand/40 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden relative group"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand/10 group-hover:to-terracotta/5 transition-colors" />
              {/* Gold shimmer on top */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-center relative z-10">
                <Camera size={24} className="text-mocha/20 mx-auto mb-2" />
                <span className="text-mocha/30 text-xs font-body">
                  Fotoğraf eklenecek
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guest upload */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-md mx-auto text-center"
        >
          <h3 className="font-heading text-xl text-espresso mb-2">
            {copy.gallery.uploadTitle}
          </h3>
          <p className="text-mocha/70 font-body text-sm mb-4">
            {copy.gallery.uploadDesc}
          </p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder={copy.guestbook.nameLabel}
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand/60 bg-white/60 font-body text-mocha text-sm focus:outline-none focus:border-terracotta/50 min-h-[44px]"
            />

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="photo-upload"
            />

            <motion.button
              onClick={() => {
                if (!uploaderName.trim()) return;
                fileRef.current?.click();
              }}
              disabled={uploading || !uploaderName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta text-white rounded-full font-body text-sm hover:bg-clay transition-colors disabled:opacity-60 min-h-[44px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload size={16} />
              {uploading ? "Yükleniyor..." : copy.gallery.uploadBtn}
            </motion.button>

            {uploadSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sage text-sm font-body"
              >
                Fotoğrafınız yüklendi, teşekkürler! 🤍
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Guest photos wall */}
        <div className="mt-12 text-center">
          <h3 className="font-heading text-xl text-espresso mb-4">
            {copy.gallery.guestWallTitle}
          </h3>
          <p className="text-mocha/40 font-body text-sm">
            Misafir fotoğrafları burada görünecek
          </p>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-blush/30 rounded-2xl w-full max-w-lg aspect-[3/4] flex items-center justify-center"
            >
              <span className="text-white/50 font-body text-sm">
                Fotoğraf eklenecek
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
