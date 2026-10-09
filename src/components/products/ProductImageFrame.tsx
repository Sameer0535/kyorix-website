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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden group">
      {/* Top Application Window Bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-red-500/80 transition-colors" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-amber-500/80 transition-colors" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-500/80 transition-colors" />
          </div>
          <span className="text-slate-400 shrink-0">|</span>
          <span className="text-slate-800 font-bold tracking-wider uppercase truncate max-w-[180px] xs:max-w-[240px] sm:max-w-none">{title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-semibold text-kyorix-blue bg-blue-50 border border-blue-200 rounded uppercase tracking-wider">
            {badge}
          </span>
        </div>
      </div>

      {/* Frame Body: High-Definition Image Display */}
      <div className={`relative w-full ${aspectRatio} bg-slate-50 flex items-center justify-center overflow-hidden`}>
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
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-kyorix-blue">
              <Monitor className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-mono font-bold text-slate-800 uppercase tracking-wider">
                {title}
              </h4>
              <p className="text-xs font-mono text-slate-500">
                {subtitle || "Real production software screenshot placeholder"}
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-slate-500 space-y-1">
              <div className="text-kyorix-blue font-semibold">IMAGE PATH RESERVED:</div>
              <div className="text-slate-700 select-all font-mono text-[10px]">{imageSrc}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
