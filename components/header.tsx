"use client";

import React, { useState, useEffect } from "react";
import NavItem from "./ui/nav-item";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./logo";
import { DarkModeToggle } from "./ui/darkmode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Input } from "postcss";
import { Label } from "recharts";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Documentation",
    href: "/docs",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 bg-white dark:bg-card z-50 w-full py-6 transition-transform duration-300 border-b border-border">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        <nav className="py-2 hidden md:flex items-center bg-background/50 backdrop-blur-xl space-x-8 border border-border rounded-full px-2">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />
          <Link href={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu size={24} className="text-black dark:text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full bg-muted">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-black dark:text-white">
                    BoilerNext
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="outline" size="icon">
                      <X size={24} className="text-black dark:text-white" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              {navItems.map((item, index) => (
                <NavItem key={index} href={item.href} label={item.label} />
              ))}
              <SheetFooter className="flex justify-center items-center">
                <Link href={"/sign-in"}>
                  <Button size="lg">Sign In</Button>
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
