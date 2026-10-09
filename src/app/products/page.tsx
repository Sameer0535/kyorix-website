import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, GitBranch, Layers, CheckCircle2, Shield, Plus } from "lucide-react";
import { PRODUCTS, ROADMAP_STAGES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Products | Kyorix Sport Technology",
  description:
    "Explore the Kyorix competition technology ecosystem: Kyorix Score, Kyorix Bracket, and Kyorix TEMS.",
};

export default function ProductsPage() {
  const icons = [Cpu, GitBranch, Layers];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              OUR PRODUCTS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-slate-900 uppercase leading-tight">
            TECHNOLOGY BUILT <br />
            <span className="text-kyorix-blue">FOR COMPETITION.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Kyorix develops three specialized software platforms engineered to address distinct operational demands across the tournament lifecycle. Designed to run as independent solutions or integrate into an all-inclusive competition ecosystem.
          </p>
        </div>

        {/* Ecosystem Synthesis Formula */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest text-center mb-6">
            The Integrated Platform Formula
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center">
            <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg flex-1 w-full shadow-sm">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                KYORIX SCORE
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Court Scoring & Controller
              </div>
            </div>

            <div className="text-kyorix-blue font-bold text-lg font-mono">
              +
            </div>

            <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg flex-1 w-full shadow-sm">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                KYORIX BRACKET
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Draw, Seeding & Progression
              </div>
            </div>

            <div className="text-kyorix-blue font-bold text-lg font-mono">
              +
            </div>

            <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg flex-1 w-full shadow-sm">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                KYORIX TEMS
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Event Management Console
              </div>
            </div>

            <div className="text-kyorix-blue font-bold text-lg font-mono">
              =
            </div>

            <div className="bg-blue-50/70 border-2 border-kyorix-blue px-6 py-4 rounded-lg flex-1 w-full shadow-sm">
              <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                KYORIX ECOSYSTEM
              </div>
              <div className="text-[11px] font-mono text-slate-700 mt-1 font-semibold">
                Unified Competition Backbone
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Breakdown */}
        <div className="space-y-12">
          {PRODUCTS.map((prod, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-kyorix-blue">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-kyorix-blue uppercase font-bold">
                        PLATFORM 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-mono font-black text-slate-900 uppercase">
                        {prod.name}
                      </h2>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-700 font-bold uppercase tracking-wider">
                    {prod.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold">
                      Core Functional Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
                      {prod.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-kyorix-blue shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={prod.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-md shadow-kyorix-blue/20 transition-colors"
                    >
                      <span>Explore {prod.name} Specifications</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 text-xs font-mono">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 font-bold">
                    Operational Scope & Purpose
                  </div>
                  <div className="space-y-3 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Primary User:</span>
                      <span className="text-slate-900 font-semibold">
                        {prod.id === "score"
                          ? "Court Referees, Corner Judges & Match Controllers"
                          : prod.id === "bracket"
                          ? "Competition Directors & Technical Delegates"
                          : "Tournament Organizers, Officials & Federations"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Deployment Context:</span>
                      <span className="text-slate-900 font-semibold">
                        {prod.id === "score"
                          ? "Arena Mat-side Controllers & Scoreboards"
                          : prod.id === "bracket"
                          ? "Control Room & Public Tournament Monitors"
                          : "Headquarters, Weigh-In Terminals & Registration Desks"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Data Synchronization:</span>
                      <span className="text-emerald-600 font-semibold">
                        Real-time Socket Protocol with Local Fallback
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Roadmap Section */}
        <div className="border-t border-slate-200 pt-16 space-y-8">
          <SectionHeading
            label="DEVELOPMENT PROGRESSION"
            title="PRODUCT ROADMAP"
            description="Our engineering roadmap transparently outlines current operational products alongside future hardware and technology directions."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP_STAGES.map((stage) => (
              <div
                key={stage.status}
                className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm hover:border-kyorix-blue/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-bold text-slate-700">
                    {stage.status}
                  </span>
                  <span className="text-kyorix-blue font-bold">{stage.badge}</span>
                </div>
                <h3 className="text-sm font-mono font-bold text-slate-900 uppercase">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
