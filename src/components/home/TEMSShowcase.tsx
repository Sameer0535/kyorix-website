"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Users,
  CreditCard,
  Scale,
  GitBranch,
  Cpu,
  Radio,
  Award,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

const ICON_MAP: Record<string, any> = {
  tournaments: Trophy,
  registration: Users,
  idcard: CreditCard,
  weighin: Scale,
  draws: GitBranch,
  scoring: Cpu,
  results: Radio,
  certificates: Award,
};

export function TEMSShowcase() {
  const { content } = useSiteContent();
  const tems = content.temsProduct;
  const modules = tems.modules || [];

  const [activeModuleId, setActiveModuleId] = useState("tournaments");
  const selectedModule = modules.find((m) => m.id === activeModuleId) || modules[0] || {
    id: "tournaments",
    title: "Tournament Management",
    tag: "Core Governance",
    desc: "Tournament operational control.",
    capabilities: [],
  };

  const ActiveIcon = ICON_MAP[selectedModule.id] || Trophy;

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            label={tems.label || "03 • EVENT MANAGEMENT PLATFORM"}
            title={tems.title || "ONE PLATFORM. THE ENTIRE EVENT."}
            description={tems.subtitle || "Kyorix TEMS (Taekwondo Event Management System) centralizes the entire competition lifecycle—unifying tournament operations, registration, weigh-in, and results into one operational workspace."}
            className="mb-0"
          />
          <Link
            href={tems.ctaLink || "/products/tems"}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-kyorix-blue hover:text-blue-700 transition-colors shrink-0"
          >
            <span>{tems.ctaText || "EXPLORE FULL TEMS SPECIFICATIONS"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8-Module Interactive Operations Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module Selector List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2 py-1">
              Core Operational Modules (Select to View)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
              {modules.map((mod) => {
                const Icon = ICON_MAP[mod.id] || Layers;
                const isSelected = mod.id === activeModuleId;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-150 ${
                      isSelected
                        ? "bg-white border-kyorix-blue shadow-md shadow-blue-500/10 text-slate-900"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isSelected
                            ? "bg-kyorix-blue text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono font-bold uppercase tracking-tight text-slate-900 truncate">
                          {mod.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 truncate">
                          {mod.tag}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold shrink-0 ml-2 ${
                        isSelected ? "text-kyorix-blue" : "text-slate-400"
                      }`}
                    >
                      {mod.number || ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Module Detail Console */}
          <div className="lg:col-span-7">
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 flex flex-col justify-between space-y-6 sm:space-y-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 border border-blue-200 rounded-xl text-kyorix-blue shrink-0">
                      <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-kyorix-blue uppercase tracking-widest">
                        {selectedModule.tag}
                      </span>
                      <h3 className="text-lg sm:text-xl font-mono font-bold text-slate-900 uppercase tracking-tight">
                        {selectedModule.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-mono text-slate-600 rounded-md uppercase font-semibold">
                    Module {selectedModule.number || "01"}
                  </span>
                </div>

                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {selectedModule.desc}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                    Core Operational Capabilities:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(selectedModule.capabilities || []).map((feat, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-kyorix-blue shrink-0 mt-0.5" />
                        <span className="text-xs font-mono text-slate-700 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Console Footer */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 relative z-10">
                <span>Integrated in Kyorix TEMS platform</span>
                <Link
                  href="/products/tems"
                  className="text-kyorix-blue hover:text-blue-700 transition-colors flex items-center gap-1 uppercase font-bold"
                >
                  <span>View full specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
