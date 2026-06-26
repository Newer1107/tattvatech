import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Tattva Tech",
  description:
    "Learn about Tattva Tech's mission, vision, and core values. A technology, innovation, and digital transformation company.",
};

export default function AboutPage() {
  return <AboutContent />;
}
