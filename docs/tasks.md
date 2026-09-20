# Tasks & Implementation Roadmap
## Kyorix Sport Technology Corporate Platform

**Project Tracker:** `Sameer0535/kyorix-website`  
**Current Sprint Focus:** Institutional Production Readiness & Verified Inquiry Dispatch  
**Last Updated:** September 2026  

---

## 1. Completed Milestones (Verified & Deployed)

### 1.1 Architecture & Core Foundation
- [x] **Next.js 15 App Router Setup:** Initialized full project with React 19, TypeScript, and Tailwind CSS.
- [x] **Static Page Prerendering:** Generated 23 optimized static pages (`/`, `/about`, `/contact`, `/products/*`, `/admin`, legal policies, `robots.txt`, `sitemap.xml`).
- [x] **Responsive Navigation & Footer:** Implemented sticky blur header and comprehensive corporate footer with institutional disclaimers.

### 1.2 Administrative Content Management System (`/admin`)
- [x] **PIN Gateway Security:** Secure PIN authentication (`kyorix2026`) with `sessionStorage` session token handling.
- [x] **Global Keyboard Shortcut:** Hidden admin entry via `Ctrl+Shift+A` or `Cmd+Shift+A`.
- [x] **Bidirectional MongoDB Atlas Sync:** Live synchronization to `site_content` collection (`key: "active_content"`) with timestamp reconciliation (`_lastSaved`).
- [x] **Media Asset Manager:** Image upload engine (`/api/upload` & `/api/images/[id]`) with local fallback and mat-side banner controls.

### 1.3 Inquiry Pipeline & Deliverability Architecture
- [x] **Zero-Database Policy Implementation:** Removed database and disk logging of customer form submissions (`enquiries.json`) to enforce strict customer data privacy.
- [x] **Direct Google SMTP Integration:** Configured Nodemailer transport using Google's official SMTP (`smtp.gmail.com:465`) with Google App Password authentication.
- [x] **Admin SMTP Diagnostic Probe:** Added `/api/enquiry/test` route and interactive **"TEST EMAIL DISPATCH NOW"** button in `/admin`.
- [x] **End-to-End Live Verification:** Verified Google SMTP authentication and delivered live test inquiry `KX-2026-TCLB` directly to `kyorixofficial@gmail.com` Primary Inbox.

### 1.4 UI Refinements & Anti-AI Directive
- [x] **Removed Mock AI Dockets:** Eradicated simulated corporate letterheads, fake CIN dockets, and government number headers from public forms.
- [x] **Removed Artificial Progress Pipelines:** Eliminated the 3-stage progress timeline and turnaround footer labels.
- [x] **Urgent Federation Escalation Box:** Replaced artificial neon yellow glow borders with sleek, authentic corporate styling (`bg-[#0D1117] border-[#1E2638]`) with direct call (`+91 90712 72555`), WhatsApp desk, and email.
- [x] **Admin Database Purge Tool:** Fixed the 404 delete bug in `/api/enquiry?id=all` and successfully wiped all 8 legacy test records from MongoDB Atlas (`{ success: true, data: [] }`).

---

## 2. Active & Immediate Operational Tasks

- [ ] **Configure Official Corporate Identifiers in Admin:**
  - Update Registered Office Address placeholder in Section 12.
  - Enter official Corporate Identification Number (CIN) and GSTIN registration upon government incorporation certificate receipt.
- [ ] **Production Domain DNS & Mail Records:**
  - Verify SPF (`v=spf1 include:_spf.google.com ~all`) and DKIM TXT records for `kyorixsport.in` on domain registrar DNS.
- [ ] **Cross-Device Mobile QA:**
  - Test modal overlay behaviors and viewport rendering on older Safari versions (iOS 15-16).

---

## 3. Product Roadmap & Future Feature Sprints

### Sprint 3: Multi-Sport Scoring Adaptations (Q4 2026)
- [ ] **Karate WKF Point Engine:** Adapt scoring panel for Ippon, Waza-Ari, and Yuko with Senshu rule tracking.
- [ ] **Judo Ippon / Waza-Ari Clock:** Implement dual timer with Osaekomi hold timers and penalty triggers.
- [ ] **Fencing Bout Management:** Sub-millisecond foil, epee, and sabre lamp signal integration.

### Sprint 4: Public Live Arena Telemetry (Q1 2027)
- [ ] **Public Bracket Live Viewer:** Real-time WebSockets feed broadcasting tournament knockout progression to spectator phones.
- [ ] **Broadcast Graphic Overlays:** WebRTC clean feed output for tournament live-streaming producers (Chyron / OBS integration).
- [ ] **Federation Analytics Dashboard:** Historical athlete head-to-head match statistics and ranking points calculations.
