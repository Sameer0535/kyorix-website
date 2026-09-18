"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import defaultContentData from "@/data/default-content.json";

export type SiteContent = typeof defaultContentData;

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
  updateWholeContent: (newContent: SiteContent) => void;
  saveContent: (customContent?: SiteContent) => Promise<boolean>;
  resetSection: (section: keyof SiteContent) => Promise<boolean>;
  resetAllContent: () => Promise<boolean>;
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
}

const LOCAL_STORAGE_KEY = "kyorix_site_content_v1";
const ADMIN_SESSION_KEY = "kyorix_admin_auth_token";

const ContentContext = createContext<ContentContextType | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContentData);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  // Load content from API or localStorage on initial mount
  useEffect(() => {
    async function initContent() {
      // Check admin session
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (token === "authenticated_kyorix_admin") {
          setIsAuthenticated(true);
        }
      }

      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json?.data) {
            setContent(json.data);
            if (typeof window !== "undefined") {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
            }
            setHasHydrated(true);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch server content, falling back to client cache", err);
      }

      // Client storage fallback
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            setContent(JSON.parse(cached));
          } catch (e) {
            console.error("Failed to parse cached content", e);
          }
        }
      }
      setHasHydrated(true);
    }

    initContent();
  }, []);

  // Global Secret Shortcut: Ctrl+Shift+A or Cmd+Shift+A opens hidden admin portal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        window.location.href = "/admin";
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateSection = useCallback(
    <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
      setContent((prev) => {
        const updated = {
          ...prev,
          [section]: {
            ...prev[section],
            ...data,
          },
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });
    },
    []
  );

  const updateWholeContent = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    }
  }, []);

  const saveContent = useCallback(
    async (customContent?: SiteContent) => {
      setIsSaving(true);
      const dataToSave = customContent || content;
      try {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        });

        if (res.ok) {
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
          }
          setLastSaved(new Date());
          setIsSaving(false);
          return true;
        }
      } catch (e) {
        console.error("Save error:", e);
      }
      setIsSaving(false);
      return false;
    },
    [content]
  );

  const resetSection = useCallback(
    async (section: keyof SiteContent) => {
      const defaultSection = (defaultContentData as any)[section];
      if (!defaultSection) return false;

      const updated = {
        ...content,
        [section]: defaultSection,
      };
      setContent(updated);
      return await saveContent(updated);
    },
    [content, saveContent]
  );

  const resetAllContent = useCallback(async () => {
    try {
      await fetch("/api/content", { method: "DELETE" });
    } catch (e) {
      console.warn("Server reset call failed, clearing locally", e);
    }
    setContent(defaultContentData);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setLastSaved(new Date());
    return true;
  }, []);

  const login = useCallback(
    (pin: string) => {
      const correctPin = content?.admin?.pin || defaultContentData.admin.pin;
      if (pin.trim() === correctPin.trim()) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(ADMIN_SESSION_KEY, "authenticated_kyorix_admin");
        }
        return true;
      }
      return false;
    },
    [content]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        updateWholeContent,
        saveContent,
        resetSection,
        resetAllContent,
        isAuthenticated,
        login,
        logout,
        isSaving,
        lastSaved,
      }}
    >
      {children}
      {/* Discreet floating admin status bar when admin is logged in on public pages */}
      {isAuthenticated && typeof window !== "undefined" && !window.location.pathname.startsWith("/admin") && (
        <aside
          aria-label="Admin Control Status"
          className="fixed bottom-4 right-4 z-50 bg-[#0A0D14] border border-kyorix-blue/40 text-white px-4 py-2.5 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-bold">ADMIN MODE</span>
          </div>
          <a
            href="/admin"
            className="px-2.5 py-1 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-[11px] font-bold uppercase tracking-wider transition-colors"
          >
            EDIT PORTAL
          </a>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 text-[11px] transition-colors"
          >
            Logout
          </button>
        </aside>
      )}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return ctx;
}
