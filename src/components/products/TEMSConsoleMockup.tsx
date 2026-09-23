"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Shield,
  Scale,
  Calendar,
  Layers,
  FileText,
  Settings,
  Trophy,
  Activity,
  CheckCircle2,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { DemoBadge } from "@/components/shared/DemoBadge";

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "organizations", label: "Organizations & Clubs", icon: Users },
  { id: "athletes", label: "Athletes & Coaches", icon: Shield },
  { id: "weighin", label: "Weigh-in & Eligibility", icon: Scale },
  { id: "categories", label: "Categories & Draws", icon: Layers },
  { id: "schedule", label: "Court Scheduling", icon: Calendar },
  { id: "matches", label: "Match Operations", icon: Activity },
  { id: "results", label: "Results & Podium", icon: Trophy },
  { id: "reports", label: "Official Reports", icon: FileText },
  { id: "settings", label: "System Settings", icon: Settings },
];

export function TEMSConsoleMockup() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="bg-[#0A0D14] border border-[#1E2638] rounded-xl shadow-2xl overflow-hidden text-gray-300">
      {/* Top Application Bar */}
      <div className="bg-[#05070A] border-b border-[#1E2638] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-black text-white tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-kyorix-blue" />
            KYORIX TEMS
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">EVENT MANAGEMENT CONSOLE</span>
          <span className="text-gray-600">|</span>
          <span className="text-emerald-400 font-semibold">EVENT: ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge label="DEMO CONSOLE" variant="blue" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Sidebar */}
        <aside className="lg:col-span-3 bg-[#08090C] border-b lg:border-b-0 lg:border-r border-[#1E2638] p-3 space-y-1">
          <div className="px-1.5 lg:px-3 py-1 text-[10px] font-mono tracking-widest text-gray-500 uppercase flex items-center justify-between">
            <span>Platform Modules</span>
            <span className="lg:hidden text-[9px] text-gray-500">Swipe →</span>
          </div>
          <nav className="flex lg:flex-col overflow-x-auto pb-2 lg:pb-0 gap-1.5 lg:space-y-0.5 scrollbar-thin">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`shrink-0 lg:w-full flex items-center gap-2 px-3 py-2 text-xs font-mono rounded transition-colors text-left whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "bg-kyorix-blue text-white font-semibold shadow-md shadow-kyorix-blue/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 bg-[#111622] lg:bg-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block pt-4 mt-4 border-t border-[#1E2638] px-3">
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              Current Session
            </div>
            <div className="text-xs font-mono text-gray-300 font-semibold mt-0.5">
              Tournament Director
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Hardware Sync OK
            </div>
          </div>
        </aside>

        {/* Main Dashboard Panel */}
        <main className="lg:col-span-9 p-4 sm:p-6 space-y-6 bg-[#0D1117]/50">
          {/* Active Event Banner */}
          <div className="bg-[#111622] border border-[#1E2638] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono text-kyorix-blue uppercase tracking-widest font-semibold">
                ACTIVE EVENT WORKSPACE
              </div>
              <h4 className="text-base sm:text-lg font-mono font-bold text-white mt-0.5">
                National Taekwondo Championship 2026
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">
                Location: Indoor Stadium Complex • Discipline: Kyorugi & Poomsae
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-xs font-mono font-bold">
                DAY 2 IN PROGRESS
              </span>
            </div>
          </div>

          {/* Metric KPI Cards (All clearly marked DEMO) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#111622] border border-[#1E2638] rounded-md p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                REGISTERED ATHLETES
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                480 <span className="text-[10px] font-normal text-gray-500">DEMO</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">
                ✓ 100% Weighed-In
              </div>
            </div>

            <div className="bg-[#111622] border border-[#1E2638] rounded-md p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                ACTIVE COURTS
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-kyorix-blue mt-1">
                4 / 4 <span className="text-[10px] font-normal text-gray-500">DEMO</span>
              </div>
              <div className="text-[10px] text-blue-400 font-mono mt-1">
                All Scoring Online
              </div>
            </div>

            <div className="bg-[#111622] border border-[#1E2638] rounded-md p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                TOTAL MATCHES
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                128 <span className="text-[10px] font-normal text-gray-500">DEMO</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono mt-1">
                16 Categories
              </div>
            </div>

            <div className="bg-[#111622] border border-[#1E2638] rounded-md p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                COMPLETED MATCHES
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                84 <span className="text-[10px] font-normal text-gray-500">DEMO</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">
                65.6% Completed
              </div>
            </div>
          </div>

          {/* Active Court Progression Matrix */}
          <div className="bg-[#111622] border border-[#1E2638] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-2">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Live Court Operations & Queue
              </div>
              <div className="text-[10px] font-mono text-gray-400">
                Auto-assigned by Kyorix Competition Engine
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Court 01 */}
              <div className="bg-[#08090C] border border-kyorix-blue/40 rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    COURT 01
                  </span>
                  <span className="text-emerald-400 font-bold">● LIVE</span>
                </div>
                <div className="text-xs font-mono text-gray-300">
                  Senior Men -54 kg • Round 3
                </div>
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between pt-1 border-t border-[#1E2638]">
                  <span>IND vs KOR</span>
                  <span className="font-bold text-white">08 - 06</span>
                </div>
              </div>

              {/* Court 02 */}
              <div className="bg-[#08090C] border border-[#1E2638] rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    COURT 02
                  </span>
                  <span className="text-emerald-400 font-bold">● LIVE</span>
                </div>
                <div className="text-xs font-mono text-gray-300">
                  Senior Women -49 kg • Round 2
                </div>
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between pt-1 border-t border-[#1E2638]">
                  <span>ESP vs TUR</span>
                  <span className="font-bold text-white">14 - 11</span>
                </div>
              </div>

              {/* Court 03 */}
              <div className="bg-[#08090C] border border-[#1E2638] rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    COURT 03
                  </span>
                  <span className="text-amber-400 font-bold">NEXT MATCH</span>
                </div>
                <div className="text-xs font-mono text-gray-300">
                  Junior Men -51 kg • Quarterfinal
                </div>
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between pt-1 border-t border-[#1E2638]">
                  <span>FRA vs JOR</span>
                  <span className="text-gray-500">Checking Equipment</span>
                </div>
              </div>

              {/* Court 04 */}
              <div className="bg-[#08090C] border border-[#1E2638] rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    COURT 04
                  </span>
                  <span className="text-gray-400 font-bold">COMPLETED</span>
                </div>
                <div className="text-xs font-mono text-gray-300">
                  Senior Men -68 kg • Semifinal
                </div>
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between pt-1 border-t border-[#1E2638]">
                  <span>ITA vs GER</span>
                  <span className="text-emerald-400 font-bold">Winner: ITA (2-0)</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
