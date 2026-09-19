"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Activity, Cpu } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;

  const bgImage = (hero as any).backgroundImageSrc || "/images/arena-competition.jpg";

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-[#08090C]">
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

      {/* 2. Deep Gradient Overlays for Razor-Sharp Text Legibility & Arena Atmosphere */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08090C] via-[#08090C]/90 to-[#08090C]/50 lg:to-[#08090C]/20 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-tech-grid opacity-25 pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Headline & Narrative Column */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/15 border border-kyorix-blue/40 rounded-full shadow-lg shadow-kyorix-blue/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                {hero.badge}
              </span>
            </div>

            {/* Main Headline - Bold, Crisp, Fitting Naturally */}
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xl shadow-kyorix-blue/30 transition-all duration-150 group"
              >
                <span>{hero.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.ctaSecondaryLink || "/contact?intent=demo"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black/40 hover:bg-white/10 text-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded border border-[#1E2638] hover:border-gray-400 backdrop-blur-md transition-all duration-150"
              >
                <span>{hero.ctaSecondaryText}</span>
              </Link>
            </div>

            {/* Sports-Tech Engineering Highlights Strip */}
            <div className="pt-6 border-t border-[#1E2638]/70 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-kyorix-blue shrink-0" />
                <div className="text-xs font-mono text-gray-300">
                  <div className="font-bold text-white uppercase text-[11px]">Sub-Millisecond</div>
                  <div className="text-[10px] text-gray-400">Scoring Consensus</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="text-xs font-mono text-gray-300">
                  <div className="font-bold text-white uppercase text-[11px]">Deterministic</div>
                  <div className="text-[10px] text-gray-400">Tournament Draws</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-xs font-mono text-gray-300">
                  <div className="font-bold text-white uppercase text-[11px]">Audit-Logged</div>
                  <div className="text-[10px] text-gray-400">Official Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Arena Status Monitor Pill (No clunky white logo box!) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center">
            <div className="bg-[#0A0D14]/80 border border-[#1E2638] rounded-xl p-6 shadow-2xl backdrop-blur-md max-w-sm space-y-4 relative overflow-hidden">
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-kyorix-blue to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    ARENA READY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 bg-white/5 border border-white/10 rounded">
                  OFFICIAL WT RULES
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  KYORIX ARENA ECOSYSTEM
                </div>
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                  Electronic scoring, single-elimination draw progression, and multi-court tournament management unified under one architecture.
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E2638] flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-400">SYSTEM ARCHITECTURE</span>
                <span className="text-kyorix-blue font-bold tracking-wider">V2.4 ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
