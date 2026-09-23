"use client";

import React from "react";
import { Clock } from "lucide-react";
import { DemoBadge } from "@/components/shared/DemoBadge";

export function InteractiveScoreSimulator({ isMini }: { isMini?: boolean } = {}) {
  return (
    <div className="bg-[#0A0D14] border border-[#1E2638] rounded-xl shadow-2xl overflow-hidden">
      {/* Top Telemetry Bar */}
      <div className="bg-[#05070A] border-b border-[#1E2638] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-bold tracking-wider">KYORIX ESS</span>
          </div>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300">COURT 01</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">SENIOR MEN -54 KG</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <span className="text-gray-500">MATCH ID:</span>
            <span className="text-gray-200 font-semibold">KX-000184</span>
          </div>
          <DemoBadge label="DEMO / SAMPLE DATA" variant="blue" />
        </div>
      </div>

      {/* Main Scoreboard Arena Display */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Blue Corner (Chung) */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#00308F]/25 to-[#0A0D14] border-2 border-kyorix-blue rounded-lg p-4 sm:p-6 text-center relative overflow-hidden">
            <div className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold text-left">
              CHUNG (BLUE)
            </div>
            <div className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white mt-1 sm:mt-2">
              INDIA
            </div>
            <div className="text-xs text-blue-300/80 font-mono mt-0.5">ATHLETE A</div>

            {/* Score Digit */}
            <div className="text-6xl sm:text-8xl lg:text-9xl font-black font-mono tracking-tight text-white my-2 sm:my-3">
              08
            </div>

            {/* Penalties */}
            <div className="flex items-center justify-center gap-2 pt-2.5 sm:pt-3 border-t border-kyorix-blue/30 text-xs font-mono">
              <span className="text-gray-400">GAM-JEOM:</span>
              <span className="text-amber-400 font-bold text-sm">1 / 5</span>
            </div>
          </div>

          {/* Center Match Status & Round/Timer */}
          <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-center text-center py-1 sm:py-2 gap-2.5 sm:gap-4">
            <div className="hidden sm:inline-flex md:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-mono font-bold tracking-widest shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>

            <div className="bg-[#111622] border border-[#1E2638] rounded-md px-3 sm:px-4 py-2 sm:py-2.5 flex-1 md:flex-none md:w-full max-w-[170px]">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                ROUND
              </div>
              <div className="text-2xl sm:text-4xl font-black font-mono text-white mt-0.5">
                3
              </div>
            </div>

            <div className="bg-[#111622] border border-[#1E2638] rounded-md px-3 sm:px-4 py-2 sm:py-2.5 flex-1 md:flex-none md:w-full max-w-[170px]">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-kyorix-blue" />
                CLOCK
              </div>
              <div className="text-xl sm:text-3xl font-black font-mono text-white tracking-wider mt-0.5">
                01:32
              </div>
            </div>
          </div>

          {/* Red Corner (Hong) - Functional scoring red only */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#8B0000]/25 to-[#0A0D14] border-2 border-[#EF4444] rounded-lg p-4 sm:p-6 text-center relative overflow-hidden">
            <div className="text-[10px] font-mono tracking-widest text-red-400 uppercase font-bold text-right">
              HONG (RED)
            </div>
            <div className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white mt-1 sm:mt-2">
              KOREA
            </div>
            <div className="text-xs text-red-300/80 font-mono mt-0.5">ATHLETE B</div>

            {/* Score Digit */}
            <div className="text-6xl sm:text-8xl lg:text-9xl font-black font-mono tracking-tight text-white my-2 sm:my-3">
              06
            </div>

            {/* Penalties */}
            <div className="flex items-center justify-center gap-2 pt-2.5 sm:pt-3 border-t border-[#EF4444]/30 text-xs font-mono">
              <span className="text-gray-400">GAM-JEOM:</span>
              <span className="text-amber-400 font-bold text-sm">2 / 5</span>
            </div>
          </div>
        </div>

        {/* Live Peripheral Telemetry Footer */}
        <div className="mt-6 pt-4 border-t border-[#1E2638] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono">
          <div className="bg-[#111622] p-2.5 rounded border border-[#1E2638]">
            <span className="text-gray-500 block">MATCH DATA:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              CONNECTED (12ms)
            </span>
          </div>
          <div className="bg-[#111622] p-2.5 rounded border border-[#1E2638]">
            <span className="text-gray-500 block">COURT STATUS:</span>
            <span className="text-blue-400 font-semibold mt-0.5 block">ACTIVE (COURT 01)</span>
          </div>
          <div className="bg-[#111622] p-2.5 rounded border border-[#1E2638]">
            <span className="text-gray-500 block">EVENT SYSTEM:</span>
            <span className="text-emerald-400 font-semibold mt-0.5 block">ONLINE</span>
          </div>
          <div className="bg-[#111622] p-2.5 rounded border border-[#1E2638]">
            <span className="text-gray-500 block">JUDGE INPUTS:</span>
            <span className="text-gray-300 font-semibold mt-0.5 block">3 OF 3 SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
