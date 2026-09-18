import React from "react";
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kyorix Sport Technology",
  description:
    "Privacy Policy for Kyorix Sport Technology Private Limited software, platforms, and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-[#1E2638] pb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
            LEGAL COMPLIANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono text-white uppercase">
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Effective Date: January 1, 2026 • Version 1.0 (Enterprise)
          </p>
        </div>

        {/* Placeholders Notice */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300 space-y-1">
          <div className="flex items-center gap-2 font-bold uppercase">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Legal Placeholder Notice</span>
          </div>
          <p className="text-amber-200/80">
            Corporate registration numbers, legal representatives, and data controller particulars are maintained as placeholders until official company disclosure.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm text-gray-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              {COMPANY_INFO.name} collects information necessary to execute sanctioned sporting competitions, including participant identity profiles (athletes, coaches, officials), tournament registrations, weigh-in measurements, category assignments, and match scoring telemetry.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400 font-mono">
              <li>Athlete credentials (full name, date of birth, nationality, division)</li>
              <li>Official weigh-in logs and medical waiver confirmation states</li>
              <li>Scoring records, penalty infractions, and match video timecodes</li>
              <li>Tournament operator session identifiers and audit logs</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              2. How Information is Used
            </h2>
            <p>
              Collected competition data is processed exclusively for tournament operations, bracket progression, score verification, and official rankings generation. We do not sell or monetize personal competitor data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              3. Data Controller & Legal Entity Details
            </h2>
            <div className="bg-[#0D1117] border border-[#1E2638] rounded p-4 font-mono text-xs space-y-1 text-gray-400">
              <div>Entity: <span className="text-white">{COMPANY_INFO.name}</span></div>
              <div>Corporate ID: <span className="text-amber-400">{COMPANY_INFO.placeholders.cin}</span></div>
              <div>Registered Office: <span className="text-amber-400">{COMPANY_INFO.placeholders.address}</span></div>
              <div>Legal Contact: <span className="text-amber-400">{COMPANY_INFO.placeholders.email}</span></div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              4. Data Retention & Archival
            </h2>
            <p>
              Official competition match results and certified brackets are retained as permanent sporting records for federation ranking integrity. Personal identification documents uploaded for weigh-in clearance are handled under strict lifecycle retention policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              5. Contacting the Data Protection Desk
            </h2>
            <p>
              To exercise data inspection rights or submit a privacy inquiry, reach out to our legal desk at{" "}
              <code className="text-kyorix-blue bg-kyorix-blue/10 px-1.5 py-0.5 rounded font-mono text-xs">
                {COMPANY_INFO.placeholders.email}
              </code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
