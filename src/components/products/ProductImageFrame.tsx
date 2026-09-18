"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Monitor } from "lucide-react";

interface ProductImageFrameProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  altText: string;
  aspectRatio?: string;
  badge?: string;
}

export function ProductImageFrame({
  title,
  subtitle,
  imageSrc,
  altText,
  aspectRatio = "aspect-[16/9.5]",
  badge = "OFFICIAL SOFTWARE",
}: ProductImageFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-[#0A0D14] border border-[#1E2638] rounded-xl shadow-2xl overflow-hidden group">
      {/* Top Application Window Bar */}
      <div className="bg-[#05070A] border-b border-[#1E2638] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E2638] group-hover:bg-red-500/80 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E2638] group-hover:bg-amber-500/80 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E2638] group-hover:bg-emerald-500/80 transition-colors" />
          </div>
          <span className="text-gray-600">|</span>
          <span className="text-white font-bold tracking-wider uppercase">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-kyorix-blue bg-kyorix-blue/10 border border-kyorix-blue/30 rounded uppercase tracking-wider">
            {badge}
          </span>
        </div>
      </div>

      {/* Frame Body: High-Definition Image Display */}
      <div className={`relative w-full ${aspectRatio} bg-[#06080C] flex items-center justify-center overflow-hidden`}>
        {!hasError ? (
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain object-center select-none"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            onError={() => setHasError(true)}
            priority
            unoptimized
          />
        ) : (
          /* Clean Waiting State */
          <div className="text-center p-8 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-[#1E2638] flex items-center justify-center mx-auto text-kyorix-blue">
              <Monitor className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                {title}
              </h4>
              <p className="text-xs font-mono text-gray-400">
                {subtitle || "Real production software screenshot placeholder"}
              </p>
            </div>

            <div className="p-3 bg-[#111622] border border-[#1E2638] rounded text-[11px] font-mono text-gray-400 space-y-1">
              <div className="text-kyorix-blue font-semibold">IMAGE PATH RESERVED:</div>
              <div className="text-gray-300 select-all font-mono text-[10px]">{imageSrc}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
