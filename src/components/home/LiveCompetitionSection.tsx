import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Radio, Shield, CheckCircle2, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DemoBadge } from "@/components/shared/DemoBadge";

export function LiveCompetitionSection() {
  const courts = [
    {
      court: "COURT 01",
      status: "LIVE",
      category: "Senior Men -54 kg",
      match: "IND vs KOR",
      score: "08 - 06",
      round: "Round 3",
      clock: "01:32",
      statusColor: "emerald",
    },
    {
      court: "COURT 02",
      status: "LIVE",
      category: "Senior Women -49 kg",
      match: "ESP vs TUR",
      score: "14 - 11",
      round: "Round 2",
      clock: "00:45",
      statusColor: "emerald",
    },
    {
      court: "COURT 03",
      status: "NEXT MATCH",
      category: "Junior Men -51 kg",
      match: "FRA vs JOR",
      score: "-- vs --",
      round: "Warm-up",
      clock: "Est. 14:15",
      statusColor: "amber",
    },
    {
      court: "COURT 04",
      status: "COMPLETED",
      category: "Senior Men -68 kg",
      match: "ITA vs GER",
      score: "18 - 12",
      round: "Finalized",
      clock: "2-0 Win",
      statusColor: "blue",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0D1117] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="MULTI-COURT ORCHESTRATION"
            title="POWERING COMPETITION. LIVE."
            description="Kyorix coordinates synchronous tournament mats across large arena floorplans. Real-time telemetry feeds public spectator boards, coaches' corners, and central tournament directors."
            className="mb-0"
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-kyorix-blue hover:text-white transition-colors shrink-0"
          >
            <span>LIVE ARENA HUB & EVENTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Multi-Court Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {courts.map((c) => (
            <div
              key={c.court}
              className="bg-[#111622] border border-[#1E2638] rounded-lg p-5 space-y-3 hover:border-kyorix-blue/50 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">{c.court}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.status === "LIVE"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse"
                      : c.status === "NEXT MATCH"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  ● {c.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-gray-400">
                  {c.category}
                </div>
                <div className="text-base font-mono font-bold text-white">
                  {c.match}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2638] flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">{c.round}</span>
                <span className="font-bold text-kyorix-blue">{c.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Photography Context Box */}
        <div className="bg-[#08090C] border border-[#1E2638] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
              <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
                OFFICIAL SANCTIONED RIGOR
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-white uppercase tracking-tight">
              Built for Officials, Referees & Technical Delegates.
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              In international competitive martial arts, instant decision fidelity is critical. Kyorix platforms are architected around official sport regulations, protest procedures, electronic video replay integration, and strict score verifications.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Synchronized Judge Buttons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Auditable Gam-jeom Log</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Video Replay Timecodes</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full min-h-[260px]">
            <Image
              src="/images/referee-court.jpg"
              alt="Official referee signaling point on competition mat with live scoreboards"
              fill
              className="object-cover brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-[#08090C]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
