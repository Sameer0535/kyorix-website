import React from "react";
import type { Metadata } from "next";
import {
  Network,
  Cloud,
  Cpu,
  PlugZap,
  KeyRound,
  Database,
  Webhook,
  ShieldCheck,
  CheckCircle2,
  Server,
  Zap,
} from "lucide-react";
import { TechArchitectureDiagram } from "@/components/shared/TechArchitectureDiagram";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Technology & Architecture | Kyorix Sport Technology",
  description:
    "Engineering architecture, real-time data protocols, and competition infrastructure behind Kyorix platforms.",
};

const TECH_SECTIONS = [
  {
    id: "real-time",
    icon: Network,
    title: "Real-Time Architecture",
    description:
      "Low-latency duplex communication connecting mat-side referee inputs, court timing displays, and central scoring processors. Uses efficient event-driven protocols engineered to deliver instantaneous point feedback without network stutter.",
    highlights: [
      "Sub-millisecond judge coincidence window",
      "Deterministic event timestamping",
      "Local mesh fallback when arena Wi-Fi is degraded",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Resilient, horizontally scalable tournament cloud architecture. Provides centralized event coordination, athlete records, multi-city tournament synchronizations, and high-availability spectator result feeds.",
    highlights: [
      "Distributed edge points for live results delivery",
      "Automated event container orchestration",
      "Continuous data replication and point-in-time state recovery",
    ],
  },
  {
    id: "engine",
    icon: Cpu,
    title: "Competition Engine",
    description:
      "Deterministic tournament logic library managing rule sets, bracket geometry, BYE calculation, and match progression. Built as a decoupled engine capable of enforcing official combat sport governance.",
    highlights: [
      "Rule-configurable scoring logic (e.g. turning kicks, Gam-jeom limits)",
      "Mathematical seeding and team separation algorithms",
      "Immutable bracket lock states post draw ceremony",
    ],
  },
  {
    id: "hardware",
    icon: PlugZap,
    title: "Hardware Integration",
    description:
      "Interface layer designed for connection to electronic scoring peripherals, wireless judge hand controllers, digital timing gates, and arena video display processors.",
    highlights: [
      "Low-overhead serial and wireless peripheral drivers",
      "Tamper-evident peripheral handshake protocols",
      "Direct video wall HDMI and NDI broadcast outputs",
    ],
  },
  {
    id: "identity",
    icon: KeyRound,
    title: "Identity & Access Control",
    description:
      "Granular role-based access management (RBAC). Distinguishes tournament directors, chief referees, mat operators, weigh-in officials, coaches, and athletes with strict least-privilege permissions.",
    highlights: [
      "Scoped access tokens for court operators and judges",
      "Audit trail logging for match score modifications",
      "QR-code authenticated weigh-in and mat check-in",
    ],
  },
  {
    id: "data",
    icon: Database,
    title: "Data Pipeline & Integrity",
    description:
      "Structured competition schema ensuring that every strike, penalty, round split, and referee protest is permanently captured in an auditable match event log.",
    highlights: [
      "Append-only match event telemetry stream",
      "Official certificate and score card export",
      "Standardized data schema for multi-sport extensibility",
    ],
  },
  {
    id: "apis",
    icon: Webhook,
    title: "APIs & Ecosystem Integrations",
    description:
      "Clean REST and WebSocket endpoints allowing federations, arena production teams, and timing partners to consume live competition telemetry programmatically.",
    highlights: [
      "Real-time court status WebSockets",
      "Broadcast graphics and TV overlay data feeds",
      "Webhook notifications for match completion and bracket updates",
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security Architecture",
    description:
      "Security-by-design protecting tournament integrity, participant personal identification data, and scoring records against unauthorized access or tampering.",
    highlights: [
      "End-to-end encrypted court-to-cloud communication",
      "Cryptographic match signature verification",
      "Zero unauthenticated endpoints across competition networks",
    ],
  },
];

export default function TechnologyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              TECHNICAL SPECIFICATIONS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            ENGINEERED FOR <br />
            <span className="text-kyorix-blue">COMPETITION.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Sanctioned competitive sporting events leave zero room for communication latency, corrupted draw trees, or scoring disputes. Kyorix software architecture is built on deterministic engineering, strict data lineage, and resilient offline court caching.
          </p>
        </div>

        {/* Global Architecture Diagram */}
        <TechArchitectureDiagram />

        {/* The 8 Core Technical Areas */}
        <div className="space-y-6">
          <div className="border-b border-[#1E2638] pb-4">
            <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-wider">
              Architecture Modules & Protocols
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-1">
              Technical overview of systems driving the Kyorix platform suite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 sm:p-7 space-y-4 hover:border-kyorix-blue/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded text-kyorix-blue">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider">
                      {sec.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {sec.description}
                  </p>

                  <div className="pt-2 border-t border-[#1E2638] space-y-1.5">
                    {sec.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-kyorix-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Note on Integrity */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-xl p-6 text-xs font-mono text-gray-400 space-y-2">
          <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-kyorix-blue" />
            Engineering Integrity Statement
          </div>
          <p className="leading-relaxed">
            Kyorix specifications reflect software and communication architectures designed specifically for sanctioned tournament operations. Hardware peripheral integration modules adhere to deterministic protocols. Claims regarding system capabilities reflect operational engineering targets and verified test parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
