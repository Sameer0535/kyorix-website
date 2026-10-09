"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;

  const bgImage = (hero as any).backgroundImageSrc || "/images/arena-competition.jpg";

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[88vh] pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-white">
      {/* 1. Cinematic Background Banner Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Kyorix Competition Arena"
            fill
            priority
            className="object-cover object-center opacity-15 transition-opacity duration-700"
            unoptimized
          />
        </div>
      )}

      {/* 2. Crisp Light Gradient Overlays for High-Contrast Text Legibility & Sports Atmosphere */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/95 to-white/70 lg:to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white via-transparent to-white/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-tech-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-radial-gradient pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4 sm:py-6">
        <div className="max-w-4xl space-y-5 sm:space-y-8">
          {/* Live Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-blue-50 border border-blue-200 rounded-full shadow-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              {hero.badge}
            </span>
          </div>

          {/* Main Headline - Bold, Crisp, High-Contrast */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 uppercase leading-[1.1] sm:leading-[1.05] break-words">
            {hero.headlinePrefix} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
              {hero.headlineMiddle}
            </span>{" "}
            <span className="text-kyorix-blue drop-shadow-[0_0_25px_rgba(0,84,245,0.25)]">
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Subheadline Text */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
            {hero.subheadline}
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              href={hero.ctaPrimaryLink || "/products"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-lg shadow-blue-500/25 transition-all duration-150 group"
            >
              <span>{hero.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.ctaSecondaryLink || "/contact?intent=demo"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider rounded border border-slate-300 hover:border-slate-400 shadow-xs backdrop-blur-md transition-all duration-150"
            >
              <span>{hero.ctaSecondaryText}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
