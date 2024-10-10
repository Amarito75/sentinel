"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Package2,
  Bell,
  Home,
  ShoppingCart,
  Badge,
  Package,
  Users,
  LineChart,
  Banknote,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import NavItem from "./nav-item";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home size={18} />,
  },
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: <Banknote size={18} />,
  },
  {
    href: "/dashboard/emails",
    label: "Emails",
    icon: <Mail size={18} />,
  },
];

const Sidebar = () => {
  return (
    <div className="h-screen fixed left-0 top-0 border-r bg-muted/40 w-1/5">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
