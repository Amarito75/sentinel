import React from "react";
import { LinkServices } from "../link-services";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import PreviewDashboard from "./preview-dashboard";
import { FlipWords } from "../effects/flip-words";
import Link from "next/link";
import { PulsatingButton } from "../effects/pulsating-button";
import { BackgroundBeam } from "../effects/background-beam";

const HeroSection = () => {
  return (
    <div className="mt-16 lg:mt-20 flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="w-full flex-wrap text-5xl lg:text-7xl text-black dark:text-white shrink-0 text-center font-medium mx-16">
        Experience the future of finance with our cutting-edge visual crypto
        dashboard.
      </h1>
      <h2 className="text-black dark:text-white lg:text-3xl">
        Build your admin dash with all the tools you need
      </h2>
      <Link href="/sign-up">
        <PulsatingButton className="text-lg text-white">
          Join now
        </PulsatingButton>
      </Link>
      <PreviewDashboard />
    </div>
  );
};

export default HeroSection;
