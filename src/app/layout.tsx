import type { Metadata } from "next";
import { Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
