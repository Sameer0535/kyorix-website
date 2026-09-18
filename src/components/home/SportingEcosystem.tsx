"use client";

import React from "react";
import { Users, Shield, Award, Calendar, Globe2, Trophy, Eye, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

export function SportingEcosystem() {
  const { content } = useSiteContent();
  const ecosystem = (content as any).sportingEcosystem || (content as any).ecosystem || {};
  const stakeholders = ecosystem.stakeholders || [];
  const icons = [Award, Users, Building2, Shield, Calendar, Trophy, Eye];

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={ecosystem.label || ecosystem.tag || "STAKEHOLDER CONNECTIVITY"}
          title={ecosystem.title || "BUILT FOR THE SPORTING ECOSYSTEM."}
          description={
            ecosystem.description ||
            ecosystem.subtitle ||
            "Competitive sport requires the harmonious coordination of diverse roles. Kyorix connects every participant through unified, role-governed data interfaces."
          }
        />

        {/* Central Platform Hub Visual */}
        <div className="mb-12 p-6 bg-[#0D1117] border-2 border-kyorix-blue/40 rounded-xl text-center max-w-2xl mx-auto relative shadow-xl">
          <div className="text-[10px] font-mono tracking-widest text-kyorix-blue uppercase font-semibold">
            {ecosystem.hubTag || "Central Infrastructure"}
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-white mt-1 uppercase tracking-wider">
            {ecosystem.hubTitle || "KYORIX PLATFORM CORE"}
          </div>
          <div className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
            {ecosystem.hubDescription ||
              "Sub-millisecond data fabric linking all competitive stakeholders during tournament execution."}
          </div>
        </div>

        {/* Stakeholder Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stakeholders.map((stakeholder: any, idx: number) => {
            const Icon = icons[idx] || Users;
            return (
              <div
                key={stakeholder.role || idx}
                className="bg-[#111622] border border-[#1E2638] rounded-lg p-5 space-y-3 hover:border-kyorix-blue/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-md text-kyorix-blue group-hover:bg-kyorix-blue group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">
                    ROLE 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider group-hover:text-kyorix-blue transition-colors">
                  {stakeholder.role}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {stakeholder.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
