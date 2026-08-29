import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { ExitIntentModal } from "@/components/layout/ExitIntentModal";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Treatments } from "@/components/sections/Treatments";
import { ComboBuilder } from "@/components/sections/ComboBuilder";
import { Quiz } from "@/components/sections/Quiz";
import { Technology } from "@/components/sections/Technology";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { Proof } from "@/components/sections/Proof";
import { EntryOffer } from "@/components/sections/EntryOffer";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustStrip />
        <Treatments />
        <ComboBuilder />
        <Quiz />
        <Technology />
        <HowItWorks />
        <Location />
        <Proof />
        <EntryOffer />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyBar />
      <FloatingWhatsApp />
      <ConsentBanner />
      <ExitIntentModal />
    </>
  );
}
