"use client";

import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

export function FutureRoadmap() {
  const { content } = useSiteContent();
  const roadmap = content.futureRoadmap;
  const stages = roadmap.stages || [];

  return (
    <section className="py-20 md:py-28 bg-[#0D1117] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={roadmap.label || "TECHNOLOGY EVOLUTION"}
          title={roadmap.title || "BUILT FOR WHAT COMES NEXT."}
          description={
            roadmap.description ||
            "Kyorix begins with Taekwondo competition technology, with a long-term vision of building an integrated sports technology ecosystem across competitive sports."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stages.map((stage, idx) => (
            <div
              key={stage.title || idx}
              className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative border transition-all duration-200 ${
                stage.active
                  ? "bg-[#111622] border-kyorix-blue shadow-lg shadow-kyorix-blue/10"
                  : "bg-[#0A0D14] border-[#1E2638] opacity-90 hover:opacity-100"
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded border ${
                      stage.active
                        ? "bg-kyorix-blue text-white border-kyorix-blue"
                        : "bg-white/5 text-gray-400 border-white/10"
                    }`}
                  >
                    {stage.status}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-bold">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-wider">
                    {stage.title}
                  </h3>
                  <div className="text-[11px] font-mono text-kyorix-blue font-semibold">
                    {stage.badge}
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E2638] text-[11px] font-mono text-gray-500">
                {stage.active ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Operational & Supported
                  </span>
                ) : (
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Forward Engineering Target
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
