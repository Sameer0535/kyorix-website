import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Contact & Demo Request | Kyorix Sport Technology",
  description:
    "Let's build the future of competition. Contact Kyorix Sport Technology for tournament scoring, brackets, and event management.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090C] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
            <span className="text-xs font-mono font-bold tracking-widest text-kyorix-blue uppercase">
              GET IN TOUCH
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase leading-tight">
            LET&apos;S BUILD THE <br />
            <span className="text-kyorix-blue">FUTURE OF COMPETITION.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Connect with Kyorix Sport Technology Private Limited to schedule a live product demonstration, discuss tournament licensing, or explore technical integration partnerships.
          </p>
        </div>

        {/* Contact Form & Corporate Channels */}
        <ContactForm />
      </div>
    </div>
  );
}
