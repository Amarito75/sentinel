import { Home, Settings } from "lucide-react";
import Image from "next/image";
import React from "react";
import NavItem from "./ui/nav-item";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home size={20} className="mr-4" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={20} className="mr-4" />,
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start p-8 border-r border-border h-screen space-y-8">
      <div className="flex items-center justify-center place-self-center">
        <Image src="/pictures/logo.svg" alt="logo" width={100} height={100} />
      </div>
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Sidebar;
