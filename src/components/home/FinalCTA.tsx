"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";

export function FinalCTA() {
  const { content } = useSiteContent();
  const cta = content.finalCTA;

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
            {cta.badge || "COMPETE. CONNECT. ELEVATE."}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white uppercase leading-tight">
          {cta.title || "READY TO ELEVATE COMPETITION?"}
        </h2>

        <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
          {cta.description ||
            "Talk to Kyorix about your competition technology requirements. Whether you are running a regional championship or managing national circuit events, our platforms deliver uncompromised precision."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={cta.primaryButtonLink || "/contact?intent=demo"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xl shadow-kyorix-blue/25 transition-all duration-150"
          >
            <span>{cta.primaryButtonText || "REQUEST A DEMO"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={cta.secondaryButtonLink || "/contact"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider rounded border border-[#1E2638] hover:border-gray-500 transition-all duration-150"
          >
            <Mail className="w-4 h-4 text-kyorix-blue" />
            <span>{cta.secondaryButtonText || "CONTACT KYORIX"}</span>
          </Link>
        </div>

        <div className="pt-8 text-[11px] font-mono text-gray-500">
          {cta.footerNote ||
            "KYORIX SPORT TECHNOLOGY PRIVATE LIMITED • ESTABLISHED FOR SANCTIONED COMPETITIVE SPORTS"}
        </div>
      </div>
    </section>
  );
}
