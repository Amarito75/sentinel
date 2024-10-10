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
      className={`flex items-center text-md font-medium text-muted-foreground px-4 rounded-lg ${
        isActive ? "text-primary underline-offset-4" : "hover:text-primary"
      }`}
    >
      {icon}
      <h1>{label}</h1>
    </Link>
  );
};

export default NavItem;
