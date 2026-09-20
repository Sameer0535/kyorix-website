# Design System & Visual Guidelines
## Kyorix Sport Technology Corporate Platform

**Brand Identity:** KYORIX SPORT TECHNOLOGY PRIVATE LIMITED  
**Core Motto:** "COMPETE. CONNECT. ELEVATE."  
**Visual Aesthetic:** Institutional Precision, High-Contrast Dark Luxury, Olympic Mat-Side Authority  

---

## 1. Brand Essence & Visual Language
Kyorix designs infrastructure for high-stakes, sanctioned competitive sports. The visual language conveys sub-millisecond precision, referee reliability, and deterministic tournament progression.

### Core Visual Principles:
1. **Precision & Engineering Rigor:** Sharp borders, technical monospace labels (`font-mono`), subtle grid patterns, and technical docket badges.
2. **High-Contrast Dark Canvas:** Deep obsidian backgrounds (`#08090C`, `#0D1117`) that replicate real-world stadium arena displays and mat-side scoreboards.
3. **Intentional Accents (No AI Neon):** High-tech cyan (`#00F0FF`) and athletic blue (`#0066FF`) are used exclusively for focus states, call-to-actions, and live telemetry badges. Cheesy yellow neon glows are strictly avoided.

---

## 2. Color Palette & Token System

### 2.1 Primary Surface Tokens
| Token Name | HEX Code | Tailwind Equivalent | Role & Application |
| :--- | :--- | :--- | :--- |
| **Canvas Deep Black** | `#08090C` | `bg-[#08090C]` | Global page body background, root canvas. |
| **Surface Card Obsidian** | `#0D1117` | `bg-[#0D1117]` | Primary container, cards, modals, and input fields. |
| **Surface Raised Navy** | `#111622` | `bg-[#111622]` | Nested cards, pill badges, and elevated modules. |
| **Surface Active Dark** | `#161B22` | `bg-[#161B22]` | Hover states, active tabs, and highlighted rows. |

### 2.2 Structural Border Tokens
| Token Name | HEX Code | Tailwind Equivalent | Role & Application |
| :--- | :--- | :--- | :--- |
| **Border Subtle Base** | `#1E2638` | `border-[#1E2638]` | Default card borders, dividers, and input borders. |
| **Border Focus Cyan** | `#00F0FF` | `border-cyan-400` | Active input focus rings and live scoring badges. |
| **Border Active Blue** | `#0066FF` | `border-kyorix-blue` | Selected tab outlines and primary cards. |

### 2.3 Brand Accent & Functional Tokens
| Token Name | HEX Code | Tailwind Equivalent | Role & Application |
| :--- | :--- | :--- | :--- |
| **Kyorix Electric Cyan** | `#00F0FF` | `text-cyan-400` | Primary accent, technical badges, telemetry metrics. |
| **Kyorix Brand Blue** | `#0066FF` | `bg-kyorix-blue` | Primary CTA buttons, active navigation indicators. |
| **Alert Amber** | `#F59E0B` | `text-amber-400` | Urgent federation escalation, warnings, placeholders. |
| **Success Emerald** | `#10B981` | `text-emerald-400` | Verified delivery, live status, zero-db confirmations. |

---

## 3. Typography Hierarchy

### 3.1 Typeface Families
- **Primary Body Font:** Sans-serif (Inter / System UI) — Clean, modern, highly legible at small sizes.
- **Technical & Metric Font:** Monospace (JetBrains Mono / Consolas) — Used for product numbers, timestamps, ticket references, and operational labels.

### 3.2 Type Scale
| Level | Font Family | Size | Weight | Tracking | Case | Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline** | Sans | `3.5rem` (56px) | 800 (Extrabold) | Tight (`-0.02em`) | Uppercase | Hero Section main title |
| **Section Header** | Sans | `2rem` (32px) | 700 (Bold) | Tight (`-0.01em`) | Uppercase | Product Architecture, Mission |
| **Card Header** | Sans | `1.25rem` (20px) | 600 (Semibold) | Normal | Title Case | Feature cards, modal titles |
| **Technical Badge** | Mono | `0.6875rem` (11px)| 700 (Bold) | Widest (`0.15em`) | Uppercase | `01 • SCORING`, `VERIFIED LIVE` |
| **Body Standard** | Sans | `0.875rem` (14px) | 400 (Regular) | Normal | Sentence | Explanatory paragraphs, descriptions |
| **Meta / Small** | Mono | `0.75rem` (12px)  | 500 (Medium) | Wide (`0.05em`)  | Normal | Timestamps, contact info, footer |

---

## 4. Component Design Patterns

### 4.1 Urgent Federation Escalation Box
Replaces artificial AI glow templates with an authentic, institutional corporate contact component:
- **Container:** `bg-[#0D1117] border border-[#1E2638] rounded-xl p-6`
- **Icon:** `w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400`
- **Call-To-Action Grid (3 Columns):**
  1. **Direct Call:** `tel:+919071272555` with phone icon, bold formatted phone number.
  2. **Direct WhatsApp Desk:** `https://wa.me/919071272555` with WhatsApp icon and pre-filled inquiry text.
  3. **Direct Escalation Email:** `mailto:kyorixofficial@gmail.com` with mail icon.

### 4.2 Interactive Form Controls
- **Standard Inputs:**
  ```css
  bg-[#0D1117] border border-[#1E2638] focus:border-cyan-400 rounded-lg px-4 py-3 text-sm text-white font-sans focus:outline-none transition-colors
  ```
- **Technical Dropdowns:**
  ```css
  bg-[#111622] border border-[#1E2638] text-xs font-mono text-gray-300 rounded px-3 py-2 focus:outline-none
  ```

### 4.3 Action Buttons
- **Primary CTA:**
  ```css
  px-6 py-3.5 bg-kyorix-blue hover:bg-kyorix-blue-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-kyorix-blue/20
  ```
- **Secondary Ghost:**
  ```css
  px-6 py-3.5 bg-[#111622] hover:bg-[#161F30] border border-[#1E2638] text-gray-300 hover:text-white rounded-lg text-xs font-mono font-bold uppercase transition-colors
  ```

---

## 5. Responsive Grid & Breakpoints
- **Mobile (< 640px):** Single-column stacked layouts, full-width touch-friendly buttons (minimum 44px tap target height).
- **Tablet (640px – 1024px):** 2-column balanced grid, sticky header with backdrop blur.
- **Desktop (≥ 1024px):** 12-column asymmetric grid layouts (e.g. 5-column corporate details sidebar alongside 7-column main contact form).
