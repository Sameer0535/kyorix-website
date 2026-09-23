import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Download, Newspaper, LifeBuoy, ArrowRight, FileText, Lock, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Resources & Documentation | Kyorix Sport Technology",
  description:
    "Product documentation, technical specification sheets, official announcements, and product support.",
};

export default function ResourcesPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              RESOURCES & KNOWLEDGE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            TECHNICAL <br />
            <span className="text-kyorix-blue">RESOURCES.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Access official product documentation, technical brochures, system user manuals, and technical support channels for Kyorix competition software.
          </p>
        </div>

        {/* 4 Core Resource Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Documentation */}
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-5 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg text-kyorix-blue">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                TECHNICAL DOCS
              </span>
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
                DOCUMENTATION
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Comprehensive integration guides, tournament setup walkthroughs, and rule-set configuration manuals for court operators.
              </p>
            </div>
            <div className="space-y-2 border-t border-[#1E2638] pt-4 text-xs font-mono text-gray-300">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">Kyorix Score Operator Manual v2.4</span>
                <span className="text-[10px] text-kyorix-blue font-bold shrink-0">PDF MANUAL</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">Bracket Seeding & BYE Engine Guide</span>
                <span className="text-[10px] text-kyorix-blue font-bold shrink-0">DOCS</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">TEMS Weigh-in Terminal Protocol</span>
                <span className="text-[10px] text-kyorix-blue font-bold shrink-0">SPEC</span>
              </div>
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-5 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg text-kyorix-blue">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                PRODUCT BRIEFS
              </span>
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
                DOWNLOADS
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Official product brochures, technical data sheets, and company overview materials for tournament organizers and sports federations.
              </p>
            </div>
            <div className="space-y-2 border-t border-[#1E2638] pt-4 text-xs font-mono text-gray-300">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">Kyorix Enterprise Platform Brochure</span>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0">AVAILABLE</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">Court Hardware Requirements Sheet</span>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0">AVAILABLE</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#111622] rounded">
                <span className="truncate max-w-[220px] sm:max-w-none">Competition Engine Whitepaper</span>
                <span className="text-[10px] text-amber-400 font-bold shrink-0">COMING SOON</span>
              </div>
            </div>
          </div>

          {/* News & Announcements */}
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-5 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg text-kyorix-blue">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                ANNOUNCEMENTS
              </span>
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
                NEWS & UPDATES
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Official corporate announcements, tournament technology deployments, and platform releases directly from Kyorix Sport Technology.
              </p>
            </div>
            <div className="border-t border-[#1E2638] pt-6 text-center space-y-2 py-4">
              <Clock className="w-8 h-8 text-kyorix-blue mx-auto" />
              <div className="text-sm font-mono font-bold text-white uppercase">
                OFFICIAL RELEASES COMING SOON
              </div>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                No artificial news generated. Official releases will be posted here as tournament deployments are sanctioned.
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-5 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg text-kyorix-blue">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">
                ACTIVE ASSISTANCE
              </span>
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
                TECHNICAL SUPPORT
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Direct technical assistance for active tournament operators, scoring configuration questions, and arena display troubleshooting.
              </p>
            </div>
            <div className="space-y-3 border-t border-[#1E2638] pt-4 text-xs font-mono">
              <p className="text-gray-400">
                Tournament directors requiring live mat assistance or software licensing can connect directly with our engineering desk:
              </p>
              <Link
                href="/contact?intent=support"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded font-bold uppercase tracking-wider"
              >
                <span>Contact Support Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
