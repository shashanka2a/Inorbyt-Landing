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
  title: "InOrbyt.io - The Reward Layer for the Creator Economy",
  description: "Empowering creators to connect, reward, and grow — across every platform. Turn your existing platforms into a connected reward ecosystem.",
  keywords: ["creator rewards", "creator economy", "platform integration", "fan engagement", "reward layer", "creator monetization", "Patreon", "Substack", "YouTube", "Discord"],
  authors: [{ name: "InOrbyt Team" }],
  creator: "InOrbyt.io",
  publisher: "InOrbyt.io",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "InOrbyt.io - The Reward Layer for the Creator Economy",
    description: "Empowering creators to connect, reward, and grow — across every platform.",
    url: "https://inorbyt.io",
    siteName: "InOrbyt.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InOrbyt.io - The Reward Layer for the Creator Economy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InOrbyt.io - The Reward Layer for the Creator Economy",
    description: "Empowering creators to connect, reward, and grow — across every platform.",
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
  manifest: "/manifest.json",
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