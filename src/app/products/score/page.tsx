import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, Radio, Shield, CheckCircle2, Sliders, Smartphone, Laptop, Tv } from "lucide-react";
import { ProductImageFrame } from "@/components/products/ProductImageFrame";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Kyorix Score | Electronic Competition Scoring",
  description:
    "A digital scoring platform designed for fast, reliable and connected sporting competitions.",
};

export default function KyorixScorePage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              ELECTRONIC COMPETITION SCORING
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-slate-900 uppercase leading-tight">
            KYORIX SCORE
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A digital scoring platform designed for fast, reliable and connected sporting competitions. Eliminates score latency, coordinates judge consensus, and drives arena scoreboards with deterministic accuracy.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow-md shadow-kyorix-blue/20 transition-colors"
            >
              <span>CONTACT NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Official Software Screenshot Frame */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-mono font-bold text-slate-900 uppercase tracking-wider">
              Official Scoring Software Interface
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Match control & arena scoring unit
            </span>
          </div>
          <ProductImageFrame
            title="KYORIX SCORE — OFFICIAL ARENA SCORING INTERFACE"
            subtitle="Electronic competition scoring, referee inputs, judge coincidence windows, and live arena scoreboards"
            imageSrc="/images/products/score.png"
            altText="Kyorix Score software interface"
            badge="ELECTRONIC SCORING"
          />
        </div>

        {/* Core Architecture Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-kyorix-blue/40 transition-colors">
            <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
              01 • POINT & PENALTY ENGINE
            </div>
            <h3 className="text-base font-mono font-bold text-slate-900 uppercase">
              Deterministic Rule Logic
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated point increments for punches, body kicks, turning kicks, and head kicks. Official Gam-jeom accumulation tracks disqualification limits and awards automatic opposing points.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-kyorix-blue/40 transition-colors">
            <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
              02 • JUDGE CONSENSUS
            </div>
            <h3 className="text-base font-mono font-bold text-slate-900 uppercase">
              Multi-Judge Synchronization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configurable consensus windows (e.g. 1.0 second coincidence) validate simultaneous judge inputs before awarding points to prevent erroneous single-judge awards.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-kyorix-blue/40 transition-colors">
            <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
              03 • TIMEKEEPING & ROUNDS
            </div>
            <h3 className="text-base font-mono font-bold text-slate-900 uppercase">
              Precision Court Clock
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sub-millisecond match clock with pause-on-break, golden round overtime handling, rest interval countdowns, and automated horn triggering.
            </p>
          </div>
        </div>

        {/* Hardware Peripheral Connectivity Diagram */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-mono font-bold text-slate-900 uppercase tracking-wider">
              2D Hardware & Peripheral Connectivity Topology
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Architecture designed for robust peripheral interfacing with minimal arena cabling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded p-4 text-center space-y-2 shadow-sm">
              <Laptop className="w-6 h-6 text-kyorix-blue mx-auto" />
              <div className="text-xs font-mono font-bold text-slate-900">COURT OPERATOR TERMINAL</div>
              <p className="text-[11px] text-slate-600">Controls match flow, timers, penalties, and official review flags.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4 text-center space-y-2 shadow-sm">
              <Smartphone className="w-6 h-6 text-kyorix-blue mx-auto" />
              <div className="text-xs font-mono font-bold text-slate-900">JUDGE INPUT CONSOLES</div>
              <p className="text-[11px] text-slate-600">Ergonomic wireless controllers or low-latency tablet devices for corner judges.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4 text-center space-y-2 shadow-sm">
              <Tv className="w-6 h-6 text-kyorix-blue mx-auto" />
              <div className="text-xs font-mono font-bold text-slate-900">PUBLIC ARENA SCOREBOARD</div>
              <p className="text-[11px] text-slate-600">HDMI / NDI output for large stadium screens, coaches&apos; side displays, and livestream overlays.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded p-4 text-center space-y-2 shadow-sm">
              <Cpu className="w-6 h-6 text-kyorix-blue mx-auto" />
              <div className="text-xs font-mono font-bold text-slate-900">LOCAL GATEWAY CACHE</div>
              <p className="text-[11px] text-slate-600">Zero interruption match persistence even during complete arena network outages.</p>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-mono font-bold text-slate-900 uppercase tracking-wider">
            Comprehensive Scoring System Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Real-time score display</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Dedicated referee operation panel</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Configurable 2-4 judge setups</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Automatic point gap stop (mercy rule)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Match event replay timecode logging</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kyorix-blue" />
              <span>Instant sync to Kyorix Bracket</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
