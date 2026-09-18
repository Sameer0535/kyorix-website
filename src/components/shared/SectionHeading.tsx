import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {label && (
        <div
          className={cn(
            "flex items-center gap-2",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-kyorix-blue" />
          <span className="text-xs font-mono font-semibold tracking-widest text-kyorix-blue uppercase">
            {label}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-normal leading-relaxed pt-1">
          {description}
        </p>
      )}
    </div>
  );
}
