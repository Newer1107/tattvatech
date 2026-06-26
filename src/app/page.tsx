import Hero from "@/components/home/Hero";
import FounderVision from "@/components/home/FounderVision";
import TechnologyShowcase from "@/components/home/TechnologyShowcase";
import BusinessEcosystem from "@/components/home/BusinessEcosystem";
import WhyWeExist from "@/components/home/WhyWeExist";
import ValueCreation from "@/components/home/ValueCreation";
import StrategicPillars from "@/components/home/StrategicPillars";
import BusinessVerticals from "@/components/home/BusinessVerticals";
import ImpactPreview from "@/components/home/ImpactPreview";
import RoadmapPreview from "@/components/home/RoadmapPreview";
import VisionPreview from "@/components/home/VisionPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <FounderVision />
      <TechnologyShowcase />
      <BusinessEcosystem />
      <WhyWeExist />
      <ValueCreation />
      <StrategicPillars />
      <BusinessVerticals />
      <ImpactPreview />
      <RoadmapPreview />
      <VisionPreview />
    </>
  );
}
