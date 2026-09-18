"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductImageFrame } from "@/components/products/ProductImageFrame";
import { useSiteContent } from "@/context/ContentContext";

export function BracketShowcase() {
  const { content } = useSiteContent();
  const bracket = content.bracketProduct;

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            label={bracket.label || "02 • TOURNAMENT DRAW & PROGRESSION"}
            title={bracket.title || "EVERY MATCH. EVERY PATH. CONNECTED."}
            description={bracket.description || "Kyorix Bracket automatically builds, balances, and progresses tournament brackets. From randomized draw ceremonies to gold medal finals, every path is transparent and auditable."}
            className="mb-0"
          />
          <Link
            href={bracket.ctaLink || "/products/bracket"}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-kyorix-blue hover:text-white transition-colors shrink-0"
          >
            <span>{bracket.ctaText || "VIEW KYORIX BRACKET"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Real Software Screenshot Frame */}
        <div className="mt-8">
          <ProductImageFrame
            title={bracket.imageTitle || "KYORIX BRACKET — TOURNAMENT DRAW & PROGRESSION SOFTWARE"}
            subtitle={bracket.imageSubtitle || "Automated category draws, single/double elimination progression, and court assignment"}
            imageSrc={bracket.imageSrc || "/images/products/bracket.png"}
            altText="Kyorix Bracket official software interface"
            badge={bracket.badge || "BRACKET ENGINE"}
            aspectRatio="aspect-[16/8]"
          />
        </div>
      </div>
    </section>
  );
}
