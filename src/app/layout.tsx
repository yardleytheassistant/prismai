import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "PrismAI — AI Adoption Consulting",
  description: "PrismAI helps enterprise teams cut through the noise — building the strategy, infrastructure, and culture to make AI actually work.",
  keywords: "AI adoption, enterprise AI, AI consulting, transformation roadmap, AI implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}