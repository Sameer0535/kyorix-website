export const COMPANY_INFO = {
  name: "KYORIX SPORT TECHNOLOGY PRIVATE LIMITED",
  brand: "KYORIX",
  tagline: "COMPETE. CONNECT. ELEVATE.",
  headline: "TECHNOLOGY FOR COMPETITIVE SPORT.",
  subheadline: "Kyorix builds intelligent technology for sports scoring, competition management and live sporting events.",
  shortDescription: "A sports technology company developing software and technology infrastructure for competitive sports.",
  copyrightYear: 2026,
  
  // Legal & Contact Placeholders explicitly labeled per instructions
  placeholders: {
    email: "contact@kyorixsport.in",
    supportEmail: "support@kyorixsport.in",
    phone: "[PLACEHOLDER - CONFIGURE BEFORE LAUNCH: +91 00000 00000]",
    address: "[PLACEHOLDER - CONFIGURE BEFORE LAUNCH: Registered Office Address, India]",
    cin: "[PLACEHOLDER - CONFIGURE BEFORE LAUNCH: CIN-U72900XX2026PTC000000]",
    gstin: "[PLACEHOLDER - CONFIGURE BEFORE LAUNCH: GSTIN-00AAAAA0000A1Z5]",
  }
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      {
        name: "Kyorix Score",
        tagline: "Electronic Competition Scoring",
        href: "/products/score",
      },
      {
        name: "Kyorix Bracket",
        tagline: "Competition Draw & Bracket Management",
        href: "/products/bracket",
      },
      {
        name: "Kyorix TEMS",
        tagline: "Complete Event Management System",
        href: "/products/tems",
      },
    ],
  },
  { name: "Technology", href: "/technology" },
  { name: "About Kyorix", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export const PRODUCTS = [
  {
    id: "score",
    name: "KYORIX SCORE",
    subtitle: "Electronic Competition Scoring",
    description: "A digital scoring platform designed for fast, reliable and connected sporting competitions.",
    href: "/products/score",
    features: [
      "Real-time scoring",
      "Match control",
      "Referee operations",
      "Judge inputs",
      "Match history",
      "Live display",
      "Hardware integration",
    ],
  },
  {
    id: "bracket",
    name: "KYORIX BRACKET",
    subtitle: "Competition Draw & Bracket Management",
    description: "Generate, manage and operate tournament brackets with an integrated competition workflow.",
    href: "/products/bracket",
    features: [
      "Category management",
      "Seeding",
      "Draw generation",
      "BYE calculation",
      "Knockout brackets",
      "Match assignment",
      "Bracket locking",
      "Live updates",
    ],
  },
  {
    id: "tems",
    name: "KYORIX TEMS",
    subtitle: "Complete Event Management System",
    description: "Manage the competition lifecycle from athlete registration and verification to match operations and final results.",
    href: "/products/tems",
    features: [
      "Organizations & Clubs",
      "Athletes & Coaches",
      "Officials & Documents",
      "Events & Categories",
      "Registrations & Weigh-In",
      "Eligibility & Seeding",
      "Scheduling & Court Assignment",
      "Match Operations & Results",
    ],
  },
];

export const COMPETITION_LIFECYCLE = [
  { step: "01", name: "REGISTRATION", desc: "Online entry & participant data ingestion" },
  { step: "02", name: "VERIFICATION", desc: "Identity, credentials & document checks" },
  { step: "03", name: "WEIGH-IN", desc: "Official weight division certification" },
  { step: "04", name: "ELIGIBILITY", desc: "Category rules & validation clearance" },
  { step: "05", name: "SEEDING", desc: "Ranked entry placement & rules" },
  { step: "06", name: "DRAW", desc: "Randomized & governed match draw" },
  { step: "07", name: "BRACKET", desc: "Tournament progression generation" },
  { step: "08", name: "SCHEDULING", desc: "Court assignment & timeline planning" },
  { step: "09", name: "MATCH OPERATIONS", desc: "Court call, check-in & mat control" },
  { step: "10", name: "SCORING", desc: "Real-time electronic scoring & referee inputs" },
  { step: "11", name: "RESULTS", desc: "Official verification, podium & standings" },
];

export const TECH_PILLARS = [
  {
    title: "REAL-TIME SYSTEMS",
    desc: "Fast communication between connected competition systems and arena displays.",
    tag: "Sub-millisecond sync",
  },
  {
    title: "COMPETITION ENGINE",
    desc: "The underlying engine controlling categories, draws, matches, progression and results.",
    tag: "Deterministic logic",
  },
  {
    title: "HARDWARE INTEGRATION",
    desc: "Architecture designed for integration with electronic competition devices and peripherals.",
    tag: "Peripheral connectivity",
  },
  {
    title: "DATA INFRASTRUCTURE",
    desc: "Structured competition data supporting live results, reporting, statistics and future analytics.",
    tag: "Auditable integrity",
  },
];

export const SPORTING_ECOSYSTEM = [
  { title: "ATHLETES", desc: "Profiles, weigh-in tracking, live bracket positions, and official match records." },
  { title: "COACHES", desc: "Team registrations, court scheduling, protest tracking, and competitor progression." },
  { title: "CLUBS", desc: "Multi-athlete roster management, category entries, and competition schedules." },
  { title: "REFEREES & JUDGES", desc: "Match control, electronic point inputs, penalty administration, and official decisions." },
  { title: "ORGANIZERS", desc: "Tournament lifecycle management, category draws, court scheduling, and accreditation." },
  { title: "FEDERATIONS", desc: "Standardized competition governance, national ranking data, and sanctioned event records." },
  { title: "SPECTATORS", desc: "Live match displays, court status monitors, live bracket updates, and verified results." },
];

export const ROADMAP_STAGES = [
  {
    status: "TODAY",
    title: "Competition Software",
    desc: "Core software platforms: Kyorix Score, Kyorix Bracket, and Kyorix TEMS currently in active operational deployment.",
    badge: "Available Now",
    active: true,
  },
  {
    status: "DEVELOPING",
    title: "Scoring Hardware",
    desc: "Engineering architecture and prototype testing for integrated referee consoles, court controllers, and electronic peripherals.",
    badge: "In Development",
    active: false,
  },
  {
    status: "NEXT",
    title: "Live Competition Technology",
    desc: "Multi-court stadium broadcast feeds, synchronized arena displays, and real-time public spectator data streams.",
    badge: "Upcoming Stage",
    active: false,
  },
  {
    status: "FUTURE",
    title: "Multi-Sport Technology",
    desc: "Extending the core competition engine and scoring architecture across additional competitive and combat sporting disciplines.",
    badge: "Long-term Vision",
    active: false,
  },
];
