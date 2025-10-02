import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InOrbyt.io - Creator Token Economy Platform",
  description: "Launch your own tradeable tokens, reward superfans, and build a thriving creator economy. Join the future of creator monetization with InOrbyt.io.",
  keywords: ["creator tokens", "creator economy", "crypto", "blockchain", "tokenization", "fan engagement", "creator monetization"],
  authors: [{ name: "InOrbyt Team" }],
  creator: "InOrbyt.io",
  publisher: "InOrbyt.io",
  openGraph: {
    title: "InOrbyt.io - Creator Token Economy Platform",
    description: "Launch your own tradeable tokens, reward superfans, and build a thriving creator economy.",
    url: "https://inorbyt.io",
    siteName: "InOrbyt.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InOrbyt.io - Creator Token Economy Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InOrbyt.io - Creator Token Economy Platform",
    description: "Launch your own tradeable tokens, reward superfans, and build a thriving creator economy.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${lora.variable}`}>
      <body className={`${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}