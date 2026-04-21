import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const PRINCIPLES = [
  { title: "Wellness As A Daily Ritual", text: "Well-being is not an occasional indulgence here. It is the foundation of how the day begins and ends." },
  { title: "Connected, With Grace", text: "Spaces that offer connection without disruption. Proximity to everything, without the chaos of anything." },
  { title: "Living In Balance", text: "Everyday living feels unhurried, composed and calm — a pace that the city rarely offers." },
  { title: "Central, Yet Serene", text: "At the heart of the city, yet removed from its rush. Where the district's legacy is your quiet advantage." },
];

export default function LifestyleSection() {
  return (
    <section id="lifestyle" className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-24 overflow-hidden scroll-mt-32 md:scroll-mt-44">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Copy */}
        <div>
          <motion.div
            className="max-w-[720px] mb-9"
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
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              A Holistic Way To Live
            </motion.p>
            <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
              {"Real rise begins here.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em]"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.09 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-muted-foreground leading-[1.9] mb-8 max-w-lg"
          >
            A district shaped by intention, not impulse. Thoughtfully planned spaces, breathing landscapes, and a way of living that values balance over excess — coming together to redefine everyday life. Because well-being is not a feature. It is a holistic way to live.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, borderColor: "hsl(var(--primary) / 0.35)" }}
                className="p-6 rounded-[28px] border border-border bg-card/86 backdrop-blur-xl shadow-[0_30px_80px_rgba(20,20,20,0.12)] transition-all duration-500 cursor-default"
              >
                <motion.h3
                  className="text-xs tracking-[0.12em] uppercase text-primary font-semibold mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  {p.title}
                </motion.h3>
                <p className="text-muted-foreground leading-[1.8] text-sm">{p.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px] lg:min-h-[820px]"
        >
          {/* Decorative blob */}
          <motion.div
            className="absolute inset-[6%_8%_10%_14%] bg-gradient-to-br from-accent/12 to-primary/8 rounded-[60px_140px_60px_120px]"
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />

          {/* Main portrait */}
          <motion.div
            className="absolute inset-0 left-[18%] rounded-[44px_140px_44px_120px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.15)] border border-border"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7 }}
          >
            <img src={IMAGES.cityDrone} alt="Skyline view" className="w-full h-full object-cover" style={{ objectPosition: "50% 52%" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/2 to-black/18 pointer-events-none" />
          </motion.div>

          {/* Small card top-left */}
          <motion.div
            className="absolute top-[60px] left-0 w-[200px] md:w-[240px] h-[250px] md:h-[300px] rounded-[40px_40px_80px_40px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.18)] border-[6px] border-white/55 hidden md:block"
            initial={{ opacity: 0, x: -40, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.04 }}
          >
            <img src={IMAGES.schoolLife} alt="School life" className="w-full h-full object-cover" style={{ objectPosition: "50% 24%" }} />
          </motion.div>

          {/* Small card bottom-right */}
          <motion.div
            className="absolute right-[40px] bottom-[54px] w-[220px] md:w-[260px] h-[260px] md:h-[320px] rounded-[100px_32px_32px_100px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.18)] border-[6px] border-white/55 hidden md:block"
            initial={{ opacity: 0, x: 40, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2.5 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.04 }}
          >
            <img src={IMAGES.matungaStation} alt="Matunga Station" className="w-full h-full object-cover" style={{ objectPosition: "50% 48%" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
