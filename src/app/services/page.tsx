import type { Metadata } from "next";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services | Tattva Tech",
  description:
    "Explore Tattva Tech's six business verticals: Technology Consulting, Software Solutions, Corporate Learning, Innovation Programs, Industrial Training, and Partnerships.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
