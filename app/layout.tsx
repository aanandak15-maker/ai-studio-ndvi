import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Nabhya | AI Crop Vigor & Diagnostic Infrastructure",
  description: "Reconstructing high-resolution, near-NDVI vegetation index mapping from standard RGB drone footage without expensive multispectral hardware. IEEE Hackathon Winner 2026.",
  keywords: ["Nabhya", "precision agriculture", "NDVI", "agtech", "crop health", "AI agriculture", "drone analytics", "deep learning crops"],
  authors: [{ name: "Nabhya Team" }],
  openGraph: {
    title: "Nabhya | AI Crop Vigor & Diagnostic Infrastructure",
    description: "Reconstructing high-resolution, near-NDVI vegetation index mapping from standard RGB drone footage without expensive multispectral hardware. IEEE Hackathon Winner 2026.",
    url: "https://nabhya.tech",
    siteName: "Nabhya Precision Agriculture",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabhya | AI Crop Vigor & Diagnostic Infrastructure",
    description: "Near-NDVI precision mapping using standard RGB cameras. Bypassing multi-lakh multispectral sensors through deep learning.",
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
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth overflow-x-hidden`}>
      <body className="font-sans antialiased text-[#F5F5F5] bg-[#0A0A0A] min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
