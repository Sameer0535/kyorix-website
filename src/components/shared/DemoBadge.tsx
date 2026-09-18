import React from "react";
import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  label?: string;
  variant?: "blue" | "neutral" | "warning";
  className?: string;
}

export function DemoBadge({
  label = "DEMO / SAMPLE DATA",
  variant = "blue",
  className,
}: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border",
        variant === "blue" &&
          "bg-kyorix-blue/10 text-blue-400 border-kyorix-blue/30",
        variant === "neutral" &&
          "bg-white/5 text-gray-400 border-white/10",
        variant === "warning" &&
          "bg-amber-500/10 text-amber-400 border-amber-500/30",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}
