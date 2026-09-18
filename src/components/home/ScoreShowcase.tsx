"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductImageFrame } from "@/components/products/ProductImageFrame";
import { useSiteContent } from "@/context/ContentContext";

export function ScoreShowcase() {
  const { content } = useSiteContent();
  const score = content.scoreProduct;

  return (
    <section className="py-20 md:py-28 bg-[#0D1117] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            label={score.label || "01 • ELECTRONIC SCORING PLATFORM"}
            title={score.title || "COMPETITION. IN REAL TIME."}
            description={score.description || "Kyorix Score coordinates referee and judge inputs, automatic penalty calculations, and live arena scoreboards with deterministic, sub-millisecond precision."}
            className="mb-0"
          />
          <Link
            href={score.ctaLink || "/products/score"}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-kyorix-blue hover:text-white transition-colors shrink-0"
          >
            <span>{score.ctaText || "DEEP DIVE: KYORIX SCORE"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Real Software Screenshot Frame */}
        <div className="mt-8">
          <ProductImageFrame
            title={score.imageTitle || "KYORIX SCORE — REAL-TIME ARENA SCORING SOFTWARE"}
            subtitle={score.imageSubtitle || "Live match control, referee point validation, and synchronized arena display"}
            imageSrc={score.imageSrc || "/images/products/score.png"}
            altText="Kyorix Score official software interface"
            badge={score.badge || "ELECTRONIC SCORING"}
            aspectRatio="aspect-[16/9.5]"
          />
        </div>
      </div>
    </section>
  );
}
