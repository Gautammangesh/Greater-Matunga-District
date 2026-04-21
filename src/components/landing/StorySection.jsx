import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IMAGES from "@/lib/images";

const PANELS = [
  {
    index: "01",
    title: "The Great Matunga — The Heritage Heartland",
    text: "A masterpiece of the 1920s Dadar-Matunga-Wadala Garden Suburb scheme. It stands as a guardian of Art Deco heritage, yet pulses with the energy of tomorrow. It isn't just a place on a map; it's a feeling.",
    image: IMAGES.matungaAerial,
    alt: "Aerial view of Matunga district",
  },
  {
    index: "02",
    title: "The Great Transforms Into Something Greater",
    text: "2026 marks the arrival of the Greater Matunga District. This isn't just a new name on a map — it's a 69-year legacy reborn. We call it 'Greater' because it takes the soul of Matunga and scales it for a grander future.",
    image: IMAGES.temple,
    alt: "Heritage landmark in Matunga",
  },
  {
    index: "03",
    title: "Where Mumbai's Next Chapter Begins",
    text: "A Greater Matunga district born of legacy, connectivity, and culture. Now reimagined for the future. The place where convenience meets consciousness, and progress meets purpose.",
    image: IMAGES.viewWindow,
    alt: "Premium city skyline view",
  },
  {
    index: "04",
    title: "Real Rise Begins Here",
    text: "A district shaped by intention, not impulse. Thoughtfully planned spaces, breathing landscapes, and a way of living that values balance over excess — coming together to redefine everyday life. Connect. Grow. Evolve. Belong.",
    image: IMAGES.heroFamilyTowers,
    alt: "Families at Greater Matunga District",
  },
];

export default function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, Math.min(scrollable, -top));
      const idx = Math.min(PANELS.length - 1, Math.floor((scrolled / scrollable) * PANELS.length));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="story" className="w-full pt-12 md:pt-16 scroll-mt-32 md:scroll-mt-44">
      {/* Heading */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          className="max-w-[980px] mb-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs tracking-[0.36em] uppercase text-primary mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The District Story
          </motion.p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.96] tracking-tight">
            {"Rooted in legacy. Alive with tomorrow.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Scroll driver — 4 × 100vh tall */}
      <div ref={wrapperRef} style={{ height: `${PANELS.length * 100}vh` }} className="relative">
        {/* Sticky viewport — full screen */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="w-full h-full max-w-[1280px] mx-auto px-4 md:px-8 pt-[120px] md:pt-[140px] pb-6">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.28)]">

              {/* Images — crossfade */}
              {PANELS.map((panel, i) => (
                <motion.div
                  key={`bg-${i}`}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={panel.image} alt={panel.alt} className="w-full h-full object-cover" />
                </motion.div>
              ))}

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-[3] pointer-events-none" />

              {/* Progress dots */}
              <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-[10] flex flex-col gap-3 items-center">
                {PANELS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: activeIndex === i ? 32 : 8, opacity: activeIndex === i ? 1 : 0.4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[3px] rounded-full bg-white"
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="absolute top-6 right-6 md:right-8 z-[10] text-white/50 text-[10px] tracking-[0.22em] tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")} / {String(PANELS.length).padStart(2, "0")}
              </div>

              {/* Text — animated on panel change */}
              <div className="absolute inset-0 z-[5] flex flex-col justify-end p-8 md:p-14 text-white pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[10px] tracking-[0.34em] uppercase text-primary mb-5">
                      {PANELS[activeIndex].index}
                    </p>
                    <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[0.92] mb-4 max-w-2xl">
                      {PANELS[activeIndex].title}
                    </h3>
                    <p className="max-w-[500px] text-sm md:text-base leading-[1.85] text-white/70 mt-4">
                      {PANELS[activeIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
