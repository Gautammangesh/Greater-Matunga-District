import React, { useState } from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";
import { Input } from "@/components/ui/input";

export default function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Thank you, ${name.trim() || "there"}. Our team will connect with you shortly.`);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <section id="enquiry" className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-16 overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-stretch">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.93 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[40px] shadow-[0_30px_80px_rgba(20,20,20,0.18)] min-h-[500px] lg:min-h-[780px] group"
        >
          <motion.img
            src={IMAGES.heroFamilyTowers}
            alt="Greater Matunga District"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 14%" }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 pointer-events-none" />
          <motion.div
            className="absolute bottom-8 left-8 right-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <p className="font-heading text-3xl leading-tight">The Time To Rise Is Now.</p>
            <p className="text-white/70 text-sm mt-2">Limited residences. Early advantage belongs to those who act.</p>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center py-4 md:py-8"
        >
          <motion.img
            src={IMAGES.crestGold}
            alt=""
            className="w-[88px] mb-5"
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="text-xs tracking-[0.36em] uppercase text-primary mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Time To Rise Is Now
          </motion.p>
          <motion.h2
            className="font-heading text-4xl md:text-6xl leading-[0.96] tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Own your address in the Greater Matunga District.
          </motion.h2>
          <motion.p
            className="text-muted-foreground leading-[1.9] mb-3 max-w-lg text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            Matunga has evolved. The district is being redefined. The opportunity is here. Secure your place in a destination where legacy meets growth and value meets vision.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6 text-xs tracking-[0.18em] uppercase text-primary"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <span>Connect</span><span className="text-primary/30">›</span>
            <span>Grow</span><span className="text-primary/30">›</span>
            <span>Evolve</span><span className="text-primary/30">›</span>
            <span>Belong</span>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 rounded-2xl border-border/40 bg-muted/50 px-5"
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-2xl border-border/40 bg-muted/50 px-5"
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 rounded-2xl border-border/40 bg-muted/50 px-5 sm:col-span-2"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="sm:col-span-2 h-14 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.16em] uppercase shadow-[0_18px_40px_rgba(168,109,43,0.22)] hover:bg-primary/90 transition-colors"
            >
              Request A Call Back
            </motion.button>
          </motion.form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-primary text-sm tracking-wide"
            >
              {message}
            </motion.p>
          )}

          <motion.div
            className="mt-6 pt-5 border-t border-border/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p className="text-xs text-muted-foreground leading-[1.8]">
              <strong className="text-foreground text-xs">Site Address:</strong> Panjabi Colony, Sion–Matunga Road, Mumbai, Maharashtra – 400037
            </p>
            <a href="tel:+912224149877" className="text-xs text-primary font-semibold tracking-wide mt-1 inline-block hover:underline">
              +91 22414 98877
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
