# Project Memory & Architectural Decision Records

> **Note:** This file is aliased to [memory.md](file:///c:/Users/Sameer/.gemini/antigravity/scratch/Kyorix%20Wbst/memory.md) for typo tolerance (`memeory.md` ↔ `memory.md`).

Please refer to the primary document:
👉 **[memory.md](file:///c:/Users/Sameer/.gemini/antigravity/scratch/Kyorix%20Wbst/memory.md)**

---

## Quick Reference Summary:
- **Zero-Database Policy:** Customer submissions are never saved to MongoDB or disk logs. They are dispatched directly via authenticated Google SMTP (`smtp.gmail.com:465`).
- **Destination Mailbox:** `kyorixofficial@gmail.com`
- **Urgent Contact Desk:** `+91 90712 72555`
- **Admin Entry:** `https://kyorixsport.in/admin` (PIN: `kyorix2026`, Shortcut: `Ctrl+Shift+A`)
- **CMS Mongo Key:** `site_content` collection, `{ key: "active_content" }`
