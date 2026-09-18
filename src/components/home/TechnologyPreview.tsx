"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Network, ShieldCheck, Database } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechArchitectureDiagram } from "@/components/shared/TechArchitectureDiagram";
import { useSiteContent } from "@/context/ContentContext";

export function TechnologyPreview() {
  const { content } = useSiteContent();
  const tech = content.technologyPreview;
  const pillars = tech.pillars || [];
  const icons = [Network, Cpu, ShieldCheck, Database];

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label={tech.label || "ENGINEERING ARCHITECTURE"}
            title={tech.title || "ENGINEERED FOR COMPETITION."}
            description={
              tech.description ||
              "Our architecture is built specifically for the demanding environment of sanctioned sporting tournaments, where data delay or scoring desynchronization is unacceptable."
            }
            className="mb-0"
          />
          <Link
            href={tech.ctaLink || "/technology"}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-kyorix-blue hover:text-white transition-colors shrink-0"
          >
            <span>{tech.ctaText || "FULL TECHNICAL ARCHITECTURE"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Four Major Technology Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = icons[idx] || Network;
            return (
              <div
                key={pillar.title || idx}
                className="bg-[#0D1117] border border-[#1E2638] rounded-lg p-6 space-y-3 hover:border-kyorix-blue/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded text-kyorix-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-kyorix-blue uppercase">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 2D Architecture Diagram */}
        <TechArchitectureDiagram />
      </div>
    </section>
  );
}
