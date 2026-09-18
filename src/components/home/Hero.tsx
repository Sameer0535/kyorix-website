"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;

  return (
    <section className="relative min-h-[85vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient flex items-center">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Company-First Narrative & Confident Typography */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
                {hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
              {hero.headlinePrefix} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                {hero.headlineMiddle}
              </span>{" "}
              <span className="text-kyorix-blue">{hero.headlineAccent}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={hero.ctaPrimaryLink || "/products"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-lg shadow-kyorix-blue/25 transition-all duration-150 group"
              >
                <span>{hero.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.ctaSecondaryLink || "/contact?intent=demo"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded border border-[#1E2638] hover:border-gray-500 transition-all duration-150"
              >
                <span>{hero.ctaSecondaryText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Just the Official Company Logo (Clean, No Outer Console, Crisp HD) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
              {/* Subtle ambient lighting behind logo */}
              <div className="absolute -inset-4 bg-kyorix-blue/20 rounded-3xl blur-3xl opacity-50 pointer-events-none" />

              {/* Pristine Company Logo - Just the logo */}
              <div className="relative z-10 w-full bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/40 flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src={hero.logoImageSrc || "/brand/kyorix-logo.png"}
                  alt={hero.logoAlt || "Kyorix Sport Technology Private Limited"}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain max-w-[340px] sm:max-w-[400px]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
