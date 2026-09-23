import React from "react";
import { ArrowDown, Cpu, Database, Monitor, Layers, Network, ShieldCheck, Users } from "lucide-react";
import { DemoBadge } from "@/components/shared/DemoBadge";

export function TechArchitectureDiagram() {
  return (
    <div className="bg-[#0D1117] border border-[#1E2638] rounded-lg p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2638] pb-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            2D System Architecture Pipeline
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Unified dataflow from stakeholder inputs to real-time competition engines
          </p>
        </div>
        <DemoBadge label="TECHNICAL SPECIFICATION" variant="neutral" />
      </div>

      {/* Pipeline Diagram */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Layer 1: Stakeholders */}
        <div className="border border-[#1E2638] bg-[#111622] rounded-md p-3.5 sm:p-4 text-center">
          <div className="text-[11px] font-mono text-gray-400 tracking-widest uppercase mb-2">
            Layer 01: Event Participants & Stakeholders
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {["ATHLETE", "COACH", "REFEREE", "JUDGE", "ORGANIZER"].map((role, idx) => (
              <div
                key={role}
                className={`px-3 py-2 bg-[#08090C] border border-[#1E2638] rounded text-xs font-mono font-semibold text-gray-300 ${
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
        <div className="border-2 border-kyorix-blue/40 bg-gradient-to-r from-kyorix-blue/10 via-[#111622] to-kyorix-blue/10 rounded-md p-4 text-center">
          <div className="text-[11px] font-mono text-kyorix-blue tracking-widest uppercase mb-1">
            Layer 02: Platform Gateway & Ingestion
          </div>
          <div className="text-sm font-mono font-bold text-white tracking-wider">
            KYORIX PLATFORM GATEWAY
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Role-Based Access Control • Encrypted Socket Channels • Peripheral Hardware I/O
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 3: Competition Engine */}
        <div className="border border-[#1E2638] bg-[#111622] rounded-md p-4 text-center">
          <div className="text-[11px] font-mono text-gray-400 tracking-widest uppercase mb-1">
            Layer 03: Core Logic & Rules
          </div>
          <div className="text-sm font-mono font-bold text-white tracking-wider">
            KYORIX COMPETITION ENGINE
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Category Rules • Seed Distribution • Progression Trees • Gam-jeom / Penalty Rules
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 4: Core Platforms Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-kyorix-blue/40 bg-[#08090C] rounded p-3 text-center">
            <div className="text-xs font-mono font-bold text-white">KYORIX SCORE</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Court Scoring Unit</div>
          </div>
          <div className="border border-kyorix-blue/40 bg-[#08090C] rounded p-3 text-center">
            <div className="text-xs font-mono font-bold text-white">KYORIX BRACKET</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Draw & Progression</div>
          </div>
          <div className="border border-kyorix-blue/40 bg-[#08090C] rounded p-3 text-center">
            <div className="text-xs font-mono font-bold text-white">KYORIX TEMS</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Event Management</div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-kyorix-blue">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 5: Public Results & Structured Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-[#1E2638] bg-[#111622] rounded p-3 text-center">
            <div className="text-xs font-mono font-bold text-gray-200">LIVE RESULTS & ARENA DISPLAYS</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Arena video walls, referee displays, spectator feeds</div>
          </div>
          <div className="border border-[#1E2638] bg-[#111622] rounded p-3 text-center">
            <div className="text-xs font-mono font-bold text-gray-200">HISTORICAL EVENT DATA & AUDIT</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Match records, verified results & official certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
