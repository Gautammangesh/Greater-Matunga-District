import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

export default function IntroSpread() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-20 md:py-40 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
        {/* Brand Panel */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[520px] lg:min-h-[720px] rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.18)]"
          style={{
            background: `linear-gradient(180deg, rgba(11,36,77,0.95), rgba(18,46,89,0.95)), url(${IMAGES.blueBack}) center/cover no-repeat`,
            color: "#f4ede1",
          }}
        >
          <div className="h-full flex flex-col justify-center p-8 md:p-16">
            <motion.img
              src={IMAGES.crestGold}
              alt="Crest"
              className="w-[92px] mb-7"
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="text-xs tracking-[0.36em] uppercase text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The New Centre
            </motion.p>
            <motion.h2
              className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.92] mt-4 mb-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Greater Matunga District
            </motion.h2>
            <motion.p
              className="max-w-[420px] leading-[1.9] text-white/65 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              Where legacy evolves into the future. A district reborn with purpose, pride, and ambition at its centre.
            </motion.p>
            <motion.div
              className="mt-8 flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {["Curated Luxury", "The New Centre", "Collective Joy"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-[0.65rem] tracking-[0.18em] uppercase text-white/70">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Visual Panel */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px] lg:min-h-[720px]"
        >
          {/* Decorative shape */}
          <motion.div
            className="absolute inset-y-[6%] right-0 w-[82%] bg-gradient-to-br from-primary/18 to-transparent rounded-[36px] -z-0"
            style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 82%, 78% 100%, 0% 92%, 0% 18%)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          {/* Main Image */}
          <motion.div
            className="absolute inset-y-[4%] left-[14%] right-0 lg:bottom-[2%] rounded-[34px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.12)]"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={IMAGES.matungaAerial}
              alt="Aerial view of Matunga"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Top card */}
          <motion.div
            className="absolute top-0 left-0 w-[200px] md:w-[240px] h-[230px] md:h-[280px] rounded-[34px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.18)] border border-border bg-card hidden md:block"
            initial={{ opacity: 0, y: -40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotate: -1.5 }}
          >
            <img src={IMAGES.temple} alt="Temple landmark" className="w-full h-full object-cover" />
          </motion.div>

          {/* Bottom card */}
          <motion.div
            className="absolute left-[4%] bottom-[2%] w-[220px] md:w-[260px] h-[260px] md:h-[320px] rounded-[34px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.18)] border border-border bg-card hidden md:block"
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotate: 1.5 }}
          >
            <img src={IMAGES.schoolLife} alt="School life" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
