"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, GitBranch, Layers } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useSiteContent } from "@/context/ContentContext";

export function ProductEcosystem() {
  const { content } = useSiteContent();
  const eco = content.productEcosystem;
  const products = eco.products || [];
  const icons = [Cpu, GitBranch, Layers];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={eco.label || "PRODUCT ARCHITECTURE"}
          title={eco.title || "ONE ECOSYSTEM. THREE CORE PLATFORMS."}
          description={
            eco.description ||
            "Kyorix has engineered three focused software platforms that work seamlessly as independent modules or as an interconnected tournament ecosystem."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {products.map((product, idx) => {
            const Icon = icons[idx] || Layers;
            return (
              <div
                key={product.id || idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-kyorix-blue/60 hover:bg-white hover:shadow-xl transition-all duration-200 group relative shadow-xs"
              >
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-100/70 border border-blue-200 rounded-xl text-kyorix-blue group-hover:bg-kyorix-blue group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-mono font-bold text-slate-900 uppercase tracking-wider group-hover:text-kyorix-blue transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xs font-mono text-slate-500 font-medium">
                      {product.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                      Core Capabilities
                    </div>
                    <ul className="space-y-1.5">
                      {(product.features || []).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs font-mono text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-kyorix-blue shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8">
                  <Link
                    href={product.href || "/products"}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-kyorix-blue text-slate-800 hover:text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-slate-200 hover:border-kyorix-blue transition-all duration-150 shadow-xs group-hover:shadow-md"
                  >
                    <span>EXPLORE {product.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
