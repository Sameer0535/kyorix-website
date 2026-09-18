import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SiteContentProvider } from "@/context/ContentContext";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kyorix Sport Technology Private Limited | Sports Technology",
  description:
    "Kyorix develops sports technology for electronic scoring, competition management and sporting events.",
  keywords: [
    "sports technology",
    "electronic scoring",
    "taekwondo scoring system",
    "competition management",
    "tournament brackets",
    "TEMS",
    "Kyorix",
    "Kyorix Score",
    "Kyorix Bracket",
    "Kyorix TEMS",
  ],
  authors: [{ name: "Kyorix Sport Technology Private Limited" }],
  creator: "Kyorix Sport Technology Private Limited",
  publisher: "Kyorix Sport Technology Private Limited",
  metadataBase: new URL("https://kyorixsport.in"),
  openGraph: {
    title: "Kyorix Sport Technology Private Limited | Sports Technology",
    description:
      "Kyorix builds intelligent technology for sports scoring, competition management and live sporting events.",
    url: "https://kyorixsport.in",
    siteName: "Kyorix Sport Technology",
    images: [
      {
        url: "/brand/kyorix-logo.jpg",
        width: 1024,
        height: 682,
        alt: "KYORIX SPORT TECHNOLOGY PRIVATE LIMITED",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyorix Sport Technology Private Limited",
    description:
      "Intelligent technology for sports scoring, competition management and live sporting events.",
    images: ["/brand/kyorix-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#08090C] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-kyorix-blue selection:text-white">
        <SiteContentProvider>
          <AppShell>{children}</AppShell>
        </SiteContentProvider>
      </body>
    </html>
  );
}
