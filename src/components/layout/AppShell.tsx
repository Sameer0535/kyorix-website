"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-[#08090C] text-gray-100 w-full overflow-x-clip min-w-0">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow w-full overflow-x-clip min-w-0">{children}</main>
      <Footer />
    </>
  );
}
