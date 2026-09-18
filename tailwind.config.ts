import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kyorix: {
          blue: "#0054F5",
          "blue-hover": "#0045CC",
          "blue-glow": "rgba(0, 84, 245, 0.25)",
          "blue-subtle": "rgba(0, 84, 245, 0.08)",
          dark: "#08090C",
          "dark-surface": "#0D1117",
          "dark-card": "#111622",
          "dark-card-hover": "#161D2C",
          "dark-border": "#1E2638",
          "dark-border-subtle": "rgba(255, 255, 255, 0.06)",
          // Functional competition colors (scoring only)
          "score-red": "#EF4444",
          "score-blue": "#0054F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
