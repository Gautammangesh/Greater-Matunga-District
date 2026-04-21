import React from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";

const LOCATION_DATA = [
  {
    title: "Leisure & Entertainment",
    items: [
      { name: "PVR Cinemas, Sion", time: "5 mins" },
      { name: "Five Gardens, Matunga", time: "10 mins" },
      { name: "Shivaji Park", time: "15 mins" },
      { name: "Matunga Cultural Precinct", time: "10 mins" },
      { name: "Phoenix Palladium", time: "20 mins" },
    ],
  },
  {
    title: "Education",
    items: [
      { name: "Don Bosco High School", time: "4 mins" },
      { name: "SIES College", time: "5 mins" },
      { name: "KJ Somaiya College", time: "8 mins" },
      { name: "Ruia College", time: "10 mins" },
      { name: "ICT (UDCT), Matunga", time: "12 mins" },
    ],
  },
  {
    title: "Commercial Hubs",
    items: [
      { name: "BKC", time: "18 mins" },
      { name: "Lower Parel", time: "20 mins" },
      { name: "Fort / CST", time: "20 mins" },
      { name: "Andheri-Kurla Belt", time: "25 mins" },
      { name: "SEEPZ MIDC", time: "30 mins" },
    ],
  },
  {
    title: "Healthcare",
    items: [
      { name: "Lokmanya Tilak Hospital", time: "6 mins" },
      { name: "Sion Hospital", time: "7 mins" },
      { name: "Hinduja Hospital", time: "15 mins" },
      { name: "Fortis S. L. Raheja", time: "15 mins" },
      { name: "P.D. Hinduja Hospital", time: "15 mins" },
    ],
  },
];

export default function LocationSection() {
  return (
    <section id="location" className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-24 overflow-hidden scroll-mt-32 md:scroll-mt-44">
      <motion.div
        className="max-w-[720px] mb-10"
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
          Perfectly Central
        </motion.p>
        <h2 className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight">
          {"The only map where heritage is your north star.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[400px] md:min-h-[740px] rounded-[36px] overflow-hidden shadow-[0_30px_80px_rgba(20,20,20,0.12)] border border-border mb-7"
      >
        <img
          src={IMAGES.locationMap}
          alt="Location map"
          className="w-full h-full object-contain p-4 md:p-5"
          style={{ background: "linear-gradient(180deg, rgba(250,246,239,0.86), rgba(240,230,214,0.8))" }}
        />
        {/* Pulse markers */}
        <motion.div
          className="absolute top-[54%] left-[46%] w-4 h-4 rounded-full bg-primary"
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute top-[62%] left-[39%] w-4 h-4 rounded-full bg-primary"
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-[41%] left-[57%] w-4 h-4 rounded-full bg-primary"
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        />
      </motion.div>

      {/* Location Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LOCATION_DATA.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="p-6 rounded-3xl border border-border bg-card/86 backdrop-blur-xl shadow-[0_30px_80px_rgba(20,20,20,0.12)] hover:border-primary/25 transition-all duration-500"
          >
            <h3 className="text-sm font-semibold mb-4">{group.title}</h3>
            <ul className="space-y-0">
              {group.items.map((item, j) => (
                <motion.li
                  key={j}
                  className="flex justify-between gap-4 py-3.5 border-b border-border last:border-b-0 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + j * 0.06 }}
                >
                  <span className="text-muted-foreground">{item.name}</span>
                  <strong className="text-primary whitespace-nowrap">{item.time}</strong>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
