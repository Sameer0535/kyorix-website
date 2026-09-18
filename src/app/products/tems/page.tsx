import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Trophy,
  Users,
  CreditCard,
  Scale,
  GitBranch,
  Cpu,
  Radio,
  Award,
  CheckCircle2,
  Calendar,
  FileCheck,
  Shield,
  Layers,
  Printer,
  QrCode,
  Clock,
  Server,
  Database,
  Lock,
  FileSpreadsheet,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Kyorix TEMS | Complete Taekwondo Event Management System",
  description:
    "End-to-end competition management software covering tournament creation, athlete registration, ID badge generation, digital weigh-in, deterministic draws, scoring system integration, live arena results, and automated certificates.",
};

const TEMS_MODULES = [
  {
    id: "tournaments",
    icon: Trophy,
    number: "01",
    title: "Tournament Management & Division Matrix",
    tag: "Core Governance",
    desc: "End-to-end tournament configuration engine for district, state, national, and international championships. Manages multi-court scheduling, division structures, and official sanctioning rules.",
    capabilities: [
      "Multi-court & multi-ring scheduling with automated mat load balancing",
      "Sanctioning body rule set templates (World Taekwondo & custom federation rules)",
      "Dynamic division matrix across age brackets, belt grades, and weight tiers",
      "Match timeline projection and court delay tracking algorithms",
      "Official protest protocol logging, review workflows, and disciplinary audits",
      "Multi-day tournament staging with customized session schedules",
    ],
  },
  {
    id: "registration",
    icon: Users,
    number: "02",
    title: "Athlete, Coach & Team Registration",
    tag: "Participant Portal",
    desc: "Centralized digital entry portal for federations, academies, and independent competitors. Eliminates paper forms and spreadsheet chaos with structured validation.",
    capabilities: [
      "Club, academy, and state federation bulk roster onboarding",
      "Direct document upload for medical clearances, liability waivers, and identity proofs",
      "Automated belt rank verification and age-bracket qualification validation",
      "Customizable entry forms with automated entry fee tracking and invoicing ledger",
      "Real-time registration cutoff controls and roster change audit logs",
      "Emergency contact and medical alert flagging for ring-side medical staff",
    ],
  },
  {
    id: "idcard",
    icon: CreditCard,
    number: "03",
    title: "ID Card & Accreditation Generation",
    tag: "On-Site Credentials",
    desc: "High-throughput accreditation and credential printing engine. Produces scannable PVC cards and badge passes with embedded security verification.",
    capabilities: [
      "Instant batch PDF rendering optimized for thermal and PVC card printers",
      "Cryptographic QR code integration for instant mat-side identity checks",
      "Granular zone access control (Competition Mat, Warm-Up Hall, Officials, VIP, Media)",
      "High-resolution athlete photo formatting with automated face centering",
      "Role-based credential tiers for Athletes, Coaches, Referees, Judges, and Organizers",
      "Real-time credential revocation and replacement handling at on-site help desks",
    ],
  },
  {
    id: "weighin",
    icon: Scale,
    number: "04",
    title: "Digital Weigh-In Certification",
    tag: "Official Validation",
    desc: "Direct integration with certified digital scales. Records accurate weights instantly, verifies division boundaries, and certifies competitor eligibility without human transcription error.",
    capabilities: [
      "Sub-second digital scale interface via USB/Bluetooth with instant auto-capture",
      "Automatic division pass/fail validation against official federation tolerance rules",
      "Immediate weight category reassignment queue prior to official draw locking",
      "Digital weigh-in supervisor signature capture on touch terminals",
      "Instant printable and exportable certified weigh-in sheets for head referees",
      "Failed weigh-in tracking, second chance timer management, and disqualification logging",
    ],
  },
  {
    id: "draws",
    icon: GitBranch,
    number: "05",
    title: "Draw Generation & Seeding Engine",
    tag: "Deterministic Logic",
    desc: "Advanced bracket calculation engine executing deterministic draw algorithms. Automatically isolates competitors from the same club or state while honoring official rankings.",
    capabilities: [
      "Algorithmic club, team, district, and state separation across bracket branches",
      "Deterministic BYE allocation based on seed rankings and international formulas",
      "Live draw ceremony projection mode for transparent public drawing events",
      "Single-elimination, double-elimination, and round-robin tournament formats",
      "Cryptographic bracket locking ensuring immutable draw integrity prior to match start",
      "Instant PDF bracket export and direct sync to tournament displays",
    ],
  },
  {
    id: "scoring",
    icon: Cpu,
    number: "06",
    title: "Direct Scoring System Interfacing",
    tag: "Live Mat Sync",
    desc: "Bi-directional hardware and local area network sync with Kyorix Score mat controllers. Dispatches upcoming bouts directly to rings and ingests verified scores instantaneously.",
    capabilities: [
      "Zero-latency mat court assignment push directly from master schedule",
      "Real-time ingestion of referee keypad inputs, body/head hits, and Gam-jeom tallies",
      "Automatic point gap (12-point superiority) and Gam-jeom disqualification handling",
      "Instant winner advancement to the subsequent bracket round upon bout completion",
      "Court hold, medical pause, and video replay status flags broadcast to command center",
      "Offline local survivability ensuring bouts continue uninterrupted during network drops",
    ],
  },
  {
    id: "results",
    icon: Radio,
    number: "07",
    title: "Live Results & Arena Feeds",
    tag: "Real-Time Telemetry",
    desc: "Synchronous public and administrative results broadcasting. Feeds arena giant screens, spectator mobile devices, livestream overlays, and technical director consoles.",
    capabilities: [
      "Real-time bracket progression updates published instantaneously as matches conclude",
      "Mobile-optimized live score tracker and ring schedule monitor for spectators",
      "Clean broadcast graphics API feeds for TV overlays and streaming productions",
      "Multi-mat court overview dashboard for tournament directors and chief referees",
      "Instant match-by-match round breakdown and penalty audit logs",
      "Public search by athlete name, team, division, or mat number",
    ],
  },
  {
    id: "certificates",
    icon: Award,
    number: "08",
    title: "Live Certificates & Podium Records",
    tag: "Official Records",
    desc: "Automated digital certificate rendering engine. Generates official participation and podium achievement certificates immediately upon medal bout completion.",
    capabilities: [
      "Instant automated PDF certificate generation with dynamic athlete, coach & club data",
      "Cryptographic verification QR code printed on each certificate for public authenticity checks",
      "Accurate podium standing attribution: 1st Place (Gold), 2nd Place (Silver), Joint 3rd (Bronze)",
      "Pre-configured federation signatory artwork and official stamp embedding",
      "Sanctioned tournament master report export in PDF, CSV, and Excel formats",
      "Permanent cloud archive of athlete competition histories and podium achievements",
    ],
  },
];

