# Engineering Rules & Guidelines
## Kyorix Sport Technology Platform

**Scope:** All developers, contributors, and automated coding assistants working on `kyorix-website`.  
**Strict Compliance Required:** Violations of these rules will result in broken builds, privacy breaches, or styling degradation.

---

## 1. Privacy & Data Handling Rules (NON-NEGOTIABLE)

1. **Strict Zero-Database Policy for Inquiries:**
   - Customer submissions made via the `/contact` form **MUST NEVER** be saved to any database (MongoDB, SQL, Firebase, etc.) or written to local server logs (`enquiries.json`).
   - Customer inquiries exist **exclusively in transit** to be delivered to authorized leadership email inboxes (`kyorixofficial@gmail.com`).
   - Any pull request or commit that attempts to re-introduce `db.collection("enquiries").insertOne()` or `saveEnquiries(data)` without explicit authorization is strictly prohibited.

2. **Credential Sanitization:**
   - All SMTP passwords (e.g. Google 16-letter App Passwords) must be cleaned using `.replace(/\s+/g, "")` before passing to authentication transports.
   - Never commit plain-text credentials into `.env.example` or repository files.

---

## 2. Design & Aesthetics Rules (Anti-AI Directive)

1. **No Artificial / "AI-Generated" Visual Cliches:**
   - **NO neon yellow outer glow effects** (e.g., avoid `shadow-[0_0_35px_rgba(245,158,11,0.3)]`).
   - **NO artificial futuristic borders** with high-saturation neon gradients that resemble generic AI templates.
   - **NO fake docket numbers or bureaucratic corporate mock headers** (e.g., do not generate fake corporate CIN headers or government registration dockets on user confirmation receipts).
   - **NO artificial simulated processing pipelines** (e.g., do not render fake 3-stage progress bars like "STAGE 1: RECEIVED -> STAGE 2: PROCESSING -> STAGE 3: RESPONDED" when no actual queue exists).

2. **Authentic Corporate Luxury Aesthetics:**
   - Maintain a sleek, institutional sports tech aesthetic: deep dark surfaces (`#08090C`, `#0D1117`), refined borders (`#1E2638`), crisp high-tech cyan accents (`#00F0FF`), and corporate brand blue (`#0066FF`).
   - Keep forms, alerts, and thank-you states grounded, authoritative, and clean.

3. **Urgent Escalation Pattern:**
   - In all confirmation views, provide clean corporate contact options:
     - Direct telephone dialing: `tel:+919071272555`
     - Direct WhatsApp desk: `https://wa.me/919071272555`
     - Direct corporate email: `mailto:kyorixofficial@gmail.com`

---

## 3. Architecture & Code Quality Rules

1. **Framework & Language Standards:**
   - Next.js App Router conventions must be strictly preserved (`src/app/*`).
   - All components with React hooks (`useState`, `useEffect`, `useContext`, `useCallback`) must declare `"use client"` at the very top (Line 1).
   - Strict TypeScript: No `any` types on core models. All changes must pass `npx tsc --noEmit` with zero errors.

2. **CMS Content Synchronization Rule:**
   - Any newly introduced field in the CMS must be declared in both:
     1. `src/data/default-content.json` (defines the `SiteContent` TypeScript type).
     2. `src/data/site-content.json` (active fallback data file).
   - Ensure MongoDB queries targeting active content query `{ key: "active_content" }` and read from `doc.data` (never query non-existent keys like `{ _id: "current" }`).

3. **Serverless Filesystem Resilience:**
   - Never assume the filesystem is writable. Vercel and AWS Lambda run on read-only filesystems.
   - All file writes (cache fallbacks, temporary exports) must wrap paths with `/tmp/` and handle exceptions gracefully with `try/catch`.

---

## 4. Environment & Deployment Protocol

1. **Local Build Verification Before Pushing:**
   - Before committing or pushing code to `main`, always execute a full production build verification:
     ```bash
     cmd.exe /c "npm run build"
     ```
   - Confirm that all 23 static pages generate without build errors.

2. **Windows PowerShell Execution Rules:**
   - On Windows PowerShell, command chaining with `&&` causes parser syntax errors. Always use semicolon (`;`) or run via `cmd.exe /c "..."`.
   - Never use `cd` commands in tool calls. Specify the working directory via the `Cwd` parameter.

3. **Git Commit Discipline:**
   - Write clear, imperative commit messages describing the architectural change (e.g., `Fix email pipeline with direct SMTP support, test probe route, and clean escalation UI`).
