import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "PowerTiles - Premium Modulaire PVC-Klikvloeren",
  description:
    "Premium modulaire PVC-klikvloeren voor garages, home gyms en werkplaatsen. Transform Your Space. Unleash the Power.",
  other: {
    "apple-mobile-web-app-title": "PowerTiles",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
