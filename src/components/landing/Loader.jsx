import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IMAGES from "@/lib/images";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2100;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // ease: power3.inOut approximation
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 800);
        }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black"
        >
          {/* Background */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 24%), radial-gradient(circle at 80% 80%, rgba(255,215,143,0.12), transparent 24%), url(${IMAGES.blueCover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Content */}
          <div className="relative w-full max-w-[520px] px-6 text-center">
            <img
              src={IMAGES.crestGold}
              alt=""
              className="w-[92px] mx-auto mb-5"
            />
            <p className="text-xs tracking-[0.36em] uppercase text-primary/70 mb-0">
              Greater Matunga District
            </p>
            <h1 className="font-heading text-white mt-5 mb-6 text-5xl sm:text-6xl md:text-7xl leading-[0.92]">
              The Time To Rise Is Now
            </h1>
            {/* Progress bar */}
            <div className="w-full h-px bg-white/20 overflow-hidden">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, rgba(255,214,150,0.2), #f2d3a1, rgba(255,214,150,0.3))",
                }}
              />
            </div>
            <p className="mt-4 text-sm tracking-[0.32em] uppercase text-white/60">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}