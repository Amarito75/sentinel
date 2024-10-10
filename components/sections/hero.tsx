import React from "react";
import { LinkServices } from "../link-services";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import PreviewDashboard from "./preview-dashboard";
import { FlipWords } from "../effects/flip-words";
import Link from "next/link";

const words = ["faster", "safer", "smarter", "better"];

const HeroSection = () => {
  return (
    <div className="mt-16 lg:mt-20 flex flex-col items-center justify-center text-center space-y-8">
      <div className="w-full flex-wrap text-5xl lg:text-7xl text-black dark:text-white shrink-0 text-center font-medium mx-16">
        Build your admin dashboard <br />
        <FlipWords words={words} /> <br />
        with BoilerNext
      </div>
      <h2 className="text-black dark:text-white lg:text-3xl">
        Build your admin dash with all the tools you need
      </h2>
      <div className="flex gap-4">
        <Link href="/sign-up">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          className="text-black dark:text-white"
        >
          Learn More
        </Button>
      </div>
      <PreviewDashboard />
    </div>
  );
};

export default HeroSection;
