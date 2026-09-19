"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Save,
  RotateCcw,
  Upload,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Trophy,
  Layers,
  Cpu,
  GitBranch,
  Shield,
  Users,
  FileText,
  Settings,
  Sparkles,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  Compass,
  Award,
  Network,
  ChevronUp,
  ChevronDown,
  GripVertical,
  ArrowUpDown,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useSiteContent, SiteContent } from "@/context/ContentContext";

type AdminTab =
  | "enquiries"
  | "hero"
  | "companyMission"
  | "productEcosystem"
  | "competitionLifecycle"
  | "scoreProduct"
  | "bracketProduct"
  | "temsProduct"
  | "technologyPreview"
  | "sportingEcosystem"
  | "futureRoadmap"
  | "finalCTA"
  | "companyInfo"
  | "settings";

export default function AdminPortalPage() {
  const {
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
  } = useSiteContent();

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<string | null>(null);
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Settings tab states
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState<{
    section: keyof SiteContent;
    field: string;
  } | null>(null);

  // Drag & drop and moveable stages state
  const [draggedStageIdx, setDraggedStageIdx] = useState<number | null>(null);

  const moveStage = (fromIdx: number, toIdx: number) => {
    const stages = content.competitionLifecycle.stages || [];
    if (toIdx < 0 || toIdx >= stages.length || fromIdx === toIdx) return;
    const newStages = [...stages];
    const [moved] = newStages.splice(fromIdx, 1);
    newStages.splice(toIdx, 0, moved);

    const renumbered = newStages.map((st, i) => ({
      ...st,
      step: String(i + 1).padStart(2, "0"),
    }));
    updateSection("competitionLifecycle", { stages: renumbered });
    showToast(`Moved stage to position ${toIdx + 1}.`);
  };

  const handleRestoreBaselineStages = () => {
    const baseline11 = [
      { step: "01", name: "REGISTRATION", desc: "Athlete, coach & team entries" },
      { step: "02", name: "VERIFICATION", desc: "Documents, licenses & waivers" },
      { step: "03", name: "CATEGORIES", desc: "Age, belt & division mapping" },
      { step: "04", name: "WEIGH-IN", desc: "Digital scale verification" },
      { step: "05", name: "SEEDING", desc: "Rankings & separation rules" },
      { step: "06", name: "DRAWS", desc: "Automated single-elimination trees" },
      { step: "07", name: "COURTS", desc: "Mat scheduling & bout calls" },
      { step: "08", name: "SCORING", desc: "Live referee consensus" },
      { step: "09", name: "PROGRESSION", desc: "Real-time winner advancement" },
      { step: "10", name: "STANDINGS", desc: "Certified podium allocation" },
      { step: "11", name: "ARCHIVE", desc: "Master records & certificates" },
    ];
    updateSection("competitionLifecycle", { stages: baseline11 });
    showToast("Restored all 11 competition stages (including SEEDING and DRAWS).");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Enquiries management states and handlers
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState<"ALL" | "NEW" | "READ" | "RESPONDED">("ALL");

  const fetchEnquiries = async () => {
    setIsLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiry");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setIsLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated, activeTab]);

  const handleUpdateEnquiryStatus = async (id: string, status: "NEW" | "READ" | "RESPONDED") => {
    try {
      const res = await fetch("/api/enquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        showToast(`Inquiry marked as ${status}.`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/enquiry?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        showToast("Inquiry deleted successfully.");
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const handleExportEnquiriesCSV = () => {
    if (enquiries.length === 0) {
      alert("No inquiries to export.");
      return;
    }
    const headers = [
      "Inquiry ID",
      "Date",
      "Status",
      "Full Name",
      "Organization",
      "Designation",
      "Email",
      "Phone",
      "Country",
      "Sport",
      "Interest",
      "Category Desk",
      "Message",
    ];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleString(),
      e.status,
      `"${(e.fullName || "").replace(/"/g, '""')}"`,
      `"${(e.organization || "").replace(/"/g, '""')}"`,
      `"${(e.designation || "").replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      e.country,
      e.sport,
      `"${(e.interest || "").replace(/"/g, '""')}"`,
      `"${(e.category || "").replace(/"/g, '""')}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kyorix_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported inquiries to CSV.");
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryFilter === "ALL") return true;
    return e.status === enquiryFilter;
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(pinInput);
    if (!success) {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    } else {
      setPinInput("");
    }
  };

  const handleSaveAll = async () => {
    const success = await saveContent(content);
    if (success) {
      showToast("All changes saved and synchronized successfully!");
    } else {
      showToast("Failed to save changes. Please try again.");
    }
  };

  const handleResetSection = async (section: keyof SiteContent) => {
    if (confirm(`Are you sure you want to reset the ${String(section)} section to default content?`)) {
      const ok = await resetSection(section);
      if (ok) {
        showToast(`Reset ${String(section)} to baseline defaults.`);
      }
    }
  };

  const handleResetAll = async () => {
    if (
      confirm(
        "CAUTION: Are you sure you want to reset the ENTIRE website content to factory defaults? All custom edits will be reverted."
      )
    ) {
      const ok = await resetAllContent();
      if (ok) {
        showToast("Full factory reset complete.");
      }
    }
  };

  // Image Upload Handler
  const triggerImageUpload = (section: keyof SiteContent, field: string) => {
    setCurrentUploadTarget({ section, field });
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUploadTarget) return;

    setUploadingField(currentUploadTarget.field);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        updateSection(currentUploadTarget.section, {
          [currentUploadTarget.field]: data.url,
        } as any);
        showToast(`Uploaded ${data.fileName} successfully!`);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploadingField(null);
      setCurrentUploadTarget(null);
      if (e.target) e.target.value = "";
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kyorix-website-content-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Content backup downloaded.");
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && typeof json === "object") {
          updateWholeContent(json);
          await saveContent(json);
          showToast("Content backup restored successfully!");
        }
      } catch (err) {
        alert("Invalid JSON backup file format");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Change PIN handler
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin.length < 4) {
      alert("PIN must be at least 4 characters long.");
      return;
    }
    if (newPin !== confirmPin) {
      alert("PIN confirmation does not match.");
      return;
    }
    updateSection("admin", { pin: newPin });
    const success = await saveContent({
      ...content,
      admin: { pin: newPin },
    });
    if (success) {
      setNewPin("");
      setConfirmPin("");
      showToast("Security PIN updated successfully!");
    }
  };

  // Hidden File Input for Image Uploads
  const hiddenFileInput = (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
      className="hidden"
    />
  );

  // Toast Notification Overlay
  const toastNotification = toastMessage && (
    <div className="fixed top-6 right-6 z-50 bg-[#0A0D14] border border-kyorix-blue text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 text-xs font-mono animate-in fade-in slide-in-from-top-2">
      <CheckCircle2 className="w-4 h-4 text-kyorix-blue shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );

  // ==========================================
  // VIEW 1: PIN AUTHENTICATION CHALLENGE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090C] text-white flex items-center justify-center p-4">
        {toastNotification}
        <div className="w-full max-w-md bg-[#0D1117] border border-[#1E2638] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-kyorix-blue/10 border border-kyorix-blue/30 flex items-center justify-center mx-auto text-kyorix-blue">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest text-kyorix-blue uppercase">
                RESTRICTED ACCESS
              </div>
              <h1 className="text-xl font-mono font-bold text-white uppercase mt-1">
                KYORIX ADMIN CONSOLE
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Enter your administrative PIN to manage website text, photos, and configurations.
              </p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-gray-400 uppercase">
                SECURITY PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode"
                  autoFocus
                  className={`w-full bg-[#08090C] border ${
                    pinError ? "border-red-500 ring-1 ring-red-500" : "border-[#1E2638] focus:border-kyorix-blue"
                  } rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:outline-none transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <div className="text-[11px] font-mono text-red-400 flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Incorrect PIN. Please verify and try again.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-kyorix-blue/20"
            >
              <Lock className="w-4 h-4" />
              <span>AUTHENTICATE & ENTER</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
            >
              Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN EDITING PORTAL
  // ==========================================
  const navTabs: { id: AdminTab; label: string; icon: any; sectionNumber: string }[] = [
    { id: "enquiries", sectionNumber: "★", label: "CUSTOMER ENQUIRIES", icon: Mail },
    { id: "hero", sectionNumber: "01", label: "HERO SECTION", icon: Sparkles },
    { id: "companyMission", sectionNumber: "02", label: "COMPANY MISSION", icon: FileText },
    { id: "productEcosystem", sectionNumber: "03", label: "PRODUCT ARCHITECTURE", icon: Layers },
    { id: "competitionLifecycle", sectionNumber: "04", label: "COMPETITION WORKFLOW", icon: GitBranch },
    { id: "scoreProduct", sectionNumber: "05", label: "KYORIX SCORE", icon: Cpu },
    { id: "bracketProduct", sectionNumber: "06", label: "KYORIX BRACKET", icon: GitBranch },
    { id: "temsProduct", sectionNumber: "07", label: "KYORIX TEMS", icon: Trophy },
    { id: "technologyPreview", sectionNumber: "08", label: "ENGINEERING ARCHITECTURE", icon: Network },
    { id: "sportingEcosystem", sectionNumber: "09", label: "STAKEHOLDER CONNECTIVITY", icon: Users },
    { id: "futureRoadmap", sectionNumber: "10", label: "TECHNOLOGY EVOLUTION", icon: Compass },
    { id: "finalCTA", sectionNumber: "11", label: "CALL TO ACTION", icon: Award },
    { id: "companyInfo", sectionNumber: "12", label: "COMPANY & LEGAL", icon: Shield },
    { id: "settings", sectionNumber: "13", label: "SETTINGS & BACKUP", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-gray-200 flex flex-col font-sans">
      {hiddenFileInput}
      {toastNotification}

      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0D14]/95 backdrop-blur-md border-b border-[#1E2638] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kyorix-blue/10 border border-kyorix-blue/30 rounded text-kyorix-blue">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                KYORIX ADMIN PORTAL
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded uppercase">
                LIVE EDITING
              </span>
            </div>
            <div className="text-[11px] font-mono text-gray-500">
              {lastSaved ? `Last synchronized: ${lastSaved.toLocaleTimeString()}` : "Ready for edits"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-white border border-[#1E2638] rounded text-xs font-mono font-bold uppercase transition-colors"
          >
            <span>VIEW LIVE SITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg shadow-kyorix-blue/20 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>SAVE ALL CHANGES</span>
              </>
            )}
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-mono font-bold uppercase transition-colors"
            title="Lock & Exit Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-[#0D1117] border-r border-[#1E2638] p-4 shrink-0 space-y-1">
          <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest px-3 py-2">
            WEBSITE SECTIONS
          </div>

          {navTabs.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const isEnquiries = item.id === "enquiries";
            const unreadCount = enquiries.filter((e) => e.status === "NEW").length;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors text-left ${
                  active
                    ? "bg-kyorix-blue text-white shadow-md shadow-kyorix-blue/20"
                    : isEnquiries && unreadCount > 0
                    ? "text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-900/40"
                    : "text-gray-400 hover:text-white hover:bg-[#151C2A]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  {isEnquiries && unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-cyan-400 text-black rounded-full">
                      {unreadCount} NEW
                    </span>
                  )}
                  <span className={`text-[10px] font-mono ${active ? "text-white/80" : "text-gray-600"}`}>
                    {item.sectionNumber}
                  </span>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Right Content Editor Area */}
        <main className="flex-grow p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* TAB: CUSTOMER ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">
                    INBOX & LEADS DESK
                  </div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>CUSTOMER INQUIRIES & DEMO REQUESTS</span>
                    <span className="px-2 py-0.5 text-xs bg-kyorix-blue/10 text-kyorix-blue border border-kyorix-blue/30 rounded">
                      {enquiries.length} Total
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Live stream of competition inquiries, partnership requests, and demo leads submitted via the website.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchEnquiries}
                    disabled={isLoadingEnquiries}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-white border border-[#1E2638] rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEnquiries ? "animate-spin text-kyorix-blue" : ""}`} />
                    <span>REFRESH</span>
                  </button>

                  <button
                    onClick={handleExportEnquiriesCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-white border border-[#1E2638] rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>

              {/* Notification Email Routing Settings Box */}
              <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                    <Mail className="w-4 h-4 text-kyorix-blue" />
                    <span>Inquiry Notification Dispatch Email Routing</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
                    Direct Delivery Active
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Every inquiry submitted through the website is automatically dispatched to these destination mailboxes. You can modify these at any time:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                      Primary Alert Destination (To)
                    </label>
                    <input
                      type="email"
                      value={content.companyInfo.inquiryRecipientEmail || "kyorixofficial@gmail.com"}
                      onChange={(e) => updateSection("companyInfo", { inquiryRecipientEmail: e.target.value })}
                      placeholder="kyorixofficial@gmail.com"
                      className="w-full bg-[#08090C] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                      CC Alert Destination (Copy)
                    </label>
                    <input
                      type="email"
                      value={content.companyInfo.inquiryCcEmail || "supportkyorix@gmail.com"}
                      onChange={(e) => updateSection("companyInfo", { inquiryCcEmail: e.target.value })}
                      placeholder="supportkyorix@gmail.com"
                      className="w-full bg-[#08090C] border border-[#1E2638] focus:border-kyorix-blue rounded px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1E2638]/60">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      Urgent Federation Escalation Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={content.companyInfo.urgentContactNumber || "+91 90712 72555"}
                      onChange={(e) => updateSection("companyInfo", { urgentContactNumber: e.target.value })}
                      placeholder="+91 90712 72555"
                      className="w-full bg-[#08090C] border border-[#1E2638] focus:border-amber-400 rounded px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none"
                    />
                    <p className="text-[9px] font-mono text-gray-500">
                      Displayed in the Urgent Federation Escalation box on the post-submission confirmation screen.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      Urgent Federation Direct Email
                    </label>
                    <input
                      type="email"
                      value={content.companyInfo.urgentContactEmail || "kyorixofficial@gmail.com"}
                      onChange={(e) => updateSection("companyInfo", { urgentContactEmail: e.target.value })}
                      placeholder="kyorixofficial@gmail.com"
                      className="w-full bg-[#08090C] border border-[#1E2638] focus:border-amber-400 rounded px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none"
                    />
                    <p className="text-[9px] font-mono text-gray-500">
                      Direct escalation mailbox displayed for tournament organizers with urgent deadlines.
                    </p>
                  </div>
                </div>

                {/* Direct Google Gmail SMTP / App Password Setup */}
                <div className="pt-3 border-t border-[#1E2638]/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-kyorix-blue" />
                        <span>Direct Gmail SMTP Delivery (Guaranteed Primary Inbox)</span>
                      </span>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        Delivers directly through Google's official mail server without third-party spam delays.
                      </p>
                    </div>
                    <a
                      href="https://myaccount.google.com/apppasswords"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline shrink-0"
                    >
                      Get Google App Password ↗
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                        Gmail Account / SMTP Username
                      </label>
                      <input
                        type="email"
                        value={content.companyInfo.smtpUser || content.companyInfo.inquiryRecipientEmail || "kyorixofficial@gmail.com"}
                        onChange={(e) => {
                          updateSection("companyInfo", { smtpUser: e.target.value });
                        }}
                        placeholder="kyorixofficial@gmail.com"
                        className="w-full bg-[#08090C] border border-[#1E2638] focus:border-cyan-400 rounded px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase font-bold flex items-center justify-between">
                        <span>Google 16-Letter App Password</span>
                        <button
                          type="button"
                          onClick={() => setShowSmtpPass(!showSmtpPass)}
                          className="text-[9px] text-gray-500 hover:text-gray-300 lowercase font-mono"
                        >
                          {showSmtpPass ? "hide" : "show"}
                        </button>
                      </label>
                      <input
                        type={showSmtpPass ? "text" : "password"}
                        value={content.companyInfo.smtpPass || ""}
                        onChange={(e) => {
                          updateSection("companyInfo", { smtpPass: e.target.value });
                        }}
                        placeholder="e.g. abcd efgh ijkl mnop"
                        className="w-full bg-[#08090C] border border-[#1E2638] focus:border-cyan-400 rounded px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {emailTestResult && (
                    <div className={`p-2.5 rounded text-xs font-mono border ${
                      emailTestResult.startsWith("✅")
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}>
                      {emailTestResult}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E2638]/60">
                  <button
                    type="button"
                    disabled={testingEmail}
                    onClick={async () => {
                      setTestingEmail(true);
                      setEmailTestResult(null);
                      try {
                        const target = content.companyInfo.inquiryRecipientEmail || "kyorixofficial@gmail.com";
                        const res = await fetch("/api/enquiry/test", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            email: target,
                            smtpUser: content.companyInfo.smtpUser || target,
                            smtpPass: content.companyInfo.smtpPass || "",
                            smtpHost: content.companyInfo.smtpHost || "smtp.gmail.com",
                            smtpPort: content.companyInfo.smtpPort || 465,
                          }),
                        });
                        const json = await res.json();
                        if (json.success) {
                          setEmailTestResult(`✅ ${json.message}`);
                          showToast("Test email triggered successfully!");
                        } else {
                          setEmailTestResult(`❌ Error: ${json.error || "Failed"}`);
                          showToast("Test failed: " + (json.error || "Failed"));
                        }
                      } catch (err: any) {
                        setEmailTestResult(`❌ Network error: ${err.message}`);
                      } finally {
                        setTestingEmail(false);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161E2E] hover:bg-[#1E283D] border border-[#222E44] text-cyan-400 rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    {testingEmail ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>TESTING EMAIL PIPELINE...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>TEST EMAIL DISPATCH NOW</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={async () => {
                      const ok = await saveContent(content);
                      if (ok) showToast("Inquiry routing, urgent contacts & email settings updated!");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>SAVE ROUTING & SETTINGS</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-[#1E2638] pb-3">
                {(["ALL", "NEW", "READ", "RESPONDED"] as const).map((filter) => {
                  const count =
                    filter === "ALL"
                      ? enquiries.length
                      : enquiries.filter((e) => e.status === filter).length;
                  return (
                    <button
                      key={filter}
                      onClick={() => setEnquiryFilter(filter)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 ${
                        enquiryFilter === filter
                          ? "bg-kyorix-blue text-white"
                          : "text-gray-400 hover:text-white bg-[#0D1117] border border-[#1E2638]"
                      }`}
                    >
                      <span>{filter}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-black/40 rounded">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inquiry List */}
              {enquiries.length === 0 ? (
                <div className="p-12 text-center bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-kyorix-blue/10 border border-kyorix-blue/30 flex items-center justify-center mx-auto text-kyorix-blue">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-mono font-bold text-white uppercase">
                      No Inquiries Logged Yet
                    </h3>
                    <p className="text-xs text-gray-400 max-w-md mx-auto">
                      Inquiries submitted through the website&apos;s contact form will instantly appear here with full contact details, WhatsApp routing, and messaging.
                    </p>
                  </div>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="p-8 text-center bg-[#0D1117] border border-[#1E2638] rounded-xl text-gray-400 text-xs font-mono">
                  No inquiries match the filter &quot;{enquiryFilter}&quot;.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className={`p-5 bg-[#0D1117] border rounded-xl space-y-4 transition-all ${
                        enq.status === "NEW"
                          ? "border-kyorix-blue/50 shadow-lg shadow-kyorix-blue/5"
                          : "border-[#1E2638]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-mono font-bold text-white">
                              {enq.fullName}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                              • {enq.organization} {enq.designation && enq.designation !== "N/A" ? `(${enq.designation})` : ""}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-gray-500 mt-0.5">
                            Ticket: <span className="text-gray-400 font-bold">{enq.id}</span> • Received:{" "}
                            {new Date(enq.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded uppercase ${
                              enq.status === "NEW"
                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                                : enq.status === "RESPONDED"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : "bg-gray-500/10 text-gray-400 border border-gray-500/30"
                            }`}
                          >
                            {enq.status}
                          </span>

                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                            className="bg-[#111622] border border-[#1E2638] text-[11px] font-mono text-gray-300 rounded px-2 py-1 focus:outline-none"
                          >
                            <option value="NEW">Status: NEW</option>
                            <option value="READ">Status: READ</option>
                            <option value="RESPONDED">Status: RESPONDED</option>
                          </select>

                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Details Pills */}
                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 bg-[#111622] border border-[#1E2638] rounded text-kyorix-blue">
                          Product: <strong>{enq.interest}</strong>
                        </span>
                        <span className="px-2.5 py-1 bg-[#111622] border border-[#1E2638] rounded text-gray-300">
                          Discipline: <strong>{enq.sport}</strong>
                        </span>
                        <span className="px-2.5 py-1 bg-[#111622] border border-[#1E2638] rounded text-gray-300">
                          Country: <strong>{enq.country}</strong>
                        </span>
                        <span className="px-2.5 py-1 bg-[#111622] border border-[#1E2638] rounded text-gray-400">
                          Desk: {enq.category}
                        </span>
                      </div>

                      {/* Message Box */}
                      <div className="p-3.5 bg-[#111622] border border-[#1E2638] rounded-lg text-xs font-mono text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {enq.message}
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#1E2638]/50">
                        <a
                          href={`mailto:${enq.email}?subject=Kyorix%20Sport%20Inquiry%20Response%20[${enq.id}]&body=Dear%20${encodeURIComponent(enq.fullName)},%0D%0A%0D%0AThank%20you%20for%20contacting%20Kyorix%20Sport%20regarding%20${encodeURIComponent(enq.interest)}.%0D%0A%0D%0A`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email ({enq.email})</span>
                        </a>

                        {enq.phone && enq.phone !== "N/A" && (
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-mono font-bold uppercase transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp ({enq.phone})</span>
                          </a>
                        )}

                        <span className="text-[11px] font-mono text-gray-500 ml-auto">
                          Direct Contact: <span className="text-gray-300">{enq.email}</span> {enq.phone !== "N/A" ? `• ${enq.phone}` : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 01: HERO SECTION */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 01</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    HERO SECTION EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Customize the primary headline, supporting text, CTA buttons, and brand logo.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("hero")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Badge Tagline (Top Pill)
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) => updateSection("hero", { badge: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlinePrefix}
                    onChange={(e) => updateSection("hero", { headlinePrefix: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Headline Middle
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineMiddle}
                    onChange={(e) => updateSection("hero", { headlineMiddle: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Headline Accent
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineAccent}
                    onChange={(e) => updateSection("hero", { headlineAccent: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Supporting Subheadline
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={(e) => updateSection("hero", { subheadline: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg">
                  <div className="text-[11px] font-mono font-bold text-kyorix-blue uppercase">Primary CTA Button</div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-gray-400 uppercase">Button Text</label>
                    <input
                      type="text"
                      value={content.hero.ctaPrimaryText}
                      onChange={(e) => updateSection("hero", { ctaPrimaryText: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-gray-400 uppercase">Target Link</label>
                    <input
                      type="text"
                      value={content.hero.ctaPrimaryLink}
                      onChange={(e) => updateSection("hero", { ctaPrimaryLink: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg">
                  <div className="text-[11px] font-mono font-bold text-kyorix-blue uppercase">Secondary CTA Button</div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-gray-400 uppercase">Button Text</label>
                    <input
                      type="text"
                      value={content.hero.ctaSecondaryText}
                      onChange={(e) => updateSection("hero", { ctaSecondaryText: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-gray-400 uppercase">Target Link</label>
                    <input
                      type="text"
                      value={content.hero.ctaSecondaryLink}
                      onChange={(e) => updateSection("hero", { ctaSecondaryLink: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Banner Background Image Manager */}
              <div className="bg-[#0D1117] border border-[#1E2638] rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-kyorix-blue" />
                    <span>Hero Banner Background Image</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                    Full-Width Cinematic Banner
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  This image is displayed as the atmospheric background behind the hero headline with sports-tech gradient overlays for high text contrast.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-64 h-36 bg-[#08090C] rounded-lg border border-[#1E2638] relative overflow-hidden shrink-0 shadow-lg">
                    {content.hero.backgroundImageSrc ? (
                      <>
                        <Image
                          src={content.hero.backgroundImageSrc}
                          alt="Hero Background Banner"
                          fill
                          className="object-cover object-center opacity-70"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                          LIVE PREVIEW
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-mono">
                        Dark Abstract Grid Only
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-grow w-full">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                        Background Image Path or External URL:
                      </label>
                      <input
                        type="text"
                        value={content.hero.backgroundImageSrc || ""}
                        onChange={(e) => updateSection("hero", { backgroundImageSrc: e.target.value })}
                        placeholder="/images/arena-competition.jpg or https://..."
                        className="w-full bg-[#08090C] border border-[#1E2638] focus:border-kyorix-blue rounded p-2.5 text-xs font-mono text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => triggerImageUpload("hero", "backgroundImageSrc")}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Banner Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateSection("hero", { backgroundImageSrc: "/images/arena-competition.jpg" })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111622] hover:bg-[#161D2C] text-gray-300 hover:text-white border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      >
                        <span>Preset: Arena Stadium</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateSection("hero", { backgroundImageSrc: "/images/referee-court.jpg" })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111622] hover:bg-[#161D2C] text-gray-300 hover:text-white border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      >
                        <span>Preset: Referee Court</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: COMPANY MISSION */}
          {activeTab === "companyMission" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 02</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    COMPANY MISSION EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the company mission narrative, three operational pillars, and arena photo banner.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("companyMission")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Section Label
                  </label>
                  <input
                    type="text"
                    value={content.companyMission.label}
                    onChange={(e) => updateSection("companyMission", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={content.companyMission.title}
                    onChange={(e) => updateSection("companyMission", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Mission Description
                </label>
                <textarea
                  rows={2}
                  value={content.companyMission.description}
                  onChange={(e) => updateSection("companyMission", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* 3 Blocks */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase">
                  Three Foundation Blocks (01 SCORING, 02 COMPETITION, 03 EVENTS)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Block 1 */}
                  <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">BLOCK 01</span>
                      <input
                        type="text"
                        value={content.companyMission.block1Number}
                        onChange={(e) => updateSection("companyMission", { block1Number: e.target.value })}
                        className="w-12 bg-[#08090C] border border-[#1E2638] rounded p-1 text-center text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Title</label>
                      <input
                        type="text"
                        value={content.companyMission.block1Title}
                        onChange={(e) => updateSection("companyMission", { block1Title: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Description</label>
                      <textarea
                        rows={4}
                        value={content.companyMission.block1Desc}
                        onChange={(e) => updateSection("companyMission", { block1Desc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  {/* Block 2 */}
                  <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">BLOCK 02</span>
                      <input
                        type="text"
                        value={content.companyMission.block2Number}
                        onChange={(e) => updateSection("companyMission", { block2Number: e.target.value })}
                        className="w-12 bg-[#08090C] border border-[#1E2638] rounded p-1 text-center text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Title</label>
                      <input
                        type="text"
                        value={content.companyMission.block2Title}
                        onChange={(e) => updateSection("companyMission", { block2Title: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Description</label>
                      <textarea
                        rows={4}
                        value={content.companyMission.block2Desc}
                        onChange={(e) => updateSection("companyMission", { block2Desc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  {/* Block 3 */}
                  <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">BLOCK 03</span>
                      <input
                        type="text"
                        value={content.companyMission.block3Number}
                        onChange={(e) => updateSection("companyMission", { block3Number: e.target.value })}
                        className="w-12 bg-[#08090C] border border-[#1E2638] rounded p-1 text-center text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Title</label>
                      <input
                        type="text"
                        value={content.companyMission.block3Title}
                        onChange={(e) => updateSection("companyMission", { block3Title: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Description</label>
                      <textarea
                        rows={4}
                        value={content.companyMission.block3Desc}
                        onChange={(e) => updateSection("companyMission", { block3Desc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arena Photo Banner */}
              <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-kyorix-blue" />
                  <span>Sports Photography Arena Banner</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-48 h-32 rounded-lg border border-[#1E2638] overflow-hidden relative shrink-0">
                    <Image
                      src={content.companyMission.bannerImageSrc}
                      alt="Banner Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-3 flex-grow w-full">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">Image Path / URL:</label>
                      <input
                        type="text"
                        value={content.companyMission.bannerImageSrc}
                        onChange={(e) => updateSection("companyMission", { bannerImageSrc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerImageUpload("companyMission", "bannerImageSrc")}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-kyorix-blue/10 hover:bg-kyorix-blue/20 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold uppercase transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner Photo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Banner Tag</label>
                    <input
                      type="text"
                      value={content.companyMission.bannerTag}
                      onChange={(e) => updateSection("companyMission", { bannerTag: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Banner Caption</label>
                    <input
                      type="text"
                      value={content.companyMission.bannerCaption}
                      onChange={(e) => updateSection("companyMission", { bannerCaption: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Banner Subtext</label>
                    <input
                      type="text"
                      value={content.companyMission.bannerSubtext}
                      onChange={(e) => updateSection("companyMission", { bannerSubtext: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 03: PRODUCT ARCHITECTURE */}
          {activeTab === "productEcosystem" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 03</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    PRODUCT ARCHITECTURE EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the headline and 3 core platform product cards (Score, Bracket, TEMS).
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("productEcosystem")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.productEcosystem.label}
                    onChange={(e) => updateSection("productEcosystem", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.productEcosystem.title}
                    onChange={(e) => updateSection("productEcosystem", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Description</label>
                <textarea
                  rows={2}
                  value={content.productEcosystem.description}
                  onChange={(e) => updateSection("productEcosystem", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Product Cards with Add / Delete */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>{content.productEcosystem.products?.length || 0} Core Platform Products</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const prods = content.productEcosystem.products || [];
                      const nextNum = String(prods.length + 1).padStart(2, "0");
                      const newProds = [
                        ...prods,
                        {
                          id: `product-${Date.now()}`,
                          number: nextNum,
                          name: "NEW PLATFORM PRODUCT",
                          subtitle: "Platform Subtitle",
                          description: "Description of the product capability and target sports operations.",
                          href: "/products",
                          features: ["Real-time Sync", "Multi-user Access", "Cloud Telemetry"],
                        },
                      ];
                      updateSection("productEcosystem", { products: newProds });
                      showToast("Added new product.");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>

                {(content.productEcosystem.products || []).map((prod, pIdx) => (
                  <div key={prod.id || pIdx} className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-kyorix-blue/10 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold">
                          0{pIdx + 1}
                        </span>
                        <span className="text-sm font-mono font-bold text-white uppercase">{prod.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500">ID: {prod.id}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newProds = content.productEcosystem.products.filter((_, i) => i !== pIdx);
                            updateSection("productEcosystem", { products: newProds });
                            showToast(`Deleted product ${prod.name}.`);
                          }}
                          className="p-1.5 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-gray-400 uppercase">Product Name</label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => {
                            const newProds = [...content.productEcosystem.products];
                            newProds[pIdx] = { ...newProds[pIdx], name: e.target.value };
                            updateSection("productEcosystem", { products: newProds });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-gray-400 uppercase">Subtitle</label>
                        <input
                          type="text"
                          value={prod.subtitle}
                          onChange={(e) => {
                            const newProds = [...content.productEcosystem.products];
                            newProds[pIdx] = { ...newProds[pIdx], subtitle: e.target.value };
                            updateSection("productEcosystem", { products: newProds });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={prod.description}
                        onChange={(e) => {
                          const newProds = [...content.productEcosystem.products];
                          newProds[pIdx] = { ...newProds[pIdx], description: e.target.value };
                          updateSection("productEcosystem", { products: newProds });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>

                    {/* Features checklist comma-separated */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">
                        Core Capabilities (One per line)
                      </label>
                      <textarea
                        rows={4}
                        value={(prod.features || []).join("\n")}
                        onChange={(e) => {
                          const newProds = [...content.productEcosystem.products];
                          newProds[pIdx] = {
                            ...newProds[pIdx],
                            features: e.target.value.split("\n").filter((f) => f.trim().length > 0),
                          };
                          updateSection("productEcosystem", { products: newProds });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 04: COMPETITION WORKFLOW */}
          {activeTab === "competitionLifecycle" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 04</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    COMPETITION WORKFLOW EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the 11-stage tournament progression timeline (Registration through to Podium Archive).
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("competitionLifecycle")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.competitionLifecycle.label}
                    onChange={(e) => updateSection("competitionLifecycle", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.competitionLifecycle.title}
                    onChange={(e) => updateSection("competitionLifecycle", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Description</label>
                <textarea
                  rows={2}
                  value={content.competitionLifecycle.description}
                  onChange={(e) => updateSection("competitionLifecycle", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Dynamic Stages list with Add / Delete / Move Reorder */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-kyorix-blue" />
                      <span>{content.competitionLifecycle.stages?.length || 0} Competition Stages</span>
                    </h3>
                    <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                      Move any stage to any place using the drag handle, ▲/▼ arrows, or position numbers.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Restore 11 Baseline Stages button */}
                    <button
                      type="button"
                      onClick={handleRestoreBaselineStages}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-kyorix-blue border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      title="Restore all 11 stages including SEEDING and DRAWS"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-kyorix-blue" />
                      <span>Restore 11 Stages</span>
                    </button>

                    {/* Quick Clean Empty button */}
                    <button
                      type="button"
                      onClick={() => {
                        const cleaned = (content.competitionLifecycle.stages || [])
                          .filter((st) => st.name && st.name.trim().length > 0)
                          .map((st, i) => ({
                            ...st,
                            step: String(i + 1).padStart(2, "0"),
                          }));
                        updateSection("competitionLifecycle", { stages: cleaned });
                        showToast("Removed empty stages & renumbered.");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1E2638] text-gray-300 hover:text-amber-300 border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      title="Delete any stages where the name has been left blank"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Delete Blank</span>
                    </button>

                    {/* Add Stage button */}
                    <button
                      type="button"
                      onClick={() => {
                        const currentStages = content.competitionLifecycle.stages || [];
                        const nextStep = String(currentStages.length + 1).padStart(2, "0");
                        const newStages = [
                          ...currentStages,
                          { step: nextStep, name: "NEW STAGE", desc: "Stage operational description" },
                        ];
                        updateSection("competitionLifecycle", { stages: newStages });
                        showToast("New stage added! Use ▲ or position selector to move it to any place.");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stage</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(content.competitionLifecycle.stages || []).map((stage, idx) => {
                    const totalStages = content.competitionLifecycle.stages?.length || 1;
                    const isDragging = draggedStageIdx === idx;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => {
                          setDraggedStageIdx(idx);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedStageIdx !== null && draggedStageIdx !== idx) {
                            moveStage(draggedStageIdx, idx);
                            setDraggedStageIdx(null);
                          }
                        }}
                        className={`p-3.5 bg-[#0D1117] border ${
                          isDragging
                            ? "border-kyorix-blue bg-kyorix-blue/10 opacity-60"
                            : "border-[#1E2638] hover:border-[#2A364F]"
                        } rounded-lg space-y-2.5 transition-all group`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Drag Reorder Handle */}
                          <div
                            className="p-1 text-gray-500 hover:text-kyorix-blue cursor-grab active:cursor-grabbing shrink-0"
                            title="Drag to reorder to any place"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          {/* Move Up / Down Buttons */}
                          <div className="flex flex-col shrink-0 bg-[#08090C] border border-[#1E2638] rounded overflow-hidden">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveStage(idx, idx - 1)}
                              className="p-1 text-gray-400 hover:text-white hover:bg-[#1E2638] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === totalStages - 1}
                              onClick={() => moveStage(idx, idx + 1)}
                              className="p-1 text-gray-400 hover:text-white hover:bg-[#1E2638] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors border-t border-[#1E2638]"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick Position Select */}
                          <select
                            value={idx + 1}
                            onChange={(e) => {
                              const targetPos = parseInt(e.target.value, 10) - 1;
                              moveStage(idx, targetPos);
                            }}
                            className="bg-[#111622] border border-kyorix-blue/40 text-kyorix-blue font-mono font-bold text-xs rounded px-1.5 py-1.5 shrink-0 focus:outline-none focus:border-kyorix-blue cursor-pointer"
                            title="Move to specific position number"
                          >
                            {(content.competitionLifecycle.stages || []).map((_, p) => (
                              <option key={p} value={p + 1}>
                                Pos {String(p + 1).padStart(2, "0")}
                              </option>
                            ))}
                          </select>

                          {/* Stage Name */}
                          <input
                            type="text"
                            value={stage.name}
                            placeholder="Stage Name (e.g. SEEDING)"
                            onChange={(e) => {
                              const newStages = [...content.competitionLifecycle.stages];
                              newStages[idx] = { ...newStages[idx], name: e.target.value };
                              updateSection("competitionLifecycle", { stages: newStages });
                            }}
                            className="w-full bg-[#08090C] border border-[#1E2638] focus:border-kyorix-blue rounded p-1.5 text-xs font-mono font-bold text-white uppercase"
                          />

                          {/* Delete Stage */}
                          <button
                            type="button"
                            onClick={() => {
                              const newStages = content.competitionLifecycle.stages
                                .filter((_, i) => i !== idx)
                                .map((st, i) => ({
                                  ...st,
                                  step: String(i + 1).padStart(2, "0"),
                                }));
                              updateSection("competitionLifecycle", { stages: newStages });
                              showToast(`Deleted stage ${stage.step || idx + 1}.`);
                            }}
                            className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 rounded transition-colors shrink-0 flex items-center justify-center shadow-sm"
                            title={`Delete Stage ${stage.step || idx + 1}`}
                            aria-label={`Delete Stage ${stage.step || idx + 1}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={stage.desc}
                          onChange={(e) => {
                            const newStages = [...content.competitionLifecycle.stages];
                            newStages[idx] = { ...newStages[idx], desc: e.target.value };
                            updateSection("competitionLifecycle", { stages: newStages });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] focus:border-kyorix-blue rounded p-1.5 text-[11px] font-mono text-gray-300"
                          placeholder="Stage description (e.g. Rankings & separation rules)"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 05: KYORIX SCORE */}
          {activeTab === "scoreProduct" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 05</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    KYORIX SCORE EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Customize scoring platform presentation, HD software screenshot, and feature points.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("scoreProduct")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.scoreProduct.label}
                    onChange={(e) => updateSection("scoreProduct", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.scoreProduct.title}
                    onChange={(e) => updateSection("scoreProduct", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={content.scoreProduct.description}
                  onChange={(e) => updateSection("scoreProduct", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Photo Upload and Frame Configuration */}
              <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-kyorix-blue" />
                  <span>Kyorix Score HD Software Screenshot</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-56 h-36 rounded-lg border border-[#1E2638] overflow-hidden relative shrink-0 bg-black">
                    <Image
                      src={content.scoreProduct.imageSrc}
                      alt="Kyorix Score Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-3 flex-grow w-full">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">Image Path / URL:</label>
                      <input
                        type="text"
                        value={content.scoreProduct.imageSrc}
                        onChange={(e) => updateSection("scoreProduct", { imageSrc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => triggerImageUpload("scoreProduct", "imageSrc")}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-kyorix-blue/10 hover:bg-kyorix-blue/20 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold uppercase transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Score HD Image</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSection("scoreProduct", { imageSrc: "/images/products/score.png" })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#08090C] hover:bg-[#151C2A] text-gray-400 hover:text-white border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      >
                        <span>Restore HD Asset</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Frame Header Title</label>
                    <input
                      type="text"
                      value={content.scoreProduct.imageTitle}
                      onChange={(e) => updateSection("scoreProduct", { imageTitle: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Frame Subtitle</label>
                    <input
                      type="text"
                      value={content.scoreProduct.imageSubtitle}
                      onChange={(e) => updateSection("scoreProduct", { imageSubtitle: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Key Technical Capabilities */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">Key Technical Capabilities</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newFeats = [
                        ...(content.scoreProduct.features || []),
                        { title: "New Scoring Capability", description: "Technical capability description." },
                      ];
                      updateSection("scoreProduct", { features: newFeats });
                      showToast("Added new scoring capability.");
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-kyorix-blue/10 hover:bg-kyorix-blue/20 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Capability</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.scoreProduct.features || []).map((feat, idx) => (
                    <div key={idx} className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => {
                            const newFeats = [...content.scoreProduct.features];
                            newFeats[idx] = { ...newFeats[idx], title: e.target.value };
                            updateSection("scoreProduct", { features: newFeats });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono font-bold text-white"
                          placeholder="Feature Title"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeats = content.scoreProduct.features.filter((_, i) => i !== idx);
                            updateSection("scoreProduct", { features: newFeats });
                            showToast("Deleted capability.");
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors shrink-0"
                          title="Delete Capability"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={feat.description}
                        onChange={(e) => {
                          const newFeats = [...content.scoreProduct.features];
                          newFeats[idx] = { ...newFeats[idx], description: e.target.value };
                          updateSection("scoreProduct", { features: newFeats });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-gray-300"
                        placeholder="Feature Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 06: KYORIX BRACKET */}
          {activeTab === "bracketProduct" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 06</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    KYORIX BRACKET EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Customize tournament bracket engine presentation, HD software screenshot, and feature points.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("bracketProduct")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.bracketProduct.label}
                    onChange={(e) => updateSection("bracketProduct", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.bracketProduct.title}
                    onChange={(e) => updateSection("bracketProduct", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={content.bracketProduct.description}
                  onChange={(e) => updateSection("bracketProduct", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Photo Upload and Frame Configuration */}
              <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-kyorix-blue" />
                  <span>Kyorix Bracket HD Software Screenshot</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-56 h-36 rounded-lg border border-[#1E2638] overflow-hidden relative shrink-0 bg-black">
                    <Image
                      src={content.bracketProduct.imageSrc}
                      alt="Kyorix Bracket Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-3 flex-grow w-full">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">Image Path / URL:</label>
                      <input
                        type="text"
                        value={content.bracketProduct.imageSrc}
                        onChange={(e) => updateSection("bracketProduct", { imageSrc: e.target.value })}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => triggerImageUpload("bracketProduct", "imageSrc")}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-kyorix-blue/10 hover:bg-kyorix-blue/20 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold uppercase transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Bracket HD Image</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSection("bracketProduct", { imageSrc: "/images/products/bracket.png" })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#08090C] hover:bg-[#151C2A] text-gray-400 hover:text-white border border-[#1E2638] rounded text-xs font-mono transition-colors"
                      >
                        <span>Restore HD Asset</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Frame Header Title</label>
                    <input
                      type="text"
                      value={content.bracketProduct.imageTitle}
                      onChange={(e) => updateSection("bracketProduct", { imageTitle: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Frame Subtitle</label>
                    <input
                      type="text"
                      value={content.bracketProduct.imageSubtitle}
                      onChange={(e) => updateSection("bracketProduct", { imageSubtitle: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Key Technical Capabilities */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">Key Technical Capabilities</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newFeats = [
                        ...(content.bracketProduct.features || []),
                        { title: "New Bracket Capability", description: "Technical capability description." },
                      ];
                      updateSection("bracketProduct", { features: newFeats });
                      showToast("Added new bracket capability.");
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-kyorix-blue/10 hover:bg-kyorix-blue/20 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Capability</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.bracketProduct.features || []).map((feat, idx) => (
                    <div key={idx} className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => {
                            const newFeats = [...content.bracketProduct.features];
                            newFeats[idx] = { ...newFeats[idx], title: e.target.value };
                            updateSection("bracketProduct", { features: newFeats });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono font-bold text-white"
                          placeholder="Feature Title"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeats = content.bracketProduct.features.filter((_, i) => i !== idx);
                            updateSection("bracketProduct", { features: newFeats });
                            showToast("Deleted capability.");
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors shrink-0"
                          title="Delete Capability"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={feat.description}
                        onChange={(e) => {
                          const newFeats = [...content.bracketProduct.features];
                          newFeats[idx] = { ...newFeats[idx], description: e.target.value };
                          updateSection("bracketProduct", { features: newFeats });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-gray-300"
                        placeholder="Feature Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 07: KYORIX TEMS */}
          {activeTab === "temsProduct" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 07</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    KYORIX TEMS EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the 8 operational modules: Tournaments, Registration, ID Card Generation, Weigh-In, Draws, Scoring System, Live Results, and Live Certificates.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("temsProduct")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.temsProduct.label}
                    onChange={(e) => updateSection("temsProduct", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.temsProduct.title}
                    onChange={(e) => updateSection("temsProduct", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Subtitle</label>
                <textarea
                  rows={2}
                  value={content.temsProduct.subtitle}
                  onChange={(e) => updateSection("temsProduct", { subtitle: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Operational Modules with Add / Delete */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">
                    {content.temsProduct.modules?.length || 0} Operational Modules
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const currentMods = content.temsProduct.modules || [];
                      const nextNum = String(currentMods.length + 1).padStart(2, "0");
                      const newMods = [
                        ...currentMods,
                        {
                          id: `module-${Date.now()}`,
                          number: nextNum,
                          title: "NEW OPERATIONAL MODULE",
                          tag: "Event Capability",
                          desc: "Module operational description and workflow features.",
                          capabilities: ["Capability point 1", "Capability point 2", "Capability point 3"],
                        },
                      ];
                      updateSection("temsProduct", { modules: newMods });
                      showToast("Added new TEMS module.");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Module</span>
                  </button>
                </div>

                {(content.temsProduct.modules || []).map((mod, mIdx) => (
                  <div key={mod.id || mIdx} className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-kyorix-blue/10 text-kyorix-blue border border-kyorix-blue/30 rounded text-xs font-mono font-bold">
                          {mod.number || `0${mIdx + 1}`}
                        </span>
                        <span className="text-sm font-mono font-bold text-white uppercase">{mod.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500">ID: {mod.id}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newMods = content.temsProduct.modules.filter((_, i) => i !== mIdx);
                            updateSection("temsProduct", { modules: newMods });
                            showToast(`Deleted module ${mod.title}.`);
                          }}
                          className="p-1.5 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded transition-colors"
                          title="Delete Module"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-gray-400 uppercase">Module Title</label>
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => {
                            const newMods = [...content.temsProduct.modules];
                            newMods[mIdx] = { ...newMods[mIdx], title: e.target.value };
                            updateSection("temsProduct", { modules: newMods });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-gray-400 uppercase">Category Tag</label>
                        <input
                          type="text"
                          value={mod.tag}
                          onChange={(e) => {
                            const newMods = [...content.temsProduct.modules];
                            newMods[mIdx] = { ...newMods[mIdx], tag: e.target.value };
                            updateSection("temsProduct", { modules: newMods });
                          }}
                          className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">Module Description</label>
                      <textarea
                        rows={2}
                        value={mod.desc}
                        onChange={(e) => {
                          const newMods = [...content.temsProduct.modules];
                          newMods[mIdx] = { ...newMods[mIdx], desc: e.target.value };
                          updateSection("temsProduct", { modules: newMods });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-gray-400 uppercase">
                        Operational Capabilities (One per line)
                      </label>
                      <textarea
                        rows={4}
                        value={(mod.capabilities || []).join("\n")}
                        onChange={(e) => {
                          const newMods = [...content.temsProduct.modules];
                          newMods[mIdx] = {
                            ...newMods[mIdx],
                            capabilities: e.target.value.split("\n").filter((c) => c.trim().length > 0),
                          };
                          updateSection("temsProduct", { modules: newMods });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 08: ENGINEERING ARCHITECTURE */}
          {activeTab === "technologyPreview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 08</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    ENGINEERING ARCHITECTURE EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Customize the 4 core architecture pillars: Sub-Millisecond Telemetry, Distributed Mat Architecture, Audit-Logged Match State, and WT Compliance.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("technologyPreview")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.technologyPreview.label}
                    onChange={(e) => updateSection("technologyPreview", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.technologyPreview.title}
                    onChange={(e) => updateSection("technologyPreview", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={content.technologyPreview.description}
                  onChange={(e) => updateSection("technologyPreview", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Architecture Pillars with Add / Delete */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">
                    {content.technologyPreview.pillars?.length || 0} Architecture Pillars
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPillars = content.technologyPreview.pillars || [];
                      const newPillars = [
                        ...currentPillars,
                        {
                          tag: "Architecture",
                          title: "NEW ENGINEERING PILLAR",
                          desc: "Engineering architecture description and specifications.",
                        },
                      ];
                      updateSection("technologyPreview", { pillars: newPillars });
                      showToast("Added new architecture pillar.");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pillar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.technologyPreview.pillars || []).map((pil, pIdx) => (
                    <div key={pIdx} className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-kyorix-blue uppercase font-bold">PILLAR 0{pIdx + 1}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={pil.tag}
                            onChange={(e) => {
                              const newPillars = [...content.technologyPreview.pillars];
                              newPillars[pIdx] = { ...newPillars[pIdx], tag: e.target.value };
                              updateSection("technologyPreview", { pillars: newPillars });
                            }}
                            className="w-24 bg-[#08090C] border border-[#1E2638] rounded p-1 text-[10px] font-mono text-kyorix-blue text-center uppercase"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPillars = content.technologyPreview.pillars.filter((_, i) => i !== pIdx);
                              updateSection("technologyPreview", { pillars: newPillars });
                              showToast(`Deleted pillar 0${pIdx + 1}.`);
                            }}
                            className="p-1 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded transition-colors"
                            title="Delete Pillar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={pil.title}
                        onChange={(e) => {
                          const newPillars = [...content.technologyPreview.pillars];
                          newPillars[pIdx] = { ...newPillars[pIdx], title: e.target.value };
                          updateSection("technologyPreview", { pillars: newPillars });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono font-bold text-white uppercase"
                      />
                      <textarea
                        rows={3}
                        value={pil.desc}
                        onChange={(e) => {
                          const newPillars = [...content.technologyPreview.pillars];
                          newPillars[pIdx] = { ...newPillars[pIdx], desc: e.target.value };
                          updateSection("technologyPreview", { pillars: newPillars });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 09: STAKEHOLDER CONNECTIVITY */}
          {activeTab === "sportingEcosystem" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 09</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    STAKEHOLDER CONNECTIVITY EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the central platform hub and 7 stakeholder groups (Athletes, Coaches, Clubs, Referees & Judges, Organizers, Federations, Spectators).
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("sportingEcosystem")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.sportingEcosystem.label}
                    onChange={(e) => updateSection("sportingEcosystem", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.sportingEcosystem.title}
                    onChange={(e) => updateSection("sportingEcosystem", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={content.sportingEcosystem.description}
                  onChange={(e) => updateSection("sportingEcosystem", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Central Hub Config */}
              <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-3">
                <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">Central Platform Hub Visual</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Hub Tag</label>
                    <input
                      type="text"
                      value={content.sportingEcosystem.hubTag}
                      onChange={(e) => updateSection("sportingEcosystem", { hubTag: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Hub Title</label>
                    <input
                      type="text"
                      value={content.sportingEcosystem.hubTitle}
                      onChange={(e) => updateSection("sportingEcosystem", { hubTitle: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">Hub Description</label>
                  <input
                    type="text"
                    value={content.sportingEcosystem.hubDescription}
                    onChange={(e) => updateSection("sportingEcosystem", { hubDescription: e.target.value })}
                    className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Stakeholders with Add / Delete */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">
                    {content.sportingEcosystem.stakeholders?.length || 0} Stakeholder Groups
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSh = content.sportingEcosystem.stakeholders || [];
                      const newSh = [
                        ...currentSh,
                        {
                          role: "NEW STAKEHOLDER ROLE",
                          description: "Role responsibilities and platform integration touchpoints.",
                        },
                      ];
                      updateSection("sportingEcosystem", { stakeholders: newSh });
                      showToast("Added new stakeholder role.");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stakeholder</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.sportingEcosystem.stakeholders || []).map((sh, sIdx) => (
                    <div key={sIdx} className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-kyorix-blue uppercase font-bold">ROLE 0{sIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSh = content.sportingEcosystem.stakeholders.filter((_, i) => i !== sIdx);
                            updateSection("sportingEcosystem", { stakeholders: newSh });
                            showToast(`Deleted role 0${sIdx + 1}.`);
                          }}
                          className="p-1 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded transition-colors"
                          title="Delete Role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={sh.role}
                        onChange={(e) => {
                          const newStakeholders = [...content.sportingEcosystem.stakeholders];
                          newStakeholders[sIdx] = { ...newStakeholders[sIdx], role: e.target.value };
                          updateSection("sportingEcosystem", { stakeholders: newStakeholders });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono font-bold text-white uppercase"
                      />
                      <textarea
                        rows={3}
                        value={sh.description}
                        onChange={(e) => {
                          const newStakeholders = [...content.sportingEcosystem.stakeholders];
                          newStakeholders[sIdx] = { ...newStakeholders[sIdx], description: e.target.value };
                          updateSection("sportingEcosystem", { stakeholders: newStakeholders });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: TECHNOLOGY EVOLUTION */}
          {activeTab === "futureRoadmap" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 10</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    TECHNOLOGY EVOLUTION EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the strategic 4-stage future evolution roadmap.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("futureRoadmap")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Section Label</label>
                  <input
                    type="text"
                    value={content.futureRoadmap.label}
                    onChange={(e) => updateSection("futureRoadmap", { label: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.futureRoadmap.title}
                    onChange={(e) => updateSection("futureRoadmap", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={content.futureRoadmap.description}
                  onChange={(e) => updateSection("futureRoadmap", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Progression Stages with Add / Delete */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-sm font-mono font-bold text-white uppercase">
                    {content.futureRoadmap.stages?.length || 0} Progression Stages
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const currentStages = content.futureRoadmap.stages || [];
                      const nextNum = String(currentStages.length + 1).padStart(2, "0");
                      const newStages = [
                        ...currentStages,
                        {
                          status: "PLANNED",
                          badge: "Target Horizon",
                          title: "NEW PROGRESSION STAGE",
                          desc: "Strategic roadmap milestone description.",
                          active: false,
                        },
                      ];
                      updateSection("futureRoadmap", { stages: newStages });
                      showToast("Added new roadmap stage.");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white rounded text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-kyorix-blue/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stage</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.futureRoadmap.stages || []).map((stage, sIdx) => (
                    <div key={sIdx} className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-kyorix-blue uppercase font-bold">STAGE 0{sIdx + 1}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <label className="text-[10px] font-mono text-gray-400">Operational?</label>
                            <input
                              type="checkbox"
                              checked={stage.active}
                              onChange={(e) => {
                                const newStages = [...content.futureRoadmap.stages];
                                newStages[sIdx] = { ...newStages[sIdx], active: e.target.checked };
                                updateSection("futureRoadmap", { stages: newStages });
                              }}
                              className="rounded bg-[#08090C] border-[#1E2638]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newStages = content.futureRoadmap.stages.filter((_, i) => i !== sIdx);
                              updateSection("futureRoadmap", { stages: newStages });
                              showToast(`Deleted stage 0${sIdx + 1}.`);
                            }}
                            className="p-1 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded transition-colors"
                            title="Delete Stage"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={stage.status}
                          onChange={(e) => {
                            const newStages = [...content.futureRoadmap.stages];
                            newStages[sIdx] = { ...newStages[sIdx], status: e.target.value };
                            updateSection("futureRoadmap", { stages: newStages });
                          }}
                          className="bg-[#08090C] border border-[#1E2638] rounded p-1.5 text-xs font-mono text-white uppercase"
                          placeholder="Status Tag"
                        />
                        <input
                          type="text"
                          value={stage.badge}
                          onChange={(e) => {
                            const newStages = [...content.futureRoadmap.stages];
                            newStages[sIdx] = { ...newStages[sIdx], badge: e.target.value };
                            updateSection("futureRoadmap", { stages: newStages });
                          }}
                          className="bg-[#08090C] border border-[#1E2638] rounded p-1.5 text-xs font-mono text-kyorix-blue uppercase"
                          placeholder="Sub-Badge"
                        />
                      </div>

                      <input
                        type="text"
                        value={stage.title}
                        onChange={(e) => {
                          const newStages = [...content.futureRoadmap.stages];
                          newStages[sIdx] = { ...newStages[sIdx], title: e.target.value };
                          updateSection("futureRoadmap", { stages: newStages });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono font-bold text-white uppercase"
                        placeholder="Stage Title"
                      />

                      <textarea
                        rows={3}
                        value={stage.desc}
                        onChange={(e) => {
                          const newStages = [...content.futureRoadmap.stages];
                          newStages[sIdx] = { ...newStages[sIdx], desc: e.target.value };
                          updateSection("futureRoadmap", { stages: newStages });
                        }}
                        className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-gray-300"
                        placeholder="Stage Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: CALL TO ACTION */}
          {activeTab === "finalCTA" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 11</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    CALL TO ACTION EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configure the bottom conversion banner, action buttons, and regulatory statement.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("finalCTA")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Badge Tagline</label>
                  <input
                    type="text"
                    value={content.finalCTA.badge}
                    onChange={(e) => updateSection("finalCTA", { badge: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">Main Title</label>
                  <input
                    type="text"
                    value={content.finalCTA.title}
                    onChange={(e) => updateSection("finalCTA", { title: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={content.finalCTA.description}
                  onChange={(e) => updateSection("finalCTA", { description: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                  <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">Primary Button</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Button Text</label>
                    <input
                      type="text"
                      value={content.finalCTA.primaryButtonText}
                      onChange={(e) => updateSection("finalCTA", { primaryButtonText: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Target Link</label>
                    <input
                      type="text"
                      value={content.finalCTA.primaryButtonLink}
                      onChange={(e) => updateSection("finalCTA", { primaryButtonLink: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#0D1117] border border-[#1E2638] rounded-lg space-y-3">
                  <span className="text-xs font-mono font-bold text-kyorix-blue uppercase">Secondary Button</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Button Text</label>
                    <input
                      type="text"
                      value={content.finalCTA.secondaryButtonText}
                      onChange={(e) => updateSection("finalCTA", { secondaryButtonText: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Target Link</label>
                    <input
                      type="text"
                      value={content.finalCTA.secondaryButtonLink}
                      onChange={(e) => updateSection("finalCTA", { secondaryButtonLink: e.target.value })}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Footer Legal / Compliance Statement
                </label>
                <input
                  type="text"
                  value={content.finalCTA.footerNote}
                  onChange={(e) => updateSection("finalCTA", { footerNote: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 12: COMPANY & LEGAL */}
          {activeTab === "companyInfo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 12</div>
                  <h2 className="text-xl font-mono font-bold text-white uppercase">
                    COMPANY & LEGAL CONTACTS EDITOR
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Update corporate registrations, compliance identifiers, and communication channels.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection("companyInfo")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  All placeholder identifiers must be replaced with authorized corporate credentials before production launch.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Legal Company Name
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.name}
                    onChange={(e) => updateSection("companyInfo", { name: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.tagline}
                    onChange={(e) => updateSection("companyInfo", { tagline: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Contact Email
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.email}
                    onChange={(e) => updateSection("companyInfo", { email: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Support Email
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.supportEmail}
                    onChange={(e) => updateSection("companyInfo", { supportEmail: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#08090C] border border-[#1E2638] rounded-lg">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                    Inquiry Alert Destination (To)
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.inquiryRecipientEmail || "kyorixofficial@gmail.com"}
                    onChange={(e) => updateSection("companyInfo", { inquiryRecipientEmail: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-cyan-300 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Direct mailbox where website inquiries and demo requests are delivered.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-kyorix-blue uppercase">
                    Inquiry Alert CC Email
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.inquiryCcEmail || "supportkyorix@gmail.com"}
                    onChange={(e) => updateSection("companyInfo", { inquiryCcEmail: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-kyorix-blue rounded p-3 text-xs font-mono text-cyan-300 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Secondary mailbox CC'd on every inquiry alert.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#08090C] border border-[#1E2638] rounded-lg">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                    Urgent Federation Escalation Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.urgentContactNumber || "+91 90712 72555"}
                    onChange={(e) => updateSection("companyInfo", { urgentContactNumber: e.target.value })}
                    placeholder="+91 90712 72555"
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-amber-400 rounded p-3 text-xs font-mono text-amber-300 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Displayed in the Urgent Federation Escalation box on the post-submission confirmation screen.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                    Urgent Federation Direct Email
                  </label>
                  <input
                    type="email"
                    value={content.companyInfo.urgentContactEmail || "kyorixofficial@gmail.com"}
                    onChange={(e) => updateSection("companyInfo", { urgentContactEmail: e.target.value })}
                    placeholder="kyorixofficial@gmail.com"
                    className="w-full bg-[#0D1117] border border-[#1E2638] focus:border-amber-400 rounded p-3 text-xs font-mono text-amber-300 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 font-mono">
                    Direct escalation mailbox displayed to tournament organizers with pressing deadlines.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.phone}
                    onChange={(e) => updateSection("companyInfo", { phone: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    Corporate Status
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.status}
                    onChange={(e) => updateSection("companyInfo", { status: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    CIN Identifier
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.cin}
                    onChange={(e) => updateSection("companyInfo", { cin: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    GSTIN Registration
                  </label>
                  <input
                    type="text"
                    value={content.companyInfo.gstin}
                    onChange={(e) => updateSection("companyInfo", { gstin: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Registered Office Address
                </label>
                <textarea
                  rows={2}
                  value={content.companyInfo.address}
                  onChange={(e) => updateSection("companyInfo", { address: e.target.value })}
                  className="w-full bg-[#0D1117] border border-[#1E2638] rounded p-3 text-xs font-mono text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 13: PORTAL SETTINGS & BACKUP */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <div className="border-b border-[#1E2638] pb-4">
                <div className="text-[11px] font-mono text-kyorix-blue font-bold uppercase">SECTION 13</div>
                <h2 className="text-xl font-mono font-bold text-white uppercase">
                  PORTAL SETTINGS & DATA BACKUP
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Manage security passcode, export or import JSON backups, and system reset controls.
                </p>
              </div>

              {/* Security PIN Change */}
              <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4 text-kyorix-blue" />
                  <span>Update Admin Passcode (PIN)</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Default PIN: <code className="text-kyorix-blue font-bold">kyorix2026</code>. Changing this requires entering the new PIN on subsequent logins.
                </p>
                <form onSubmit={handleChangePin} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="password"
                      placeholder="New Security PIN"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm PIN"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full bg-[#08090C] border border-[#1E2638] rounded p-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase rounded transition-colors"
                    >
                      Update Passcode
                    </button>
                  </div>
                </form>
              </div>

              {/* Data Backup & Restore */}
              <div className="p-6 bg-[#0D1117] border border-[#1E2638] rounded-xl space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                  <Download className="w-4 h-4 text-kyorix-blue" />
                  <span>Export / Import Website Data</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Download a full snapshot of all configured text, images, and content to keep as a safe backup or migrate between systems.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={handleExportBackup}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111622] hover:bg-[#1E2638] text-white border border-[#1E2638] rounded text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <Download className="w-4 h-4 text-kyorix-blue" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111622] hover:bg-[#1E2638] text-white border border-[#1E2638] rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Restore From Backup JSON</span>
                    <input
                      type="file"
                      accept="application/json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone: Full Factory Reset */}
              <div className="p-6 bg-red-950/20 border border-red-900/40 rounded-xl space-y-3">
                <h3 className="text-sm font-mono font-bold text-red-400 uppercase flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Factory Reset</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Reset the entire website to baseline defaults. All customizations across all sections will be overwritten.
                </p>
                <button
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded text-xs font-mono font-bold uppercase transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
