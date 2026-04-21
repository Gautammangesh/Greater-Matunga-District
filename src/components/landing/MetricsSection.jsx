import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { target: 7800, suffix: "+", title: "Total Homes (2021–2025)", text: "Residential momentum built steadily across the extended Matunga catchment area." },
  { target: 37, suffix: "%", title: "Price Appreciation", text: "Residential values rising ~37% by end of 2025. Closely aligned with South Central Mumbai." },
  { target: 98, suffix: "%", title: "Inventory Absorbed", text: "Under-construction available inventory as of Q4 2025 — near zero residual stock." },
  { target: 15, suffix: "–60 Mins", title: "Anywhere That Matters", text: "Perfectly central. BKC 18 mins, Lower Parel 20 mins, Airport 25 mins." },
];

function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const rafRef = useRef(null);
  const valueRef = useRef(0);

  useEffect(() => {
    const animateTo = (nextValue, duration = 900) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startValue = valueRef.current;
      const delta = nextValue - startValue;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(startValue + delta * eased);
        valueRef.current = current;
        setValue(current);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateTo(target, 1200);
        } else {
          animateTo(0, 700);
        }
      },
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  const formatted = target >= 1000 ? value.toLocaleString("en-IN") : value;
  return (
    <p ref={ref} className="text-3xl md:text-5xl font-extrabold text-primary leading-[0.9] mb-3 font-body">
      {prefix}{formatted}{suffix}
    </p>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-20 overflow-hidden scroll-mt-32 md:scroll-mt-44">
      <motion.div
        className="max-w-[720px] mb-9"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-xs tracking-[0.36em] uppercase text-primary mb-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Micro-Market On The Rise
        </motion.p>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.96] tracking-tight">
          {"A new wave of development takes shape.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, boxShadow: "0 36px_90px rgba(20,20,20,0.18)" }}
            className="p-6 md:p-7 rounded-[28px] border border-border bg-card/86 backdrop-blur-xl shadow-[0_30px_80px_rgba(20,20,20,0.12)] hover:-translate-y-2 hover:shadow-[0_36px_90px_rgba(20,20,20,0.16)] hover:border-primary/25 transition-all duration-500"
          >
            <AnimatedCounter target={m.target} prefix={m.prefix} suffix={m.suffix} />
            <h3 className="text-sm font-semibold mb-2">{m.title}</h3>
            <p className="text-muted-foreground text-sm leading-[1.8]">{m.text}</p>
          </motion.article>
        ))}
      </div>

      {/* Trend Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-7 p-6 md:p-9 rounded-3xl bg-card/86 border border-border backdrop-blur-xl shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
      >
        <div>
          <motion.p
            className="text-xs tracking-[0.36em] uppercase text-primary mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Positioning
          </motion.p>
          <h3 className="text-lg font-semibold mb-3">Empowered by INR 3.50+ Lakh Crore in infrastructure investments.</h3>
          <p className="text-muted-foreground leading-[1.8] text-sm mb-3">
            Next phase of transformation market re-envisioned by India's leading developers: Godrej, Mahindra, Lodha, Runwal, Dosti, TransIndia and many more.
          </p>
          <p className="text-muted-foreground leading-[1.8] text-sm">
            Development momentum spanning 20+ acres with INR 14–20 Thousand Crore GDV potential. Budget segment: INR 1.5 Cr – INR 3 Cr.
          </p>
        </div>
        <div className="relative min-h-[280px] rounded-2xl overflow-hidden bg-card border border-border">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)",
              backgroundSize: "100% 20%, 18% 100%",
            }}
          />
          <svg viewBox="0 0 560 300" className="absolute inset-0 w-full h-full">
            <motion.path
              d="M20 255 C90 245, 120 230, 170 190 S280 115, 330 115 S430 92, 540 50"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 255 C90 248, 120 238, 170 203 S280 132, 330 125 S430 100, 540 60"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.85"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute left-6 right-6 bottom-5 flex justify-between text-xs tracking-[0.16em] uppercase text-muted-foreground">
            <span>2021</span><span>2023</span><span>2025</span><span>2028</span>
          </div>
          <div className="absolute top-4 left-6 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-4 h-[3px] rounded bg-primary inline-block" />Matunga</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-[3px] rounded bg-accent inline-block" />South Central</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
