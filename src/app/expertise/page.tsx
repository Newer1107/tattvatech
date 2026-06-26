import type { Metadata } from "next";
import ExpertiseContent from "@/components/expertise/ExpertiseContent";

export const metadata: Metadata = {
  title: "Expertise | Tattva Tech",
  description:
    "Explore Tattva Tech's 12 technology domains including AI, Industry 4.0, Robotics, IoT, Cybersecurity, and more.",
};

export default function ExpertisePage() {
  return <ExpertiseContent />;
}
