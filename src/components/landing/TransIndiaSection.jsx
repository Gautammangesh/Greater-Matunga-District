import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const MILESTONES = [
  { value: "1000+", label: "Happy Families" },
  { value: "15+", label: "Years of Real Estate Experience" },
  { value: "60 LAC+\nSq.Ft.", label: "Upcoming Projects" },
  { value: "2500+", label: "Tenements to be Rehabilitated" },
  { value: "12 LAC\nSq.Ft.", label: "Delivered" },
  { value: "55 LAC+\nSq.Ft.", label: "Under Development" },
  { value: "7", label: "Suburbs Across Mumbai" },
];

export default function TransIndiaSection() {
  return (
    <section
      className="w-full py-10 md:py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--background)))" }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left */}
          <div>
            <motion.img
              src={IMAGES.crestGold}
              alt="TransIndia"
              className="w-[72px] mb-4"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.h2
              className="font-heading text-5xl md:text-6xl text-primary leading-tight mb-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              TransIndia
            </motion.h2>
            <motion.p
              className="text-xs tracking-[0.32em] uppercase text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Where Legacy Evolves Into The Future
            </motion.p>
            <motion.p
              className="text-base md:text-lg leading-[1.9] text-foreground/80 mb-5 max-w-lg font-heading italic"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              For last 15 years, TransIndia Group has quietly shaped Mumbai's evolving skyline, not through noise, but through consistency, credibility, and care.
            </motion.p>
            <motion.p
              className="text-muted-foreground leading-[1.85] text-sm max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              Founded by Mr. Rajendra Rajan, the group has grown on a singular belief: <strong>people come before projects.</strong>
            </motion.p>
            <motion.p
              className="mt-4 text-muted-foreground leading-[1.85] text-sm max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              Every development is guided by principles that go beyond construction — a commitment to authenticity, long-term value, and homes that truly serve the lives within them.
            </motion.p>
          </div>

          {/* Right — decorative blue card */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[320px] hidden lg:block"
            whileHover={{ scale: 1.02, rotate: -0.5 }}
          >
            <div
              className="absolute inset-0 rounded-[48px] overflow-hidden shadow-[0_30px_80px_rgba(11,36,77,0.3)]"
              style={{
                background: `linear-gradient(180deg, rgba(11,36,77,0.92), rgba(18,46,89,0.92)), url(${IMAGES.blueBack}) center/cover no-repeat`,
              }}
            >
              <div className="h-full flex flex-col items-center justify-center text-white p-12 text-center">
                <motion.img
                  src={IMAGES.crestGold}
                  alt=""
                  className="w-[80px] mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
                <h3 className="font-heading text-4xl text-white mb-1">TransIndia</h3>
                <p className="text-xs tracking-[0.36em] uppercase text-primary/80 mt-2">Excellence Always</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Milestones */}
        <motion.p
          className="text-xs tracking-[0.36em] uppercase text-primary mb-7 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Milestones
          <motion.span
            className="flex-1 h-px bg-primary/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(168,109,43,0.15)" }}
              className="p-5 rounded-[24px] border border-primary/15 bg-white/60 backdrop-blur cursor-default"
            >
              <p className="font-heading text-2xl md:text-3xl text-primary leading-tight whitespace-pre-line">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-[1.6]">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}