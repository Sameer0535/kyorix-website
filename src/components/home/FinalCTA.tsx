"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";

export function FinalCTA() {
  const { content } = useSiteContent();
  const cta = content.finalCTA;

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
            {cta.badge || "COMPETE. CONNECT. ELEVATE."}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-slate-900 uppercase leading-tight">
          {cta.title || "READY TO ELEVATE COMPETITION?"}
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          {cta.description ||
            "Talk to Kyorix about your competition technology requirements. Whether you are running a regional championship or managing national circuit events, our platforms deliver uncompromised precision."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={cta.primaryButtonLink || "/contact?intent=demo"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-xl shadow-blue-500/25 transition-all duration-150"
          >
            <span>{cta.primaryButtonText || "CONTACT NOW"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={cta.secondaryButtonLink || "/contact"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-150"
          >
            <Mail className="w-4 h-4 text-kyorix-blue" />
            <span>{cta.secondaryButtonText || "CONTACT KYORIX"}</span>
          </Link>
        </div>

        <div className="pt-8 text-[11px] font-mono text-slate-400">
          {cta.footerNote ||
            "KYORIX SPORT TECHNOLOGY PRIVATE LIMITED • ESTABLISHED FOR SANCTIONED COMPETITIVE SPORTS"}
        </div>
      </div>
    </section>
  );
}
