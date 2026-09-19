"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, AlertCircle, Mail, Phone, MapPin, Building2, RotateCcw, ArrowRight, MessageSquare, ShieldCheck, Clock, ExternalLink, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { useSiteContent } from "@/context/ContentContext";

interface ContactFormProps {
  defaultIntent?: string;
}

export function ContactForm({ defaultIntent = "all" }: ContactFormProps) {
  let urgentPhone = "+91 90712 72555";
  let urgentEmail = "kyorixofficial@gmail.com";
  try {
    const siteCtx = useSiteContent();
    if (siteCtx?.content?.companyInfo?.urgentContactNumber) {
      urgentPhone = siteCtx.content.companyInfo.urgentContactNumber;
    }
    if (siteCtx?.content?.companyInfo?.urgentContactEmail) {
      urgentEmail = siteCtx.content.companyInfo.urgentContactEmail;
    }
  } catch (_) {}

  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    designation: "",
    email: "",
    phone: "",
    country: "",
    sport: "Taekwondo",
    interest: "KYORIX ESS",
    category: "BUSINESS ENQUIRIES",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.organization || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }
    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Network error. Please try again or email us directly at contact@kyorixsport.in.");
      setStatus("idle");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Contact Channels & Corporate Placeholders */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider">
              Communication Categories
            </h3>
            <p className="text-xs text-gray-400">
              Direct your requirement to the appropriate competition engineering desk.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#111622] border border-[#1E2638] rounded-lg space-y-1">
              <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                01 • BUSINESS & TOURNAMENT LICENSING
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tournament systems, court software deployment, federation licensing and event technology packages.
              </p>
              <div className="pt-2 text-[11px] font-mono text-gray-500">
                Inquiries routed to Commercial Solutions Desk
              </div>
            </div>

            <div className="p-4 bg-[#111622] border border-[#1E2638] rounded-lg space-y-1">
              <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                02 • TECHNOLOGY & PARTNERSHIPS
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Electronic scoring hardware manufacturers, timer developers, and platform integration partners.
              </p>
              <div className="pt-2 text-[11px] font-mono text-gray-500">
                Inquiries routed to Engineering Architecture Desk
              </div>
            </div>

            <div className="p-4 bg-[#111622] border border-[#1E2638] rounded-lg space-y-1">
              <div className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                03 • TECHNICAL SUPPORT & ON-SITE OPS
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Active competition technical support, scoring unit connectivity, and court management assistance.
              </p>
              <div className="pt-2 text-[11px] font-mono text-gray-500">
                Inquiries routed to Event Operations Support Desk
              </div>
            </div>
          </div>

          {/* Explicit Corporate Placeholders Box */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/30 rounded-lg space-y-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Official Registered Corporate Placeholders</span>
            </div>
            <p className="text-gray-400 text-[10px] leading-normal">
              Direct company contact numbers, registration identifiers, and physical premises are currently configured as pre-launch placeholders:
            </p>
            <div className="space-y-1 text-gray-300 pt-1">
              <div>Email: <span className="text-gray-400">{COMPANY_INFO.placeholders.email}</span></div>
              <div>Support: <span className="text-gray-400">{COMPANY_INFO.placeholders.supportEmail}</span></div>
              <div>Phone: <span className="text-gray-400">{COMPANY_INFO.placeholders.phone}</span></div>
              <div>Address: <span className="text-gray-400">{COMPANY_INFO.placeholders.address}</span></div>
              <div>CIN: <span className="text-gray-400">{COMPANY_INFO.placeholders.cin}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="lg:col-span-7">
        <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 sm:p-8 shadow-2xl">
          {status === "success" ? (
            <div className="space-y-6 text-left font-sans animate-in fade-in-50 duration-500">
              {/* Executive Header Banner */}
              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-[#101726] via-[#0C121E] to-[#070A10] border border-[#1E293B] shadow-2xl">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-kyorix-blue/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E283D]">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-kyorix-blue/20 to-kyorix-blue/5 border border-kyorix-blue/40 flex items-center justify-center text-kyorix-blue shadow-lg shadow-kyorix-blue/10 shrink-0">
                      <ShieldCheck className="w-6 h-6 text-cyan-400" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0C121E]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                          KYORIX SPORT TECHNOLOGY
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
                          Official
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                        Thank You for Reaching Out
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-300 uppercase tracking-wider self-start sm:self-center shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <span>Our Team Will Get Back to You Soon</span>
                  </div>
                </div>

                {/* Reassurance Message */}
                <div className="pt-4 space-y-1.5">
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                    We have received your demonstration request for{" "}
                    <span className="text-cyan-400 font-bold">{formData.interest || "KYORIX ESS"}</span>{" "}
                    on behalf of{" "}
                    <span className="text-white font-semibold">{formData.organization || "your federation"}</span>.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    An authorized technical representative from Kyorix Sport Technology is reviewing your tournament specifications and will contact you promptly to coordinate your demonstration and deployment schedule.
                  </p>
                </div>
              </div>

              {/* 3-Stage Progress Timeline */}
              <div className="p-4 bg-[#0A0E17] border border-[#1B2333] rounded-xl">
                <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Inquiry Processing Pipeline
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 p-2.5 bg-[#121826] border border-emerald-500/30 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">1. Request Docketed</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Logged & Queued</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 bg-[#121826] border border-cyan-500/30 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">2. Technical Review</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Operations Queue</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 bg-[#121826] border border-[#222C3E] rounded-lg opacity-70">
                    <div className="w-6 h-6 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-300">3. Demo & Dispatch</div>
                      <div className="text-[10px] text-gray-500 font-mono">Assigned Engineer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Summary Docket */}
              <div className="border border-[#1E2638] rounded-xl overflow-hidden bg-[#0A0E17]">
                <div className="bg-[#141A28] px-4 py-2.5 border-b border-[#1E2638] flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inquiry Submission Summary</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    ✓ Verified Record
                  </span>
                </div>
                <div className="divide-y divide-[#172032] text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                    <span className="text-gray-400">Authorized Contact</span>
                    <span className="sm:col-span-2 text-white font-medium">
                      {formData.fullName} {formData.designation ? `(${formData.designation})` : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                    <span className="text-gray-400">Organization / Federation</span>
                    <span className="sm:col-span-2 text-white font-medium">
                      {formData.organization}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                    <span className="text-gray-400">Corporate Email</span>
                    <span className="sm:col-span-2 text-gray-200 font-mono">
                      {formData.email}
                    </span>
                  </div>
                  {formData.phone && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                      <span className="text-gray-400">Contact Number</span>
                      <span className="sm:col-span-2 text-gray-200 font-mono">
                        {formData.phone}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                    <span className="text-gray-400">Platform Requested</span>
                    <span className="sm:col-span-2 text-blue-400 font-semibold">
                      {formData.interest}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5">
                    <span className="text-gray-400">Discipline / Sport</span>
                    <span className="sm:col-span-2 text-gray-200">
                      {formData.sport}
                    </span>
                  </div>
                </div>
              </div>

              {/* THE URGENT FEDERATION ESCALATION BOX (Editable via Admin Portal!) */}
              {(() => {
                const cleanDigits = urgentPhone.replace(/[^0-9]/g, "");
                const waNumber = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
                const telDial = cleanDigits.length === 10 ? `+91${cleanDigits}` : (cleanDigits.startsWith("91") ? `+${cleanDigits}` : `+${cleanDigits}`);
                const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                  `Hello Kyorix Operations Desk, I am contacting you regarding an urgent tournament requirement for ${formData.interest || "KYORIX ESS"} (${formData.organization || "Tournament"}).`
                )}`;

                return (
                  <div className="relative overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-[#1C1820] via-[#141824] to-[#0A0D18] border-2 border-amber-500/50 rounded-2xl space-y-4 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-500/20">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                            PRIORITY ESCALATION CHANNEL
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                            Urgent Federation Escalation Box
                          </h4>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider self-start sm:self-center">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Immediate Deadlines</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      Coordinating an imminent tournament, state/national championship, or facing strict federation sanctioning deadlines? Connect directly with our rapid technical operations desk:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {/* Direct Phone */}
                      <a
                        href={`tel:${telDial}`}
                        className="flex flex-col justify-between p-3.5 bg-[#151C2C] hover:bg-[#1C263A] border border-[#222E44] hover:border-amber-500/50 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                            Direct Call
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight group-hover:text-amber-300 transition-colors">
                            {urgentPhone}
                          </div>
                          <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                            Tap to call desk →
                          </div>
                        </div>
                      </a>

                      {/* Direct WhatsApp */}
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col justify-between p-3.5 bg-[#151C2C] hover:bg-[#1C263A] border border-[#222E44] hover:border-emerald-500/50 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                            WhatsApp Desk
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight group-hover:text-emerald-300 transition-colors">
                            Chat on WhatsApp
                          </div>
                          <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">
                            Instant operations chat →
                          </div>
                        </div>
                      </a>

                      {/* Direct Priority Email */}
                      <a
                        href={`mailto:${urgentEmail}?subject=Urgent%20Competition%20Escalation%20-%20${encodeURIComponent(formData.organization || "")}`}
                        className="flex flex-col justify-between p-3.5 bg-[#151C2C] hover:bg-[#1C263A] border border-[#222E44] hover:border-cyan-500/50 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                            Priority Email
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono truncate group-hover:text-cyan-300 transition-colors">
                            {urgentEmail}
                          </div>
                          <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                            Direct dispatch mailbox →
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="pt-2 border-t border-[#1C2436] flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>⚡ Priority turnaround within 1 business hour</span>
                      <span className="text-amber-400/80">Editable from Admin Portal</span>
                    </div>
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      fullName: "",
                      organization: "",
                      designation: "",
                      email: "",
                      phone: "",
                      country: "",
                      sport: "Taekwondo",
                      interest: "KYORIX ESS",
                      category: "BUSINESS ENQUIRIES",
                      message: "",
                    });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#141A28] hover:bg-[#1C2538] text-gray-200 hover:text-white border border-[#222E46] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                  <span>Submit Another Request</span>
                </button>
                <a
                  href="/#ecosystem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center shadow-lg shadow-kyorix-blue/20"
                >
                  <span>Explore Product Ecosystem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="border-b border-[#1E2638] pb-3 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Request a Demo & Technical Inquiry
                </h3>
                <p className="text-gray-400 text-[11px] mt-0.5">
                  Fields marked with asterisk (*) are required for routing.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-gray-300 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Kim"
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="organization" className="text-gray-300 uppercase tracking-wider block">
                    Organization / Federation *
                  </label>
                  <input
                    id="organization"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. State Taekwondo Association"
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="designation" className="text-gray-300 uppercase tracking-wider block">
                    Designation / Role
                  </label>
                  <input
                    id="designation"
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Technical Director / Tournament Org"
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-gray-300 uppercase tracking-wider block">
                    Corporate Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-gray-300 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91..."
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="country" className="text-gray-300 uppercase tracking-wider block">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. India"
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="sport" className="text-gray-300 uppercase tracking-wider block">
                    Discipline / Sport
                  </label>
                  <select
                    id="sport"
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Taekwondo">Taekwondo</option>
                    <option value="Karate">Karate</option>
                    <option value="Judo">Judo</option>
                    <option value="Wrestling">Wrestling</option>
                    <option value="Multi-Sport">Multi-Sport Tournament</option>
                    <option value="Other">Other Combat Sport</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label htmlFor="category" className="text-gray-300 uppercase tracking-wider block">
                    Inquiry Desk
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white focus:outline-none"
                  >
                    <option>BUSINESS ENQUIRIES</option>
                    <option>PARTNERSHIPS</option>
                    <option>TECHNICAL SUPPORT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="interest" className="text-gray-300 uppercase tracking-wider block">
                    Interested In *
                  </label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="KYORIX ESS">KYORIX ESS (Electronic Scoring System)</option>
                    <option value="KYORIX BRACKET">KYORIX BRACKET (Draw & Progression)</option>
                    <option value="KYORIX TEMS">KYORIX TEMS (Complete Event Management)</option>
                    <option value="HARDWARE">SCORING HARDWARE & PERIPHERALS</option>
                    <option value="PARTNERSHIP">COMMERCIAL / TECH PARTNERSHIP</option>
                    <option value="OTHER">OTHER TECHNICAL INQUIRY</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <label htmlFor="message" className="text-gray-300 uppercase tracking-wider block">
                  Competition Requirements / Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your tournament dates, anticipated athlete count, number of competition courts, and specific technology requirements..."
                  className="w-full bg-[#111622] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold tracking-widest uppercase rounded shadow-lg shadow-kyorix-blue/20 transition-all duration-150 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Processing..." : "Request a Demo"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
