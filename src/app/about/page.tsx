import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Target, Eye, Award, CheckCircle2, Compass, Cpu, Scale } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Kyorix Sport Technology",
  description:
    "We build technology for sport. Learn about Kyorix Sport Technology Private Limited, our mission, vision, and core engineering values.",
};

const CORE_VALUES = [
  {
    title: "PRECISION",
    desc: "Sub-millisecond scoring accuracy, deterministic point consensus, and zero-tolerance timing thresholds.",
  },
  {
    title: "RELIABILITY",
    desc: "Resilient systems designed to withstand high-stress tournament environments without downtime or packet loss.",
  },
  {
    title: "INNOVATION",
    desc: "Pioneering intelligent software engines and modular peripherals that modernize competitive sports infrastructure.",
  },
  {
    title: "CONNECTIVITY",
    desc: "Seamless data exchange uniting athletes, corner coaches, chief referees, event directors, and spectators.",
  },
  {
    title: "FAIR COMPETITION",
    desc: "Uncompromising commitment to transparent rules, auditable decision logs, and absolute integrity on the mat.",
  },
];

const VERIFIED_MILESTONES = [
  {
    year: "FOUNDATION",
    title: "Incorporation of Kyorix Sport Technology",
    desc: "Incorporated as a dedicated sports technology enterprise to develop native software and digital infrastructure for competitive sports.",
  },
  {
    year: "PHASE 01",
    title: "Core Platform Architecture",
    desc: "Engineered Kyorix Score, Kyorix Bracket, and Kyorix TEMS to establish the first integrated competition platform suite.",
  },
  {
    year: "PHASE 02",
    title: "Multi-Court Arena Orchestration",
    desc: "Deployed synchronous tournament networking, enabling simultaneous court operations with centralized director oversight.",
  },
  {
    year: "CURRENT",
    title: "Hardware Integration & Multi-Sport Extension",
    desc: "Active forward development on next-generation wireless scoring peripherals and expanding the tournament engine across competitive disciplines.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              ABOUT KYORIX
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            WE BUILD TECHNOLOGY <br />
            <span className="text-kyorix-blue">FOR SPORT.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            {COMPANY_INFO.name} is a sports technology company focused on building digital infrastructure for competitive sporting events. We develop intelligent software and technology systems that ensure every match is scored accurately, managed smoothly, and decided fairly.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-8 space-y-4 relative overflow-hidden">
            <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg w-fit text-kyorix-blue">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              OUR MISSION
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              To build reliable technology that makes competitive sport more connected, efficient and technologically advanced.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-8 space-y-4 relative overflow-hidden">
            <div className="p-3 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg w-fit text-kyorix-blue">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              OUR VISION
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              To create a sports technology ecosystem connecting athletes, officials, organizers and sporting institutions.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <SectionHeading
            label="GUIDING PRINCIPLES"
            title="CORE ENGINEERING VALUES"
            description="Our values dictate every line of code, algorithmic calculation, and hardware specification we produce."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="bg-[#111622] border border-[#1E2638] rounded-lg p-5 space-y-3 hover:border-kyorix-blue/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-kyorix-blue">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  {val.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Company Milestone Timeline */}
        <div className="space-y-8 border-t border-[#1E2638] pt-16">
          <SectionHeading
            label="COMPANY PROGRESSION"
            title="ORGANIZATIONAL ROADMAP"
            description="A transparent record of verified company initiatives. We do not publish unverified partnership counts, awards, or inflated statistics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_MILESTONES.map((m) => (
              <div
                key={m.year}
                className="bg-[#0D1117] border border-[#1E2638] rounded-lg p-6 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                  {m.year}
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Legal Placeholders */}
        <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl text-xs font-mono text-gray-400 space-y-2">
          <div className="text-white font-bold uppercase tracking-wider">
            Corporate Registry Notes
          </div>
          <p className="leading-relaxed">
            Kyorix Sport Technology Private Limited is an incorporated entity operating under Indian corporate law. Registered entity identifiers: {COMPANY_INFO.placeholders.cin}. Registered operational base: {COMPANY_INFO.placeholders.address}.
          </p>
        </div>
      </div>
    </div>
  );
}
