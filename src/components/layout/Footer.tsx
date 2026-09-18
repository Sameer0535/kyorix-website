"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSiteContent } from "@/context/ContentContext";

export function Footer() {
  const { content } = useSiteContent();
  const router = useRouter();
  const pathname = usePathname();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretTrigger = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setClickCount(0);
      router.push("/admin");
    }
    setTimeout(() => setClickCount(0), 1800);
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-[#05070A] border-t border-[#1E2638] pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E2638]/70">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-2.5 py-1.5 rounded border border-white/20">
              <Image
                src="/brand/kyorix-logo.png"
                alt="KYORIX"
                width={220}
                height={60}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="space-y-1 pt-1">
              <div className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                {content.companyInfo.name}
              </div>
              <div className="text-xs font-mono text-kyorix-blue tracking-widest uppercase font-semibold">
                {content.companyInfo.tagline}
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Developing software, live competition systems and technology infrastructure for competitive sports. Engineered for precision, speed and fair competition.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-500 space-y-1">
              <div>Corporate Status: Private Limited Company</div>
              <div>Primary Discipline: Competitive Sports Technology</div>
            </div>
          </div>

          {/* Column: Products */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Products
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/products/score"
                  className="text-gray-400 hover:text-white hover:text-kyorix-blue transition-colors"
                >
                  Kyorix Score
                </Link>
              </li>
              <li>
                <Link
                  href="/products/bracket"
                  className="text-gray-400 hover:text-white hover:text-kyorix-blue transition-colors"
                >
                  Kyorix Bracket
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tems"
                  className="text-gray-400 hover:text-white hover:text-kyorix-blue transition-colors"
                >
                  Kyorix TEMS
                </Link>
              </li>
              <li className="pt-2 border-t border-[#1E2638]/50">
                <Link
                  href="/products"
                  className="text-kyorix-blue hover:underline"
                >
                  All Platforms →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Company & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Kyorix
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resources & Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Security */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Legal & Trust
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/security"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/contact?intent=demo"
                className="inline-flex items-center px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-kyorix-blue bg-kyorix-blue/10 border border-kyorix-blue/30 rounded hover:bg-kyorix-blue/20 transition-colors"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Notice & Placeholders */}
        <div className="py-6 border-b border-[#1E2638]/40 text-[11px] font-mono text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <span className="text-gray-400">CORPORATE INFORMATION STATUS:</span>
          </div>
          <div>{content.companyInfo.cin}</div>
          <div>{content.companyInfo.address}</div>
          <div>{content.companyInfo.email}</div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div
            onClick={handleSecretTrigger}
            className="cursor-default select-none hover:text-gray-400 transition-colors"
            title="Kyorix Platform"
          >
            © {new Date().getFullYear()} {content.companyInfo.name}. All Rights Reserved.
          </div>
          <div className="text-[11px] text-gray-500 tracking-wider uppercase">
            {content.companyInfo.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
