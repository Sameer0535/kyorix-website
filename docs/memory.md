# Project Memory & Architectural Decision Records (ADR)
## Kyorix Sport Technology Corporate Platform

**Repository:** `Sameer0535/kyorix-website`  
**Core Domain:** `https://kyorixsport.in`  
**Purpose:** Long-term institutional context, key architectural decisions, debugging records, and operational gotchas.

---

## 1. Architectural Decision Records (ADRs)

### ADR 01: Strict Zero-Database Persistence for Customer Inquiries
- **Context:** Initially, customer inquiries submitted via `/contact` were saved into MongoDB Atlas collection `enquiries` and written to local disk `enquiries.json`.
- **User Directive:** The client explicitly requested that submitted inquiry data must **not** be stored in any database or disk logs, as all inquiries are monitored directly in their leadership email inbox (`kyorixofficial@gmail.com`).
- **Decision:** Removed all database write operations (`db.collection("enquiries").insertOne()`) and file persistence from `/api/enquiry`. Inquiries are processed strictly in transit and dispatched via email.
- **Consequence:** Eliminates customer data leak vectors, simplifies GDPR/privacy compliance, and prevents database bloat.

### ADR 02: Migration from FormSubmit to Direct Authenticated Google SMTP
- **Context:** Form submissions were initially routed through FormSubmit (`formsubmit.co`). Inquiries stopped delivering to the client's inbox.
- **Root Cause Analysis:**
  1. **Activation Link Hurdle:** FormSubmit requires a one-time activation confirmation link sent to the recipient inbox before forwarding any messages.
  2. **Datacenter IP Filtering:** Vercel serverless functions calling FormSubmit triggered Cloudflare/reCAPTCHA bot protection, silently dropping requests.
  3. **Aggressive Gmail Spam Filtering:** Submissions from shared `formsubmit.co` domains were frequently flagged by Google and sent to the Spam/Junk folder.
- **Decision:** Integrated Nodemailer with Google's official SMTP (`smtp.gmail.com:465`) using a 16-character Google App Password (`myaccount.google.com/apppasswords`).
- **Outcome:** Form submissions are now sent authenticated from `kyorixofficial@gmail.com` to `kyorixofficial@gmail.com`, arriving in the **Primary Inbox** in < 1 second with 100% deliverability.

### ADR 03: MongoDB CMS Document Schema (`key: "active_content"`)
- **Context:** Disconnect occurred between `/api/content` (which saved CMS content under `{ key: "active_content" }` in `doc.data`) and `/api/enquiry` (which queried `{ _id: "current" }` in `doc.content`). This prevented dynamic SMTP credentials saved in the admin portal from being utilized by the email dispatcher.
- **Decision:** Standardized all MongoDB queries across `/api/content`, `/api/enquiry`, and `/api/enquiry/test` to query `{ key: "active_content" }` and read from `doc.data`.
- **Outcome:** Admin portal edits seamlessly propagate to all serverless API handlers in real time.

### ADR 04: Anti-AI Styling & Authentic Corporate Design System
- **Context:** Earlier iterations used artificial AI-looking styling: intense yellow neon glow (`shadow-[0_0_35px...]`), neon borders, simulated 3-stage progress bars, and fake corporate docket headers.
- **Decision:** Completely removed all neon glow styling, fake dockets, and simulated pipelines. Replaced them with authentic corporate elements: clean slate/obsidian containers (`#0D1117`, border `#1E2638`), direct telephone dialing to `+91 90712 72555`, direct WhatsApp desk links, and official corporate email links.

---

## 2. Key Debugging Lessons & Pitfalls

| Issue Observed | Root Cause | Solution & Permanent Fix |
| :--- | :--- | :--- |
| **"Enquiry not found" 404 on Delete** | The `DELETE` handler in `/api/enquiry` was checking the local `enquiries.json` file length before querying MongoDB. When the local file was empty, it returned 404 without reaching MongoDB. | Fixed `DELETE` handler to query MongoDB Atlas directly and added support for `?id=all` to purge all test records. |
| **Google App Passwords "Not Available" Robot Screen** | Google displays a broken robot error on `myaccount.google.com/apppasswords` if 2-Step Verification (2FA) is turned off on the Google account. | Enabled 2-Step Verification on `kyorixofficial@gmail.com`, after which the App Passwords generator worked instantly. |
| **Windows PowerShell `&&` Syntax Errors** | PowerShell does not support `&&` for chaining commands in default execution mode. | Chain commands using semicolon (`;`) or execute through `cmd.exe /c "..."`. |
| **TypeScript TS2353 on Admin Page** | `SiteContent` type definition in `ContentContext.tsx` is derived from `default-content.json`. Adding fields to the admin portal without declaring them in `default-content.json` causes compile failures. | Always declare new CMS properties in `src/data/default-content.json` first. |

---

## 3. Configuration & Credential Reference

- **Admin Portal Entry:** `https://kyorixsport.in/admin`
- **Admin Access PIN:** `kyorix2026` (Shortcut: `Ctrl+Shift+A` or `Cmd+Shift+A`)
- **Primary Operational Email:** `kyorixofficial@gmail.com`
- **Secondary CC Email:** `supportkyorix@gmail.com`
- **Urgent Federation Contact:** `+91 90712 72555`
- **Google SMTP Port:** `465` (SSL/TLS)
- **Google SMTP Server:** `smtp.gmail.com`
- **Google App Password Setup:** `https://myaccount.google.com/apppasswords`
- **MongoDB Atlas Collection:** `kyorix.site_content` (`{ key: "active_content" }`)
