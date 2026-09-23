"use client";

import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

export function CompetitionLifecycle() {
  const { content } = useSiteContent();
  const lifecycle = content.competitionLifecycle;
  const stages = lifecycle.stages || [];

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={lifecycle.label || "END-TO-END COMPETITION WORKFLOW"}
          title={lifecycle.title || "FROM REGISTRATION TO THE PODIUM."}
          description={
            lifecycle.description ||
            "Every sanctioned tournament follows an exacting operational progression. Kyorix digitizes and synchronizes each stage with uninterrupted data lineage."
          }
        />

        {/* Desktop Horizontal Scrollable Timeline */}
        <div className="hidden lg:block mt-12 overflow-x-auto pb-6">
          <div className="min-w-[1100px] relative">
            {/* Continuous Connecting Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-kyorix-blue via-[#1E2638] to-kyorix-blue" />

            <div
              className="grid gap-2 relative z-10"
              style={{ gridTemplateColumns: `repeat(${stages.length || 1}, minmax(0, 1fr))` }}
            >
              {stages.map((stage) => (
                <div key={stage.step} className="flex flex-col items-center text-center group">
                  {/* Step Node */}
                  <div className="w-12 h-12 rounded-full bg-[#111622] border-2 border-[#1E2638] group-hover:border-kyorix-blue flex items-center justify-center font-mono font-bold text-xs text-white shadow-md transition-all duration-200 group-hover:scale-110">
                    {stage.step}
                  </div>

                  {/* Title & Desc */}
                  <div className="mt-4 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-white tracking-wider uppercase group-hover:text-kyorix-blue transition-colors">
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono leading-tight px-1">
                      {stage.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden mt-10 space-y-4">
          <div className="relative pl-7 sm:pl-8 border-l-2 border-kyorix-blue/40 space-y-6 ml-3 sm:ml-4">
            {stages.map((stage) => (
              <div key={stage.step} className="relative group">
                {/* Bullet centered on timeline line */}
                <div className="absolute -left-[41px] sm:-left-[45px] top-1 w-6 h-6 rounded-full bg-[#111622] border-2 border-kyorix-blue flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md">
                  {stage.step}
                </div>

                <div className="bg-[#111622] border border-[#1E2638] rounded-lg p-3.5 space-y-1">
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {stage.name}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {stage.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
