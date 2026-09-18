import React from "react";
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Kyorix Sport Technology",
  description:
    "Terms of Service governing the use of Kyorix Score, Kyorix Bracket, Kyorix TEMS, and platform software.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[#1E2638] pb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
            LEGAL AGREEMENT
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono text-white uppercase">
            TERMS OF SERVICE
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Effective Date: January 1, 2026 • Version 1.0 (Enterprise Software)
          </p>
        </div>

        {/* Placeholders Notice */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300 space-y-1">
          <div className="flex items-center gap-2 font-bold uppercase">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Corporate Licensing Disclosure</span>
          </div>
          <p className="text-amber-200/80">
            Terms apply to licensed deployment of Kyorix software platforms at sanctioned tournaments, regional competitions, and multi-court sporting arenas.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm text-gray-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              1. Platform License & Scope of Use
            </h2>
            <p>
              Subject to valid tournament licensing agreements, {COMPANY_INFO.name} grants the licensee a non-exclusive, non-transferable license to operate Kyorix Score, Kyorix Bracket, and Kyorix TEMS for the designated competition event. Unauthorized reverse engineering, packet injection, or unauthorized rule-bypass modification is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              2. Competition Integrity & Official Rulings
            </h2>
            <p>
              Kyorix provides electronic scoring and event management tools to facilitate match operations. Official sanctioning decisions, disqualified athletes, protest resolutions, and podium determinations remain the sole legal responsibility of the appointed tournament technical delegates, head referees, and governing sports bodies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              3. Hardware Requirements & On-Site Deployment
            </h2>
            <p>
              Licensees deploying Kyorix platforms are responsible for providing compliant on-site computing hardware, wireless networking environments, and power distribution as outlined in our technical specification documents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              4. Corporate Entity & Placeholders
            </h2>
            <div className="bg-[#0D1117] border border-[#1E2638] rounded p-4 font-mono text-xs space-y-1 text-gray-400">
              <div>Licensor: <span className="text-white">{COMPANY_INFO.name}</span></div>
              <div>Corporate ID: <span className="text-amber-400">{COMPANY_INFO.placeholders.cin}</span></div>
              <div>Registered Office: <span className="text-amber-400">{COMPANY_INFO.placeholders.address}</span></div>
              <div>Commercial Legal Inquiries: <span className="text-amber-400">{COMPANY_INFO.placeholders.email}</span></div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising from the commercial deployment or licensing of Kyorix platforms shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
