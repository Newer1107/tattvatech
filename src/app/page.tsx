import { Footer } from "@/components/layout/Footer";
import { Achievements } from "@/components/sections/Achievements";
import { BusinessVerticals } from "@/components/sections/BusinessVerticals";
import { Contact } from "@/components/sections/Contact";
import { IntroHeroExperience } from "@/components/sections/IntroHeroExperience";
import { Reviews } from "@/components/sections/Reviews";

export default function Home() {
  return (
    <>
      <main>
        <IntroHeroExperience />
        <BusinessVerticals />
        <Reviews />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
