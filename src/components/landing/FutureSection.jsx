import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const FUTURE_CARDS = [
  { title: "MTHL Atal Setu — 5 Km | INR 17,843 Cr.", image: IMAGES.atalSetu },
  { title: "Mumbai Coastal Road — INR 14,500 Cr.", image: IMAGES.cityDrone },
  { title: "Metro Line 3 (Aqua) & Line 4 (Green) — 5 Km Away", image: IMAGES.viewWindow },
  { title: "Mumbai–Ahmedabad Bullet Train — 7.5 Km | INR 1,10,000 Cr.", image: IMAGES.matungaAerial },
];

export default function FutureSection() {
  return (
    <section id="future" className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-24 scroll-mt-32 md:scroll-mt-44">
      <motion.div
        className="max-w-[720px] mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-xs tracking-[0.36em] uppercase text-primary mb-4">A Future Of Connectivity</p>
        <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
          Where connectivity builds value.
        </h2>
      </motion.div>

      {/* Key stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded-3xl border border-primary/20 bg-primary/5"
        >
          <p className="font-heading text-3xl md:text-4xl text-primary mb-1">INR 3.50+ Lakh Cr.</p>
          <p className="text-muted-foreground text-sm">Worth of infrastructure capital deployed in & around the micro-market</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="p-6 rounded-3xl border border-accent/20 bg-accent/5"
        >
          <p className="font-heading text-3xl md:text-4xl text-accent mb-1">2,078 Km.</p>
          <p className="text-muted-foreground text-sm">Worth of projects delivered and under construction across the region</p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-muted-foreground leading-[1.9] mb-12 max-w-2xl"
      >
        A legacy of planning, a future of connectivity. The region is set to benefit from transformative infrastructure projects that will enhance its "Greater Matunga" identity — accelerating its rise from under-recognised to undeniable.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FUTURE_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: i * 0.12 }}
            className="group relative h-[360px] md:h-[480px] rounded-[48px] overflow-hidden bg-black border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.2)] hover:-translate-y-3 hover:shadow-[0_60px_120px_rgba(0,0,0,0.4)] transition-all duration-700"
          >
            <div className="absolute inset-0 z-[1]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-[2]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-[3]">
              <h3 className="font-heading text-xl md:text-3xl text-white leading-[1.1] font-medium">{card.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
