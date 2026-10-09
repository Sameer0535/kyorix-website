"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white/90 backdrop-blur-md py-4 sm:py-5 border-b border-slate-200/80 shadow-xs"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo (Enhanced Size & Visual Impact) */}
          <Link
            href="/"
            className="flex items-center group focus-visible:outline-none shrink-0"
            aria-label="Kyorix Home"
          >
            <div className="relative transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/brand/kyorix-logo-transparent.png"
                alt="KYORIX - Sport Technology Private Limited"
                width={854}
                height={802}
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  scrolled
                    ? "h-12 sm:h-14 md:h-16"
                    : "h-14 sm:h-16 md:h-20 lg:h-22"
                )}
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation (Consistent Sizing & High-Contrast Typography) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                const isActive = pathname.startsWith("/products");
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 text-[13px] font-mono tracking-wider uppercase rounded-md transition-all duration-150 border",
                        isActive
                          ? "text-kyorix-blue bg-blue-50 border-blue-200 font-bold shadow-xs"
                          : "text-slate-700 hover:text-kyorix-blue hover:bg-slate-50 border-transparent font-medium"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          productsDropdownOpen ? "rotate-180 text-kyorix-blue" : "text-slate-400"
                        )}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 pt-2 z-50">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-2 space-y-1">
                          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                            Core Platforms
                          </div>
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block px-3 py-2.5 rounded-md transition-colors group",
                                pathname === child.href
                                  ? "bg-blue-50 border-l-2 border-kyorix-blue"
                                  : "hover:bg-slate-50"
                              )}
                            >
                              <div className="text-xs font-semibold text-slate-900 group-hover:text-kyorix-blue transition-colors">
                                {child.name}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                {child.tagline}
                              </div>
                            </Link>
                          ))}
                          <div className="pt-1.5 border-t border-slate-100">
                            <Link
                              href="/products"
                              className="flex items-center justify-between px-3 py-2 text-[11px] font-mono text-kyorix-blue font-bold hover:underline"
                            >
                              <span>View Platform Ecosystem</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-[13px] font-mono tracking-wider uppercase rounded-md transition-all duration-150 border inline-flex items-center justify-center",
                    isActive
                      ? "text-kyorix-blue bg-blue-50 border-blue-200 font-bold shadow-xs"
                      : "text-slate-700 hover:text-kyorix-blue hover:bg-slate-50 border-transparent font-medium"
                  )}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] font-mono font-bold tracking-wider uppercase bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded-md transition-all duration-150 shadow-md shadow-kyorix-blue/20"
            >
              CONTACT NOW
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center px-3 py-2 text-xs font-mono font-bold uppercase bg-kyorix-blue text-white rounded-md shadow-sm"
            >
              Contact Now
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 h-[calc(100dvh-100%)] bg-white border-t border-slate-200 overflow-y-auto px-5 py-6 space-y-6 z-50 animate-in fade-in-50 duration-200 shadow-2xl">
          <nav className="space-y-2">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="border-b border-slate-100 pb-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm font-mono uppercase tracking-wider",
                    pathname === link.href ? "text-kyorix-blue font-bold" : "text-slate-800 font-medium"
                  )}
                >
                  {link.name}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-kyorix-blue/30">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-1.5 text-xs font-mono",
                          pathname === child.href ? "text-kyorix-blue font-semibold" : "text-slate-600"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-3 pt-2">
            <Link
              href="/contact?intent=demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono font-bold uppercase tracking-wider bg-kyorix-blue text-white rounded-md text-center shadow-md shadow-blue-500/20"
            >
              CONTACT NOW
            </Link>
            <div className="text-[11px] font-mono text-slate-500 text-center">
              {COMPANY_INFO.tagline}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