const LIFECYCLE_STAGES = [
  {
    phase: "PHASE 01",
    title: "Pre-Tournament Setup & Registration",
    timeframe: "Weeks before competition",
    items: [
      "Configure tournament categories, divisions, and mat allocations",
      "Clubs & state bodies register athletes, submit medical waivers",
      "Verification of participant eligibility and belt credentials",
      "Batch generation and printing of PVC ID accreditation badges",
    ],
  },
  {
    phase: "PHASE 02",
    title: "Official Weigh-In & Bracket Draw",
    timeframe: "1 day prior to competition",
    items: [
      "Athletes report to digital scale stations for calibrated weighing",
      "Automatic pass/fail validation against sanctioned weight ranges",
      "Reassignment queue processed; final athlete roster certified",
      "Deterministic draw generator builds tournament brackets with separation logic",
      "Brackets locked cryptographically and distributed to coaches",
    ],
  },
  {
    phase: "PHASE 03",
    title: "Live Competition & Scoring Interfacing",
    timeframe: "Competition days",
    items: [
      "Scheduled matches pushed to Kyorix Score controllers across all mats",
      "Referees and corner judges score live bouts with instant system sync",
      "Automated Gam-jeom accumulation and round winner determination",
      "Winning athletes automatically advance to next bracket nodes in real time",
      "Live scoreboards, public feeds, and spectator portals update instantly",
    ],
  },
  {
    phase: "PHASE 04",
    title: "Podium Standings & Live Certificates",
    timeframe: "Conclusion of each category",
    items: [
      "Official medal standings (1st, 2nd, 3rd) generated automatically",
      "Print-ready achievement & participation certificates produced with QR codes",
      "Signatory officials certify final podium rankings",
      "Master competition audit logs and federation reports exported",
      "Records permanently archived in the Kyorix competition database",
    ],
  },
];

