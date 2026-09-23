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
### 1.5 Mobile & Multi-Device Responsiveness (Complete & Verified)
- [x] **Viewport Meta Configuration:** Exported explicit Next.js 15 `Viewport` metadata (`width=device-width, initialScale=1, maximumScale=5`) to prevent mobile browsers from defaulting to unscaled desktop widths.
- [x] **Root Overflow Safeguards:** Added `overflow-x: hidden` and `max-width: 100vw` across `html`, `body`, and `<main>` via `AppShell.tsx` to eliminate unwanted horizontal scrolling and white borders.
- [x] **Company Foundation Grid Fix:** Removed rigid inline `gridTemplateColumns: repeat(3, ...)` in `CompanyIntro.tsx` that crushed cards on small phones; replaced with fluid responsive `grid-cols-1 md:grid-cols-3`.
- [x] **Navbar Mobile Drawer & Touch Enhancements:** Added dynamic top offset, body scroll locking when menu is active, touch target sizing, and auto-close upon navigation link tap.
- [x] **Hero Typography Fluid Scaling:** Implemented responsive typography (`text-3xl sm:text-5xl md:text-6xl lg:text-7xl break-words`) and button stacking for screens down to 320px width.
- [x] **Interactive Tournament & Scoring Tools:** Added mobile swipe indicator and touch scrolling to `InteractiveBracketViewer.tsx`, responsive timer & round layout to `InteractiveScoreSimulator.tsx`, and horizontal module tab bar to `TEMSConsoleMockup.tsx`.
- [x] **Admin Mobile Navigation:** Replaced 14 stacked vertical section buttons with a sleek, horizontal scrollable tab strip on screens `< md` for instant editor access.
- [x] **Production Verification:** Compiled all 23 routes cleanly with zero TypeScript errors (`npm run build`) and pushed to `main`.

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
