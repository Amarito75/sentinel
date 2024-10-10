import { BackgroundBeam } from "@/components/effects/background-beam";
import { BentoFeatures } from "@/components/sections/bento-features";
import HeroSection from "@/components/sections/hero";
import FadeIn from "@/components/wrappers/fade-in";
import { FramerWrapper } from "@/components/wrappers/framer-wrapper";

export default function Home() {
  return (
    <>
      <BackgroundBeam />
      <main className="lg:mx-32">
        <FadeIn>
          <FramerWrapper>
            <HeroSection />
          </FramerWrapper>
        </FadeIn>
        <FadeIn>
          <FramerWrapper>
            <BentoFeatures />
          </FramerWrapper>
        </FadeIn>
      </main>
    </>
  );
}
