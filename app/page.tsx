import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SimulationStory } from "@/components/SimulationStory";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SignupForm } from "@/components/SignupForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <SimulationStory />
        <Features />
        <HowItWorks />
        <Pricing />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
