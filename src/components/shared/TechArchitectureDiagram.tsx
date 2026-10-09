import React from "react";
import { ArrowDown, Cpu, Database, Monitor, Layers, Network, ShieldCheck, Users } from "lucide-react";
import { DemoBadge } from "@/components/shared/DemoBadge";

export function TechArchitectureDiagram() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative overflow-hidden shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider">
            2D System Architecture Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified dataflow from stakeholder inputs to real-time competition engines
          </p>
        </div>
        <DemoBadge label="TECHNICAL SPECIFICATION" variant="neutral" />
      </div>

      {/* Pipeline Diagram */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Layer 1: Stakeholders */}
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 sm:p-4 text-center shadow-xs">
          <div className="text-[11px] font-mono text-slate-500 tracking-widest uppercase mb-2 font-semibold">
            Layer 01: Event Participants & Stakeholders
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {["ATHLETE", "COACH", "REFEREE", "JUDGE", "ORGANIZER"].map((role, idx) => (
              <div
                key={role}
                className={`px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs font-mono font-semibold text-slate-800 ${
                  idx === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Layer 2: Kyorix Core Platform Gateway */}
        <div className="border-2 border-kyorix-blue/40 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 rounded-xl p-4 text-center shadow-xs">
          <div className="text-[11px] font-mono text-kyorix-blue tracking-widest uppercase mb-1 font-semibold">
            Layer 02: Platform Gateway & Ingestion
          </div>
          <div className="text-sm font-mono font-bold text-slate-900 tracking-wider">
            KYORIX PLATFORM GATEWAY
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Role-Based Access Control • Encrypted Socket Channels • Peripheral Hardware I/O
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 3: Competition Engine */}
        <div className="border border-slate-200 bg-white rounded-xl p-4 text-center shadow-xs">
          <div className="text-[11px] font-mono text-slate-500 tracking-widest uppercase mb-1 font-semibold">
            Layer 03: Core Logic & Rules
          </div>
          <div className="text-sm font-mono font-bold text-slate-900 tracking-wider">
            KYORIX COMPETITION ENGINE
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Category Rules • Seed Distribution • Progression Trees • Gam-jeom / Penalty Rules
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 4: Core Platforms Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-blue-200 bg-white rounded-xl p-3 text-center shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-900">KYORIX SCORE</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Court Scoring Unit</div>
          </div>
          <div className="border border-blue-200 bg-white rounded-xl p-3 text-center shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-900">KYORIX BRACKET</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Draw & Progression</div>
          </div>
          <div className="border border-blue-200 bg-white rounded-xl p-3 text-center shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-900">KYORIX TEMS</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Event Management</div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 5: Public Results & Structured Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-slate-200 bg-white rounded-xl p-3 text-center shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-800">LIVE RESULTS & ARENA DISPLAYS</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Arena video walls, referee displays, spectator feeds</div>
          </div>
          <div className="border border-slate-200 bg-white rounded-xl p-3 text-center shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-800">HISTORICAL EVENT DATA & AUDIT</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Match records, verified results & official certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
