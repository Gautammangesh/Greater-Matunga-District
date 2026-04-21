import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IMAGES from "@/lib/images";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Story", href: "story" },
  { label: "Metrics", href: "metrics" },
  { label: "Lifestyle", href: "lifestyle" },
  { label: "Location", href: "location" },
  { label: "Future", href: "future" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = window.innerWidth >= 1024 ? 120 : 102;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] max-w-[1280px] z-[1500] flex items-center justify-between gap-5 px-4 md:px-6 py-3 rounded-full border backdrop-blur-[24px] transition-all duration-500 ${
        scrolled
          ? "border-primary/15 shadow-[0_20px_80px_rgba(0,0,0,0.12)] bg-black/10"
          : "border-white/25 bg-transparent"
      }`}
    >
      {/* Brand */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 min-w-0">
        <img src={IMAGES.crestGold} alt="Greater Matunga District" className="w-[42px] flex-shrink-0" />
        <span className="hidden md:inline text-xs font-bold tracking-[0.18em] uppercase whitespace-nowrap text-foreground text-white">
          Greater Matunga District
        </span>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-xs tracking-[0.14em] uppercase text-white/60 hover:text-primary transition-colors"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* CTA + Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => scrollTo("enquiry")}
          className="hidden md:inline-flex px-5 py-3 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.14em] uppercase hover:bg-primary/90 transition-colors"
        >
          Enquire Now
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full border border-primary/35 text-white"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-3 left-4 right-4 flex flex-col bg-white/96 border border-border rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-4 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="w-full text-left py-3.5 px-2 text-xs tracking-[0.14em] uppercase text-muted-foreground border-b border-border last:border-b-0 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("enquiry")}
              className="mt-3 w-full py-3 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.14em] uppercase"
            >
              Enquire Now
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
