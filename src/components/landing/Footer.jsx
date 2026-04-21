import React from "react";
import IMAGES from "@/lib/images";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-secondary/40">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={IMAGES.crestGold} alt="" className="w-[44px]" />
            <div>
              <p className="font-heading text-xl text-primary leading-tight">TransIndia</p>
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-foreground">Excellence Always</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-[1.8] max-w-[240px]">
            Greater Matunga District — Where Mumbai's Next Chapter Begins.
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-3">Site Address</p>
          <p className="text-sm text-muted-foreground leading-[1.8]">
            Panjabi Colony, Sion–Matunga Road,<br />
            Mumbai, Maharashtra – 400037
          </p>
          <a href="tel:+912224149877" className="mt-2 inline-block text-sm text-primary font-semibold hover:underline">
            +91 22414 98877
          </a>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-3">Navigate</p>
          <div className="grid grid-cols-2 gap-y-2">
            {["Story", "Metrics", "Lifestyle", "Location", "Future", "Enquire"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  const el = document.getElementById(l.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else if (l === "Enquire") document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} TransIndia Group. All rights reserved. | MahaRERA Registration Number: P51800033001
        </p>
      </div>
    </footer>
  );
}