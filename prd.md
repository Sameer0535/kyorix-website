# Product Requirements Document (PRD)
## Kyorix Sport Technology Corporate Platform & Tournament Ecosystem

**Document Version:** 1.0.0  
**Status:** Active / Production  
**Target URL:** [https://kyorixsport.in](https://kyorixsport.in)  
**Organization:** Kyorix Sport Technology Private Limited  
**Industry:** Competitive Sports Technology, Electronic Scoring & Tournament Infrastructure  

---

## 1. Executive Summary & Vision
Kyorix Sport Technology Private Limited develops intelligent hardware and software infrastructure designed to modernize sanctioned competitive sporting events. Starting with Taekwondo and expanding into Olympic combat and timed sports (Karate, Judo, Fencing), Kyorix eliminates manual scoring friction, tournament draw inaccuracies, and delayed court operations.

The web platform serves three distinct functions:
1. **Corporate & Commercial Showcase:** Establish institutional authority for sports federations, Olympic associations, and tournament directors.
2. **Interactive Platform Demonstration Desk:** Direct demo request pipeline routing organizers directly to commercial engineering teams.
3. **Live Content Management System (CMS):** A proprietary, authenticated administrative portal (`/admin`) that enables non-technical leadership to update live hero graphics, marketing statements, and operational contact routing in real time.

---

## 2. Target Audience & Stakeholders

| Stakeholder Persona | Needs & Pain Points | Platform Solution |
| :--- | :--- | :--- |
| **Federation Executives & Presidents** | Needs certified accuracy, compliance with World Taekwondo standards, and brand integrity. | Clear corporate positioning, transparent governance data, and direct federation escalation channels. |
| **Tournament Directors & Organizers** | Delays in knockout brackets, manual score sheet discrepancies, high arena hardware costs. | Modular presentation of KYORIX SCORE, KYORIX BRACKET, and KYORIX TEMS with immediate quote/demo requests. |
| **Chief Arbiters & Referees** | Latency in point registration, dispute arbitration reviews, complex penalty tracking. | Live telemetry previews, sub-millisecond keypad specifications, and dual-display mat layouts. |
| **Internal Kyorix Leadership** | Rapid updates to banner imagery, partner announcements, and contact routing without code deployments. | PIN-authenticated CMS (`/admin`) with MongoDB Atlas live sync. |

---

## 3. Product Ecosystem Architecture

### 3.1 Platform 01: KYORIX SCORE (Electronic Competition Scoring)
- **Purpose:** Sub-millisecond digital point registration and arena mat control.
- **Key Capabilities:**
  - Wireless referee panel integration (head, body, punch, penalty triggers).
  - High-visibility arena display boards for spectators and coaches.
  - Video review integration with timestamped frame synchronization.
  - Automated round timers, golden point periods, and sanction deductions.

### 3.2 Platform 02: KYORIX BRACKET (Tournament Progression Engine)
- **Purpose:** Deterministic, automated tournament draw generation and knockout tree tracking.
- **Key Capabilities:**
  - Automated seeding and balanced BYE distribution adhering to federation seeding guidelines.
  - Live bracket progression synchronized across courts in real time.
  - Multi-mat match queuing to minimize athlete downtime between rounds.
  - Public online bracket viewing for coaches, athletes, and spectators.

### 3.3 Platform 03: KYORIX TEMS (Tournament Event Management System)
- **Purpose:** Unified event lifecycle management from athlete accreditation to final podium certification.
- **Key Capabilities:**
  - Digital weigh-in stations with barcode/RFID verification.
  - Medical clearance tracking and age/weight division validation.
  - Official certificate and federation report generation with QR code validation.
  - Multi-court arena scheduling and centralized referee assignment.

---

## 4. Key Functional Requirements

### 4.1 Public Front-End Experience
- **Hero & Mission Statements:** High-impact dynamic hero banner with editable headlines and customizable background imagery.
- **Product Walkthroughs:** Dedicated pages for `/products/score`, `/products/bracket`, and `/products/tems`.
- **Ecosystem Flow:** Interactive multi-step tournament progression showcase from registration to medal ceremony.
- **Technology & Security Pages:** Institutional trust pages detailing hardware protocols, data privacy, and legal terms.

### 4.2 Demo Request & Contact Pipeline (`/contact`)
- **User Inputs:** Full Name, Organization/Federation, Designation, Email, Phone, Country, Discipline (Taekwondo/Karate/Judo), Platform Interest (KYORIX ESS, etc.), and Requirements Message.
- **Submission Architecture (Zero-Database Policy):**
  - **No Database Persistence:** Inquiries are **never** stored in MongoDB or written to local server disk logs to protect customer confidentiality and prevent data leaks.
  - **Direct Authenticated Google SMTP:** Submissions are packaged into high-priority multipart emails and dispatched directly via Google's official SMTP servers (`smtp.gmail.com:465`) using a secure 16-character App Password.
  - **Destination Mailbox:** Delivered instantly to `kyorixofficial@gmail.com` and CC'd to `supportkyorix@gmail.com`.
- **Post-Submission Confirmation UI:**
  - Professional corporate receipt confirmation (no artificial AI styling, no robotic docket numbers).
  - Clear customer reassurance: *"Our Team Will Get Back to You Soon"*.
  - **Urgent Federation Escalation Box:** Direct call link to `+91 90712 72555`, direct WhatsApp desk link, and corporate mailto fallback for organizers facing immediate tournament deadlines.

### 4.3 Administrative Portal (`/admin`)
- **Authentication:** Single-factor secure PIN gateway (`kyorix2026`) with session persistence in `sessionStorage` and keyboard shortcut shortcut (`Ctrl+Shift+A` or `Cmd+Shift+A`).
- **Live Content Synchronization:**
  - Bidirectional MongoDB Atlas sync (`site_content` collection, key: `active_content`).
  - Timestamp reconciliation (`_lastSaved`) ensuring newer administrative edits seamlessly update serverless instances.
- **Email & Inquiry Routing Hub:**
  - Control destination emails (`inquiryRecipientEmail`, `inquiryCcEmail`).
  - Configure Urgent Federation contact details (`urgentContactNumber`, `urgentContactEmail`).
  - Direct Gmail SMTP Delivery credentials setup (`smtpUser`, `smtpPass`).
  - One-click **"TEST EMAIL DISPATCH NOW"** diagnostic probe validating server connectivity.
  - One-click **"WIPE ALL STORED RECORDS FROM DATABASE"** to permanently purge legacy test records.
- **Media Asset Management:**
  - Direct image upload engine (`/api/upload`) storing compressed base64 images in MongoDB with URL fallback.
  - Hero banner image upload with mat-side background preview.

---

## 5. Non-Functional Requirements & Performance Standards

| Requirement | Metric / Standard | Validation Method |
| :--- | :--- | :--- |
| **Performance** | Lighthouse score ≥ 95 on Desktop, First Contentful Paint < 1.0s. | Next.js Static Site Generation (`output: export` ready, 23/23 static pages). |
| **Reliability** | Zero third-party drop rate for customer inquiries. | Google authenticated SMTP via Nodemailer with FormSubmit fallback. |
| **Security** | Zero-DB customer data footprint; TLS 1.3 encryption across all routes. | MongoDB queries confirm `enquiries` collection is empty (`[]`). |
| **Responsive Design** | 100% viewport adaptation from 360px mobile screens to 4K arena displays. | Tailwind responsive grid architecture (`sm`, `md`, `lg`, `xl`). |
| **SEO & Crawlability** | Semantic HTML5 structure, OpenGraph metadata, structured JSON-LD data, dynamic `sitemap.xml`, and `robots.txt`. | Validated on Google Search Console & Next.js Metadata API. |
