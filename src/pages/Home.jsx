import React, { useState } from "react";
import Loader from "@/components/landing/Loader";
import ScrollProgress from "@/components/landing/ScrollProgress";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import IntroSpread from "@/components/landing/IntroSpread";
import StorySection from "@/components/landing/StorySection";
import MetricsSection from "@/components/landing/MetricsSection";
import LifestyleSection from "@/components/landing/LifestyleSection";
import HighlightsSection from "@/components/landing/HighlightsSection";
import AmenitiesGallery from "@/components/landing/AmenitiesGallery";
import ShowcaseRail from "@/components/landing/ShowcaseRail";
import LocationSection from "@/components/landing/LocationSection";
import FutureSection from "@/components/landing/FutureSection";
import CTASection from "@/components/landing/CTASection";
import TransIndiaSection from "@/components/landing/TransIndiaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative [overflow-x:clip]">
      {/* Loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 28%), radial-gradient(circle at 80% 0%, hsl(var(--primary) / 0.08), transparent 22%)",
        }}
      />

      <ScrollProgress />
      <Header />

      <main className="relative z-[2]">
        <HeroSection />
        <IntroSpread />
        <TransIndiaSection />
        <StorySection />
        <MetricsSection />
        <LifestyleSection />
        <HighlightsSection />
        <AmenitiesGallery />
        <ShowcaseRail />
        <LocationSection />
        <FutureSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
