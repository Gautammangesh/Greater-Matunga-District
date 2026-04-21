import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const HIGHLIGHTS = [
  { num: "01", title: "4 Acre Integrated Township", text: "A meticulously crafted mixed-use canvas — from self-shaded courtyards to perfectly planned layouts." },
  { num: "02", title: "Soaring 39 & 47 Storey Iconic Towers + Commercial", text: "Distinctive vertical presence with a dedicated commercial tower at the heart of the city." },
  { num: "03", title: "Exquisite 2 & 3 BHK Residences", text: "Crafted for modern city living with serene views of the Eastern Bay and Mumbai Skyline." },
  { num: "04", title: "65+ Curated Lifestyle Amenities", text: "Across Ground, Podium & Sky Levels — Grand Clubhouse & Elevated Sky Amenities Experience." },
  { num: "05", title: "Multi-Level Parking Infrastructure", text: "3 Basements + Ground + 9 Podium Levels of thoughtfully planned vehicle management." },
];

export default function HighlightsSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-stretch">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[40px] shadow-[0_30px_80px_rgba(20,20,20,0.18)] min-h-[500px] lg:min-h-[780px] group"
        >
          <motion.img
            src={IMAGES.heroFamilyTowers}
            alt="Family at the towers"
            className="w-full h-full object-cover"
            style={{ objectPosition: "52% 20%" }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/2 to-black/30 pointer-events-none" />
          {/* Badge */}
          <motion.div
            className="absolute bottom-8 left-8 bg-white/90 backdrop-blur rounded-2xl px-5 py-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <p className="text-xs tracking-[0.18em] uppercase text-primary font-semibold">Perfectly Positioned</p>
            <p className="text-xs text-muted-foreground mt-0.5">Historically Rooted</p>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div className="py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="text-xs tracking-[0.36em] uppercase text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Project Highlights
            </motion.p>
            <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
              {"Perfectly positioned. Historically rooted.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="text-muted-foreground leading-[1.9] mt-4 max-w-lg text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              Rising with quiet confidence at the heart of the city, this landmark development blends thoughtful engineering with understated luxury. A bold yet refined tribute to the spirit of the Greater Matunga District, built for the future.
            </motion.p>
          </motion.div>

          <div className="mt-8 space-y-0">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="grid grid-cols-[56px_1fr] gap-5 py-6 border-b border-border/40 hover:bg-primary/5 hover:rounded-2xl hover:px-4 transition-all duration-300 group cursor-default"
              >
                <motion.span
                  className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-primary/12 text-primary font-bold border border-primary/20 text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  {h.num}
                </motion.span>
                <div>
                  <h3 className="text-sm font-semibold mb-2">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.8]">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}