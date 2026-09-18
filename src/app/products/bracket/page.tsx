import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GitBranch, Shield, CheckCircle2, Shuffle, Lock, UserCheck, Calendar } from "lucide-react";
import { ProductImageFrame } from "@/components/products/ProductImageFrame";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Kyorix Bracket | Competition Draw & Bracket Management",
  description:
    "Generate, manage and operate tournament brackets with an integrated competition workflow.",
};

export default function KyorixBracketPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              COMPETITION DRAW & BRACKET MANAGEMENT
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            KYORIX BRACKET
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Generate, manage and operate tournament brackets with an integrated competition workflow. Mathematically balanced draw generation, automated BYE placement, and real-time match advancement directly driven by court scoring.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>REQUEST BRACKET DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Official Software Screenshot Frame */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Official Bracket Software Interface
            </h2>
            <span className="text-xs font-mono text-gray-400">
              Automated draw & progression tree
            </span>
          </div>
          <ProductImageFrame
            title="KYORIX BRACKET — COMPETITION PROGRESSION TREE"
            subtitle="Automated category draws, single/double elimination progression, and court assignment"
            imageSrc="/images/products/bracket.png"
            altText="Kyorix Bracket software interface"
            badge="BRACKET ENGINE"
          />
        </div>

        {/* Four Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
            <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
              <Shuffle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-mono font-bold text-white uppercase">
              Draw Generation & BYEs
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automated power-of-two bracket scaling. Deterministic distribution of BYEs to top-seeded competitors to avoid unfair match clustering.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
            <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-mono font-bold text-white uppercase">
              Seeding Rules & Separation
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Country, club, and state separation constraints ensure athletes from the same team do not face each other in preliminary rounds.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
            <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-mono font-bold text-white uppercase">
              Cryptographic Draw Locking
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Once official weigh-in concludes and the draw ceremony is finalized, brackets can be locked to prevent unauthorized tampering.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
            <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-mono font-bold text-white uppercase">
              Court Mat Assignment
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Matches are dynamically routed to available competition courts, optimizing mat utilization and minimizing athlete wait times.
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-xl p-8 space-y-6">
          <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
            Tournament Management Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Single & double elimination brackets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Round-robin & repechage options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Live winner automatic advancement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Direct export to PDF & arena displays</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Public web bracket viewer link</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Historical bracket archive records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
