"use client";

import React, { forwardRef, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/effects/animated-beam";
import {
  SiResend,
  SiStripe,
  SiClerk,
  SiShadcnui,
  SiSupabase,
  SiPrisma,
} from "react-icons/si";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function LinkServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.resend />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.stripe />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.clerk />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Icons.shadcnui />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.supabase />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.shadcnui />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.prisma />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

const Icons = {
  stripe: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiStripe className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Stripe</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  clerk: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiClerk className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Clerk</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),

  resend: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiResend className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Resend</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),

  shadcnui: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiShadcnui className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Shadcn UI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),

  supabase: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiSupabase className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Supabase</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),

  prisma: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SiPrisma className="text-primary mt-6" />,
        </TooltipTrigger>
        <TooltipContent>
          <p>Prisma</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
