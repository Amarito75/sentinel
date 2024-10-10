"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiClerk,
  SiResend,
  SiStripe,
  SiShadcnui,
  SiSupabase,
} from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout, LayoutDashboard } from "lucide-react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PieGraph } from "../charts/pie-graph";
import { BarTooltip } from "../charts/bar-tooltip";
import { Calendar } from "../ui/calendar";
import { CalendarDateRangePicker } from "../ui/date-range-picker";

export function BentoFeatures() {
  return (
    <div className="flex flex-col items-start justify-center mt-16 space-y-4 mx-4 lg:mx-0">
      <div className="flex items-center space-x-2">
        <LayoutDashboard className="text-primary" />
        <h2 className="shrink-0 text-xl font-bold text-primary">
          All in one solution
        </h2>
      </div>
      <h1 className="text-2xl lg:text-5xl text-primary">
        Retrieve all the <span className="font-semibold">best tools</span> to
        develop a <span className="font-semibold">SaaS in 2025</span>
      </h1>
      <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] ">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const SkeletonOne = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  return (
    <div className="flex flex-row items-center justify-center mt-20 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <h1 className="text-lg text-primary font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">Order ID</p>
        <p className="text-sm text-muted-foreground">Order Date</p>
        <p className="text-sm text-muted-foreground">Order Status</p>
        <p className="text-sm text-muted-foreground">Order Total</p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <h1 className="text-lg text-primary font-bold">Mail</h1>
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="text-sm text-muted-foreground">Subject</p>
        <p className="text-sm text-muted-foreground">Body</p>
        <p className="text-sm text-muted-foreground">Created At</p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <h1 className="text-lg text-primary font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">firstName</p>
        <p className="text-sm text-muted-foreground">lastName</p>
        <p className="text-sm text-muted-foreground">email</p>
        <p className="text-sm text-muted-foreground">createdAt</p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-col rounded-2xl p-2 items-start space-y-2 w-full"
      >
        <div className="flex items-center justify-between w-full space-x-2">
          <Input placeholder="Placeholder" />
          <Button>Search</Button>
        </div>
        <CalendarDateRangePicker />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full p-2 items-center justify-end space-x-2 w-full ml-auto"
      ></motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Clerk",
    description: (
      <span className="text-sm">
        Use Clerk to manage your users and their data.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <SiClerk className="h-4 w-4 text-primary" />,
  },
  {
    title: "Resend",
    description: <span className="text-sm">Manage emailing with Resend.</span>,
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <SiResend className="h-4 w-4 text-primary" />,
  },
  {
    title: "Stripe  ",
    description: (
      <span className="text-sm">Provide payment simply with Stripe.</span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <SiStripe className="h-4 w-4 text-primary" />,
  },
  {
    title: "Supabase",
    description: (
      <span className="text-sm">
        Supabase is a cloud database that is designed to be a drop-in
        replacement for Firebase.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <SiSupabase className="h-4 w-4 text-primary" />,
  },

  {
    title: "shadcn/ui",
    description: (
      <span className="text-sm z-50">
        shadcn/ui is a library of components that are designed to be a drop-in
        replacement for Tailwind CSS.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <SiShadcnui className="h-4 w-4 text-primary" />,
  },
];
