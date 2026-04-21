import React, { useState } from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const AMENITIES = [
  { title: "Podium Wellness Deck", subtitle: "Reflective water and resort-like calm.", image: IMAGES.poolAmenity },
  { title: "Sky Lounge Outlook", subtitle: "Skyline-facing social spaces.", image: IMAGES.viewWindow },
  { title: "District Perspective", subtitle: "Legacy meets the future.", image: IMAGES.matungaAerial },
  { title: "Cultural Heritage", subtitle: "Matunga's rooted identity.", image: IMAGES.temple },
  { title: "Integrated Planning", subtitle: "A district-scale urban canvas.", image: IMAGES.siteMasterplan },
];

export default function AmenitiesGallery() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <motion.div
        className="max-w-[720px] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-xs tracking-[0.36em] uppercase text-primary mb-4">Understated Luxury, Uncompromised Comfort</p>
        <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
          65+ amenities across Podium, Clubhouse & Sky.
        </h2>
        <p className="text-muted-foreground leading-[1.85] mt-4 text-sm max-w-2xl">
          True luxury rewards a life of ambition. Thoughtfully curated amenities across the atrium and podium create spaces for wellness, connection and celebration — offering the quiet satisfaction of having truly arrived.
        </p>
      </motion.div>

      {/* 3D Curved Gallery */}
      <div className="flex gap-3 md:gap-5 h-[400px] md:h-[620px] items-center" style={{ perspective: "1200px" }}>
        {AMENITIES.map((item, i) => {
          const isHovered = hoveredIdx === i;
          const hasHover = hoveredIdx !== null;
          return (
            <motion.div
              key={i}
              className="relative h-full rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
              style={{
                flex: isHovered ? 4 : hasHover ? 0.6 : 1,
                filter: hasHover && !isHovered ? "grayscale(1) brightness(0.5)" : isHovered ? "grayscale(0) brightness(1)" : "grayscale(0.4) brightness(0.85)",
                transition: "flex 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                transformStyle: "preserve3d",
                willChange: "flex, filter, transform",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
              {/* Caption */}
              <div
                className="absolute inset-x-0 bottom-0 p-6 text-white pointer-events-none transition-all duration-500"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <h3 className="text-lg md:text-2xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm opacity-70">{item.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}