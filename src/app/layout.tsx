import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/effects/MouseGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tattva Tech | Technology That Transforms",
  description:
    "A technology, innovation, and digital transformation company. We build the future through AI, Industry 4.0, Robotics, IoT, and Digital Transformation.",
  keywords: [
    "Tattva Tech",
    "technology",
    "innovation",
    "digital transformation",
    "AI",
    "Industry 4.0",
    "Robotics",
    "IoT",
    "Software Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">
        <MouseGlow />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
