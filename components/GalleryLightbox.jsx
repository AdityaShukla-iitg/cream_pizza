"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function GalleryLightbox({ isOpen, setIsOpen, imageSrc }) {
  // Using Framer Motion layout animations for seamless transitions
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center cursor-default p-4 md:p-12"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
            className="absolute top-8 right-8 text-white hover:text-red-600 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={32} />
          </motion.button>

          {/* Core Image wrapping motion.div */}
          <motion.div
            layoutId={`gallery-image-${imageSrc}`} // Matches the layoutId from the grid
            className="relative w-full max-w-6xl max-h-[90vh] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image 
              src={imageSrc} 
              alt="Expanded Gallery View" 
              fill 
              className="object-contain md:object-cover" 
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
