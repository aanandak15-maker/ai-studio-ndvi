import type {Metadata} from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

const SITE_URL = 'https://nabhya.tech';
const OG_IMAGE = `${SITE_URL}/ndvi-output-real.png`;

/* ── Metadata (canonical, OG image, twitter image, favicon, title) ── */
export const metadata: Metadata = {
  // Issue #5 fixed: keyword-rich title under 60 chars
  title: 'Nabhya — NDVI Crop Health Maps From Standard RGB Drones',
  description:
    'Nabhya generates near-NDVI crop health maps from standard RGB drone footage — no multispectral camera required. SSIM 0.8060, 440-image validation, IEEE Hackathon Winner 2026.',
  keywords: [
    'NDVI', 'crop health', 'drone analytics', 'precision agriculture',
    'agtech', 'AI agriculture', 'RGB to NDVI', 'Nabhya', 'crop monitoring',
    'multispectral alternative', 'vegetation index', 'India agritech',
  ],
  authors: [
    { name: 'Anand' },
    { name: 'Himanshi' },
    { name: 'Varshita' },
    { name: 'Rajan' },
  ],

  // Issue #1 fixed: canonical
  alternates: {
    canonical: SITE_URL,
  },

  // Issues #3 + #4 fixed: og:image + twitter:image
  openGraph: {
    title: 'Nabhya — NDVI Crop Health Maps From Standard RGB Drones',
    description:
      'Near-NDVI precision mapping from standard RGB drone cameras. No multispectral hardware. SSIM 0.8060, IEEE Hackathon Winner 2026.',
    url: SITE_URL,
    siteName: 'Nabhya',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Nabhya NDVI crop health map generated from a standard RGB drone image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabhya — NDVI Crop Health Maps From Standard RGB Drones',
    description:
      'Near-NDVI precision mapping from standard RGB drone cameras. No multispectral hardware. SSIM 0.8060.',
    images: [OG_IMAGE],
  },

  // Issue #8 fixed: favicon
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ── JSON-LD Structured Data ── */

// Issue #2 fixed: Organization schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nabhya',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    'AI Crop Health Intelligence — near-NDVI vegetation index maps from standard RGB drone footage, without multispectral hardware.',
  sameAs: [],
  founder: [
    { '@type': 'Person', name: 'Anand', jobTitle: 'Founder & AI Engineer' },
    { '@type': 'Person', name: 'Himanshi', jobTitle: 'Co-Founder, Operations' },
    { '@type': 'Person', name: 'Varshita', jobTitle: 'Co-Founder, Communications' },
    { '@type': 'Person', name: 'Rajan', jobTitle: 'Co-Founder, Marketing' },
  ],
  award:
    '1st Prize, AgriTech Yuva Competition 2026; IEEE Hackathon Winner 2026',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'nabhya.tech26@gmail.com',
    contactType: 'customer service',
  },
};

// Issue #2 + #12 fixed: FAQPage schema — all 8 visible Q&A items
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is the NDVI output?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our model achieves SSIM 0.8060 across 440 held-out validation images — 16.8% above the published benchmark for this task.',
      },
    },
    {
      '@type': 'Question',
      name: 'How was the model validated, and has it been independently recognised?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We validated on 440 real Sentinel-2 field pairs held out from training. The work received recognition from MSME (Ministry of Micro, Small & Medium Enterprises) and was presented at an IEEE student-branch symposium. SSIM and Pearson r metrics are logged per inference run for auditability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a multispectral drone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Nabhya works with any standard RGB drone or satellite image. No special hardware required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image types are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PNG, JPG, JPEG, and TIFF. Maximum file size 10MB.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does analysis take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically under 2 seconds. Tested on images up to 10MB.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I integrate this into my existing software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Nabhya is a REST API — one POST request returns a full NDVI heatmap and JSON statistics. Most integrations take under a day.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after my 50 free analyses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You will receive an email before you run out. Upgrade to a paid plan to continue. No automatic charges.',
      },
    },
    {
      '@type': 'Question',
      name: "Is Nabhya's SSIM validation methodology auditable?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every inference run logs SSIM and Pearson r scores against ground-truth. On Enterprise plans we can share the full validation dataset provenance and model card on request.',
      },
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} scroll-smooth overflow-x-hidden`}>
      <body className="font-sans antialiased text-[#1a1a1a] bg-[#F8F7F3] min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {/* Issue #2 fixed: JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
