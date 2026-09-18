import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Lock, KeyRound, FileCheck, Database, HardDrive, RefreshCw, Server, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Security by Design | Kyorix Sport Technology",
  description:
    "Security by design. Protecting competitive integrity, participant data, and scoring records.",
};

const SECURITY_PILLARS = [
  {
    icon: Lock,
    title: "Authentication & Identity",
    desc: "Strict session management, multi-factor support for administrative tournament directors, and scoped access tokens for court operators.",
  },
  {
    icon: KeyRound,
    title: "Role-Based Access Control (RBAC)",
    desc: "Discrete privilege tiers separating referees, corner judges, tournament directors, weigh-in officials, and external spectators.",
  },
  {
    icon: ShieldCheck,
    title: "Secure API Communication",
    desc: "All socket connections and HTTP endpoints utilize TLS 1.3 encryption, protecting live point signals and match commands from packet inspection.",
  },
  {
    icon: FileCheck,
    title: "Tamper-Evident Access Logging",
    desc: "Every point modification, penalty override, score correction, and referee protest is recorded with immutable timecodes and operator identifiers.",
  },
  {
    icon: Database,
    title: "Participant Data Protection",
    desc: "Sensitive athlete records, national identification numbers, birth certificates, and weigh-in results are stored encrypted at rest.",
  },
  {
    icon: HardDrive,
    title: "Document Protection & Verification",
    desc: "Medical clearances and federation waivers are hashed upon upload to prevent post-submission document substitution.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Automated Backups",
    desc: "High-frequency snapshotting ensures that tournament state and bracket progression can be restored immediately in the event of local hardware failure.",
  },
  {
    icon: Server,
    title: "Infrastructure & Network Isolation",
    desc: "Mat-side scoreboards operate on isolated local subnets with deterministic failover capabilities if external internet access drops.",
  },
];

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              DATA INTEGRITY & PROTECTION
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            SECURITY <br />
            <span className="text-kyorix-blue">BY DESIGN.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            In competitive sport, technical integrity is synonymous with competitive fairness. Kyorix platforms are architected to ensure that every point awarded, match advanced, and tournament record archived is authentic, auditable, and resilient.
          </p>
        </div>

        {/* Security Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3 hover:border-kyorix-blue/40 transition-colors"
              >
                <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible Certification Notice */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-xl p-6 sm:p-8 space-y-3 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Security Engineering Disclosure</span>
          </div>
          <p className="leading-relaxed">
            Kyorix describes specific security architectures, cryptographic controls, and network failover models implemented directly within our software codebases. We do not claim external certifications (such as ISO, SOC, or GDPR accreditation) unless officially audited and formally issued.
          </p>
        </div>
      </div>
    </div>
  );
}