export default function KyorixTEMSPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              COMPLETE EVENT MANAGEMENT SYSTEM
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            KYORIX TEMS
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            The all-in-one tournament operating platform engineered specifically for competitive Taekwondo. Kyorix TEMS connects every stage of the competition lifecycle—from athlete registration and digital weigh-ins to deterministic bracket draws, live scoring system interfacing, arena results broadcasting, and instant certified award generation.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors shadow-lg shadow-kyorix-blue/20"
            >
              <span>SCHEDULE TEMS DEMONSTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?intent=pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-white border border-[#1E2638] text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>DEPLOYMENT & FEDERATION LICENSING</span>
            </Link>
          </div>
        </div>

        {/* Executive Platform Capabilities Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-1">
            <div className="text-2xl font-mono font-black text-kyorix-blue">100%</div>
            <div className="text-xs font-mono font-bold text-white uppercase">Unified Operations</div>
            <div className="text-[11px] text-gray-400">Zero separate spreadsheets or disjointed tools</div>
          </div>
          <div className="p-5 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-1">
            <div className="text-2xl font-mono font-black text-white">&lt; 1 sec</div>
            <div className="text-xs font-mono font-bold text-white uppercase">Digital Scale Sync</div>
            <div className="text-[11px] text-gray-400">Direct electronic weigh-in certification</div>
          </div>
          <div className="p-5 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-1">
            <div className="text-2xl font-mono font-black text-kyorix-blue">Real-Time</div>
            <div className="text-xs font-mono font-bold text-white uppercase">Court Progression</div>
            <div className="text-[11px] text-gray-400">Instant winner advancement to next round</div>
          </div>
          <div className="p-5 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-1">
            <div className="text-2xl font-mono font-black text-white">Cryptographic</div>
            <div className="text-xs font-mono font-bold text-white uppercase">Verifiable Records</div>
            <div className="text-[11px] text-gray-400">QR-authenticated certificates & audit logs</div>
          </div>
        </div>

        {/* Deep Dive: The 8 Core TEMS Functional Modules */}
        <div className="space-y-10">
          <SectionHeading
            label="SYSTEM SPECIFICATIONS"
            title="THE COMPLETE COMPETITION ENGINE"
            description="Kyorix TEMS is built as eight interconnected functional modules designed to replace fragmented manual workflows with automated digital tournament control."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMS_MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  className="bg-[#0D1117] border border-[#1E2638] hover:border-kyorix-blue/40 rounded-xl p-7 flex flex-col justify-between space-y-6 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-lg text-kyorix-blue">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                          MODULE {module.number}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold text-kyorix-blue bg-kyorix-blue/10 border border-kyorix-blue/30 rounded uppercase">
                        {module.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-mono font-bold text-white uppercase tracking-tight">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-normal">
                        {module.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1E2638] space-y-2.5">
                      <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                        Core Capabilities:
                      </div>
                      <div className="space-y-2">
                        {module.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-kyorix-blue shrink-0 mt-0.5" />
                            <span className="leading-snug">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-gray-500">
                      Standard in all Kyorix TEMS tournament licenses
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tournament Lifecycle Architecture */}
        <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-8 md:p-10 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-kyorix-blue uppercase tracking-widest">
              END-TO-END WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight mt-1">
              THE 4-PHASE TOURNAMENT LIFECYCLE
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-3xl">
              From the opening of team registration to the archive of official federation results, Kyorix TEMS enforces structured governance at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFECYCLE_STAGES.map((stage) => (
              <div
                key={stage.phase}
                className="bg-[#08090C] border border-[#1E2638] rounded-lg p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E2638] pb-2">
                    <span className="text-xs font-mono font-bold text-kyorix-blue">
                      {stage.phase}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {stage.timeframe}
                    </span>
                  </div>

                  <h3 className="text-sm font-mono font-bold text-white uppercase leading-snug">
                    {stage.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-gray-400">
                    {stage.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-kyorix-blue font-mono font-bold text-xs mt-0.5">•</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[10px] font-mono text-gray-500 uppercase">
                  Verified by Kyorix Engine
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Infrastructure Safeguards */}
        <div className="space-y-8">
          <SectionHeading
            label="INFRASTRUCTURE & RESILIENCE"
            title="BUILT FOR LIVE ARENA CONDITIONS"
            description="Championship sports halls present challenging network environments. Kyorix TEMS is engineered with local mesh reliability to ensure match operations never stall."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
              <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-mono font-bold text-white uppercase">
                Offline Local Survivability
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Operates over local area network (LAN) mat controllers. Even if external venue internet fails entirely, scoring, bracket progression, and court scheduling continue seamlessly without interruption.
              </p>
            </div>

            <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
              <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-mono font-bold text-white uppercase">
                Master Cloud Synchronization
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                As soon as internet connectivity is available, the on-site tournament master synchronizes all completed bouts, certified weigh-ins, and podium results to the secure cloud registry for global spectator access.
              </p>
            </div>

            <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-3">
              <div className="p-2.5 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded w-fit text-kyorix-blue">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-mono font-bold text-white uppercase">
                Role-Based Security & Audit Trails
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Individual authentication tokens for Tournament Directors, Chief Referees, Weigh-in Supervisors, and Table Operators. Every score adjustment and draw update is cryptographically logged with a timestamp.
              </p>
            </div>
          </div>
        </div>

        {/* Legacy Spreadsheets vs Kyorix TEMS Comparison */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Traditional Tournament Management vs. Kyorix TEMS
            </h3>
            <p className="text-xs text-gray-400">
              Why leading sporting organizations replace ad-hoc spreadsheets with the unified Kyorix platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#1E2638] text-gray-400">
                  <th className="py-3 px-4 uppercase">Tournament Task</th>
                  <th className="py-3 px-4 uppercase text-red-400">Traditional Method</th>
                  <th className="py-3 px-4 uppercase text-kyorix-blue">Kyorix TEMS Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2638] text-gray-300">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Athlete Registration</td>
                  <td className="py-3 px-4 text-gray-400">Disjointed paper forms and emailed Excel spreadsheets</td>
                  <td className="py-3 px-4 text-white">Centralized self-service digital portal with instant validation</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">ID Accreditation Badges</td>
                  <td className="py-3 px-4 text-gray-400">Manual copy-pasting into Word templates and photo cutting</td>
                  <td className="py-3 px-4 text-white">Automated batch PVC/paper badge generation with verified QR codes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Weigh-In Certification</td>
                  <td className="py-3 px-4 text-gray-400">Handwritten clipboard notes vulnerable to transcription error</td>
                  <td className="py-3 px-4 text-white">Direct digital scale capture with automated pass/fail tolerance rules</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Draws & Seeding</td>
                  <td className="py-3 px-4 text-gray-400">Manual paper chits prone to teammate clashes and favoritism</td>
                  <td className="py-3 px-4 text-white">Algorithmic separation rules with cryptographic bracket locking</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Scoring System Link</td>
                  <td className="py-3 px-4 text-gray-400">Runners carrying paper scorecards from mats to master desk</td>
                  <td className="py-3 px-4 text-white">Direct local network interface with Kyorix Score mat controllers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Live Results</td>
                  <td className="py-3 px-4 text-gray-400">Crowds gathered around physical paper boards at the venue</td>
                  <td className="py-3 px-4 text-white">Instant real-time multi-mat feeds on mobile, web, and arena screens</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Podium Certificates</td>
                  <td className="py-3 px-4 text-gray-400">Handwritten certificates delayed hours after finals finish</td>
                  <td className="py-3 px-4 text-white">Instant dynamic PDF certificates with QR authenticity checks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Footer Section */}
        <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-8 md:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight">
              Ready to Modernize Your Tournament Operations?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Connect with our technical team to schedule an interactive walkthrough of Kyorix TEMS or discuss deployment requirements for your upcoming championship.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>REQUEST A DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#08090C] hover:bg-[#1E2638] text-gray-300 hover:text-white border border-[#1E2638] text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>VIEW ALL PRODUCTS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
