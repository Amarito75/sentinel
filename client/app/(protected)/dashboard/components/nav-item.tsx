"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive ? "text-primary bg-muted" : "text-muted-foreground"
      }`}
    >
      {icon}
      <h1>{label}</h1>
    </Link>
  );
};

export default NavItem;
