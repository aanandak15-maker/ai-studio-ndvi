import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Nabhya | AI Infrastructure for Crops',
  description: 'Bringing precision agriculture to 50,000+ farmers across 6 continents.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#F5F5F5] bg-[#0A0A0A] min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
