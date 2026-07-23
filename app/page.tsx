import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { TryItDemo } from "@/components/TryItDemo";
import { Proof } from "@/components/Proof";
import { Pricing } from "@/components/Pricing";
import { SignupForm } from "@/components/SignupForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <TryItDemo />
        <Proof />
        <Pricing />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
