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
    <section className="relative min-h-[85vh] md:min-h-[88vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-[#08090C]">
      {/* 1. Cinematic Background Banner Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Kyorix Competition Arena"
            fill
            priority
            className="object-cover object-center opacity-40 transition-opacity duration-700"
            unoptimized
          />
        </div>
      )}

      {/* 2. Deep Gradient Overlays for High-Contrast Text Legibility & Arena Atmosphere */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08090C] via-[#08090C]/90 to-[#08090C]/40 lg:to-[#08090C]/20 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-tech-grid opacity-25 pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Live Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-kyorix-blue/15 border border-kyorix-blue/40 rounded-full shadow-lg shadow-kyorix-blue/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              {hero.badge}
            </span>
          </div>

          {/* Main Headline - Bold, Crisp, Expansive */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
            {hero.headlinePrefix} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
              {hero.headlineMiddle}
            </span>{" "}
            <span className="text-kyorix-blue drop-shadow-[0_0_35px_rgba(0,84,245,0.5)]">
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Subheadline Text */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
            {hero.subheadline}
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href={hero.ctaPrimaryLink || "/products"}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xl shadow-kyorix-blue/30 transition-all duration-150 group"
            >
              <span>{hero.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.ctaSecondaryLink || "/contact?intent=demo"}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/40 hover:bg-white/10 text-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded border border-[#1E2638] hover:border-gray-400 backdrop-blur-md transition-all duration-150"
            >
              <span>{hero.ctaSecondaryText}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
