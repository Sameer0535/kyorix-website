"use client";

import React, { useState } from "react";
import { GitBranch, Trophy, CheckCircle, ArrowRight } from "lucide-react";
import { DemoBadge } from "@/components/shared/DemoBadge";

interface MatchNode {
  id: string;
  round: string;
  athlete1: { name: string; country: string; seed?: number; score: number; winner?: boolean };
  athlete2: { name: string; country: string; seed?: number; score: number; winner?: boolean };
  status: "COMPLETED" | "SCHEDULED" | "LIVE";
  court: string;
}

export function InteractiveBracketViewer() {
  const [selectedCategory, setSelectedCategory] = useState("Senior Men -54 kg");

  const matches: { qf: MatchNode[]; sf: MatchNode[]; final: MatchNode } = {
    qf: [
      {
        id: "M-QF-01",
        round: "QUARTERFINAL 1",
        athlete1: { name: "A. Sharma", country: "IND", seed: 1, score: 8, winner: true },
        athlete2: { name: "B. Park", country: "KOR", seed: 8, score: 4, winner: false },
        status: "COMPLETED",
        court: "COURT 01",
      },
      {
        id: "M-QF-02",
        round: "QUARTERFINAL 2",
        athlete1: { name: "C. Chen", country: "TPE", seed: 4, score: 10, winner: true },
        athlete2: { name: "E. Al-Mansoor", country: "JOR", seed: 5, score: 6, winner: false },
        status: "COMPLETED",
        court: "COURT 02",
      },
      {
        id: "M-QF-03",
        round: "QUARTERFINAL 3",
        athlete1: { name: "D. Garcia", country: "ESP", seed: 2, score: 14, winner: true },
        athlete2: { name: "F. Rossi", country: "ITA", seed: 7, score: 9, winner: false },
        status: "COMPLETED",
        court: "COURT 01",
      },
      {
        id: "M-QF-04",
        round: "QUARTERFINAL 4",
        athlete1: { name: "G. Yilmaz", country: "TUR", seed: 3, score: 11, winner: true },
        athlete2: { name: "H. Dubois", country: "FRA", seed: 6, score: 8, winner: false },
        status: "COMPLETED",
        court: "COURT 03",
      },
    ],
    sf: [
      {
        id: "M-SF-01",
        round: "SEMIFINAL 1",
        athlete1: { name: "A. Sharma", country: "IND", seed: 1, score: 12, winner: true },
        athlete2: { name: "C. Chen", country: "TPE", seed: 4, score: 7, winner: false },
        status: "COMPLETED",
        court: "COURT 01",
      },
      {
        id: "M-SF-02",
        round: "SEMIFINAL 2",
        athlete1: { name: "D. Garcia", country: "ESP", seed: 2, score: 13, winner: true },
        athlete2: { name: "G. Yilmaz", country: "TUR", seed: 3, score: 9, winner: false },
        status: "COMPLETED",
        court: "COURT 02",
      },
    ],
    final: {
      id: "M-FN-01",
      round: "GOLD MEDAL FINAL",
      athlete1: { name: "A. Sharma", country: "IND", seed: 1, score: 8 },
      athlete2: { name: "D. Garcia", country: "ESP", seed: 2, score: 6 },
      status: "LIVE",
      court: "COURT 01",
    },
  };

  return (
    <div className="bg-[#0A0D14] border border-[#1E2638] rounded-xl shadow-2xl p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2638] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded text-kyorix-blue shrink-0">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-mono font-bold text-white tracking-wider">
              KYORIX BRACKET ENGINE
            </div>
            <div className="text-xs text-gray-400">
              Single-Elimination Knockout Progression Tree
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#111622] border border-[#1E2638] text-xs font-mono text-gray-200 px-3 py-1.5 rounded focus:outline-none focus:border-kyorix-blue"
          >
            <option>Senior Men -54 kg</option>
            <option>Senior Men -68 kg</option>
            <option>Senior Women -49 kg</option>
          </select>
          <DemoBadge label="DEMO BRACKET" variant="blue" />
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-[#111622] rounded border border-[#1E2638] text-[10px] sm:text-[11px] font-mono text-blue-400">
        <span>← Swipe horizontally to explore full bracket tree →</span>
        <span className="text-gray-500">QF • SF • FINAL</span>
      </div>

      {/* Bracket Tree Container */}
      <div className="overflow-x-auto pb-4 scrollbar-thin" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="min-w-[760px] grid grid-cols-3 gap-6 relative">
          {/* Column 1: Quarterfinals */}
          <div className="space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold border-b border-[#1E2638] pb-1.5 flex items-center justify-between">
              <span>Quarterfinals (4)</span>
              <span className="text-[10px] text-gray-500">BO3</span>
            </div>

            <div className="space-y-3">
              {matches.qf.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#111622] border border-[#1E2638] rounded-md p-2.5 space-y-1.5 hover:border-kyorix-blue/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-[#1E2638]/50 pb-1">
                    <span>{m.round}</span>
                    <span>{m.court}</span>
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs font-mono px-2 py-1 rounded ${
                      m.athlete1.winner ? "bg-kyorix-blue/15 text-white font-bold" : "text-gray-400"
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-gray-500 mr-1">[{m.athlete1.seed}]</span>
                      {m.athlete1.name} <span className="text-[10px] text-gray-500">({m.athlete1.country})</span>
                    </span>
                    <span className="font-mono font-bold ml-2">{m.athlete1.score}</span>
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs font-mono px-2 py-1 rounded ${
                      m.athlete2.winner ? "bg-kyorix-blue/15 text-white font-bold" : "text-gray-400"
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-gray-500 mr-1">[{m.athlete2.seed}]</span>
                      {m.athlete2.name} <span className="text-[10px] text-gray-500">({m.athlete2.country})</span>
                    </span>
                    <span className="font-mono font-bold ml-2">{m.athlete2.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Semifinals */}
          <div className="space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold border-b border-[#1E2638] pb-1.5 flex items-center justify-between">
              <span>Semifinals (2)</span>
              <span className="text-[10px] text-gray-500">Medal Round</span>
            </div>

            <div className="space-y-12 pt-6">
              {matches.sf.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#111622] border-2 border-[#1E2638] rounded-md p-3 space-y-2 hover:border-kyorix-blue transition-colors shadow-lg"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-[#1E2638]/50 pb-1">
                    <span>{m.round}</span>
                    <span className="text-emerald-400 font-semibold">{m.court}</span>
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs font-mono px-2.5 py-1.5 rounded ${
                      m.athlete1.winner ? "bg-kyorix-blue/20 text-white font-bold border border-kyorix-blue/30" : "text-gray-400"
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-blue-400 mr-1">[{m.athlete1.seed}]</span>
                      {m.athlete1.name} <span className="text-[10px] text-gray-500">({m.athlete1.country})</span>
                    </span>
                    <span className="font-mono font-bold ml-2 text-sm">{m.athlete1.score}</span>
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs font-mono px-2.5 py-1.5 rounded ${
                      m.athlete2.winner ? "bg-kyorix-blue/20 text-white font-bold border border-kyorix-blue/30" : "text-gray-400"
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-gray-500 mr-1">[{m.athlete2.seed}]</span>
                      {m.athlete2.name} <span className="text-[10px] text-gray-500">({m.athlete2.country})</span>
                    </span>
                    <span className="font-mono font-bold ml-2 text-sm">{m.athlete2.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Gold Medal Final */}
          <div className="space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold border-b border-[#1E2638] pb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Championship Final
              </span>
              <span className="text-[10px] text-emerald-400 animate-pulse">● LIVE NOW</span>
            </div>

            <div className="pt-16">
              <div className="bg-gradient-to-b from-[#111622] to-[#0A0D14] border-2 border-amber-500/50 rounded-lg p-4 space-y-3 shadow-xl relative">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-amber-400 uppercase tracking-wider">
                    {matches.final.round}
                  </span>
                  <span className="text-xs font-mono text-gray-300 font-bold">
                    {matches.final.court}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded bg-kyorix-blue/15 border border-kyorix-blue/40 text-white font-bold">
                    <span>
                      <span className="text-blue-400 mr-1">[{matches.final.athlete1.seed}]</span>
                      {matches.final.athlete1.name} ({matches.final.athlete1.country})
                    </span>
                    <span className="text-lg font-black font-mono text-white">
                      {matches.final.athlete1.score}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded bg-[#EF4444]/15 border border-[#EF4444]/40 text-white font-bold">
                    <span>
                      <span className="text-red-400 mr-1">[{matches.final.athlete2.seed}]</span>
                      {matches.final.athlete2.name} ({matches.final.athlete2.country})
                    </span>
                    <span className="text-lg font-black font-mono text-white">
                      {matches.final.athlete2.score}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-mono text-gray-400 flex items-center justify-between border-t border-[#1E2638]">
                  <span>ROUND 3 OF 3</span>
                  <span className="text-emerald-400 font-bold">LIVE IN COURT 01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
