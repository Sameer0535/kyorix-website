"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

export function CompanyIntro() {
  const { content } = useSiteContent();
  const mission = content.companyMission;

  const blocks = (mission as any).blocks || [
    {
      number: mission.block1Number || "01",
      title: mission.block1Title || "SCORING",
      desc:
        mission.block1Desc ||
        "Real-time competition technology. Engineered for sub-millisecond point registration, referee decision panels, penalty rule tracking, and arena display feeds.",
    },
    {
      number: mission.block2Number || "02",
      title: mission.block2Title || "COMPETITION",
      desc:
        mission.block2Desc ||
        "Intelligent tournament management. Automated draw generation, seed distribution, BYE calculations, match queuing, and knockout tree synchronization.",
    },
    {
      number: mission.block3Number || "03",
      title: mission.block3Title || "EVENTS",
      desc:
        mission.block3Desc ||
        "Connected sporting infrastructure. Unifying participant registration, weigh-in verification, multi-court operations, and certified final results under one architecture.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#08090C] border-t border-[#1E2638] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={mission.label || "COMPANY MISSION"}
          title={mission.title || "BUILDING THE INFRASTRUCTURE BEHIND COMPETITION."}
          description={
            mission.description ||
            "Kyorix Sport Technology Private Limited develops technology designed to simplify, connect and modernize competitive sporting events."
          }
        />

        {/* Dynamic Editorial Foundation Blocks */}
        <div
          className="grid gap-6 lg:gap-8 mt-12"
          style={{
            gridTemplateColumns: `repeat(${Math.min(blocks.length, 3) || 1}, minmax(0, 1fr))`,
          }}
        >
          {blocks.map((block: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#0D1117] border border-[#1E2638] p-8 rounded-lg space-y-4 hover:border-kyorix-blue/40 transition-colors"
            >
              <div className="text-4xl font-mono font-black text-kyorix-blue">
                {block.number || `0${idx + 1}`}
              </div>
              <h3 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
                {block.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Restrained Sports Photography Banner */}
        <div className="mt-12 rounded-xl overflow-hidden border border-[#1E2638] relative group">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src={mission.bannerImageSrc || "/images/arena-competition.jpg"}
              alt="International competitive sport arena featuring electronic scoring technology"
              fill
              className="object-cover brightness-75 contrast-110 group-hover:scale-[1.01] transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-lg space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-kyorix-blue uppercase bg-[#08090C]/80 px-2.5 py-1 rounded border border-kyorix-blue/30 inline-block">
                  {mission.bannerTag || "COMPETITIVE INTEGRITY"}
                </span>
                <p className="text-sm sm:text-base font-mono font-semibold text-white">
                  {mission.bannerCaption ||
                    "Built to deliver absolute fairness, speed, and precision in sanctioned tournament environments."}
                </p>
              </div>
              <div className="text-[11px] font-mono text-gray-400 bg-[#08090C]/80 px-3 py-1.5 rounded border border-[#1E2638] shrink-0">
                {mission.bannerSubtext || "Official Arena Deployment Context"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
