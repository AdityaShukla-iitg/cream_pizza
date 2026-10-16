"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function GalleryLightbox({ isOpen, setIsOpen, imageSrc }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-ff-black/95 flex items-center justify-center cursor-default p-4 md:p-12"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            aria-label="Close image lightbox"
            className="absolute top-6 right-6 text-ff-white hover:text-ff-red transition-colors bg-ff-surface p-3 cursor-pointer border border-ff-surface"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={28} />
          </motion.button>

          {/* Core Image wrapping motion.div */}
          <motion.div
            layoutId={`gallery-image-${imageSrc}`}
            className="relative w-full max-w-6xl max-h-[90vh] aspect-[4/3] overflow-hidden border border-ff-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image 
              src={imageSrc} 
              alt="Expanded gallery view" 
              fill 
              className="object-contain md:object-cover" 
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
