import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head"; // Import Head
import { TracingBeam } from "@/components/TracingBeam";
import { ShootingStars } from "@/components/ShootingStar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Estimate",
  description: "Boosting productivity with effortless task estimation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} min-h-screen bg-black overflow-hidden ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
