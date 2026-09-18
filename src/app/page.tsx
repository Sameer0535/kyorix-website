import React from "react";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { ProductEcosystem } from "@/components/home/ProductEcosystem";
import { CompetitionLifecycle } from "@/components/home/CompetitionLifecycle";
import { ScoreShowcase } from "@/components/home/ScoreShowcase";
import { BracketShowcase } from "@/components/home/BracketShowcase";
import { TEMSShowcase } from "@/components/home/TEMSShowcase";
import { TechnologyPreview } from "@/components/home/TechnologyPreview";
import { SportingEcosystem } from "@/components/home/SportingEcosystem";
import { FutureRoadmap } from "@/components/home/FutureRoadmap";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 01: HERO */}
      <Hero />

      {/* 02: COMPANY INTRODUCTION */}
      <CompanyIntro />

      {/* 03: PRODUCT ECOSYSTEM */}
      <ProductEcosystem />

      {/* 04: COMPETITION LIFECYCLE */}
      <CompetitionLifecycle />

      {/* 05: KYORIX SCORE SHOWCASE */}
      <ScoreShowcase />

      {/* 06: KYORIX BRACKET SHOWCASE */}
      <BracketShowcase />

      {/* 07: KYORIX TEMS SHOWCASE */}
      <TEMSShowcase />

      {/* 08: TECHNOLOGY SECTION */}
      <TechnologyPreview />

      {/* 09: SPORTING ECOSYSTEM */}
      <SportingEcosystem />

      {/* 10: FUTURE */}
      <FutureRoadmap />

      {/* 11: FINAL CTA */}
      <FinalCTA />
    </div>
  );
}
