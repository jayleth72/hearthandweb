import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heart and Hand Eco Body Art - Face Painting &amp; Henna Art",
  description: "Professional face painting and henna artistry for birthdays, festivals, corporate events, and special celebrations. Creating magical moments with beautiful, safe, and temporary art.",
  keywords: "face painting, henna art, birthday parties, events, children's entertainment, professional artist",
  authors: [{ name: "Heart and Hand Eco Body Art" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.svg'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Heart and Hand Eco Body Art - Face Painting &amp; Henna Art",
    description: "Professional face painting and henna artistry for special events",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart and Hand Eco Body Art - Face Painting &amp; Henna Art",
    description: "Professional face painting and henna artistry for special events",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
