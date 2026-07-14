import { Footer } from "@/components/layout/Footer";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { IntroHeroExperience } from "@/components/sections/IntroHeroExperience";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Summary } from "@/components/sections/Summary";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Home() {
  return (
    <>
      <main>
        <IntroHeroExperience />
        <PageContainer>
          <Summary />
          <Services />
          <Reviews />
          <Achievements />
          <Contact />
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
