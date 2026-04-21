import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const CARDS = [
  { eyebrow: "Where Every Road Leads Faster To Life", title: "Ambition rises.", subtitle: "Connect", image: IMAGES.viewWindow },
  { eyebrow: "Where Every Moment Becomes An Experience", title: "Humanity rises.", subtitle: "Evolve", image: IMAGES.poolAmenity },
  { eyebrow: "Where Learning & Legacy Walk Side By Side", title: "Wisdom rises.", subtitle: "Belong", image: IMAGES.schoolLife },
];

export default function ShowcaseRail() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-20 md:py-40">
      <motion.div
        className="max-w-[720px] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-xs tracking-[0.36em] uppercase text-primary mb-4">Dedication & Discipline Walk Side By Side</p>
        <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
          Greater Matunga District — where every chapter of life rises.
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-[44px] bg-black shadow-[0_40px_100px_rgba(0,0,0,0.4)] min-h-[460px] md:min-h-[680px]"
          >
            {/* Media */}
            <div className="absolute inset-0 z-[1]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-[2]" />
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-[3] text-white">
              <p className="text-[0.72rem] tracking-[0.3em] uppercase text-primary/80 mb-4">{card.eyebrow}</p>
              <h3 className="font-heading text-2xl md:text-4xl leading-[0.92] font-medium mb-8">{card.title}</h3>
              <div className="flex items-center gap-3 text-[0.76rem] tracking-[0.18em] uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                <span>{card.subtitle}</span>
                <span className="w-10 h-px bg-primary group-hover:w-[60px] transition-all duration-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}