import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cinema-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Suzume — A Cinematic Journey",
  description:
    "An immersive movie landing page inspired by doors, memory, ruins, and the light beyond.",
  openGraph: {
    title: "Suzume — A Cinematic Journey",
    description:
      "An immersive movie landing page inspired by doors, memory, ruins, and the light beyond.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full bg-[var(--cinema-void)] text-[var(--cinema-paper)] antialiased">
        {children}
      </body>
    </html>
  );
}
