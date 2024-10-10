import React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Key, Menu, Play, Sheet, X } from "lucide-react";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/ui/nav-item";

const sidebarItems = [
  {
    title: {
      label: "Getting Started",
      icon: (
        <Play
          size={16}
          className="text-sm font-medium text-muted-foreground mb-2"
        />
      ),
    },
    items: [
      { label: "Installation", href: "/docs" },
      { label: "Project Structure", href: "/docs/project-structure" },
      { label: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  {
    title: {
      label: "Configuration",
      icon: (
        <Key
          size={16}
          className="text-sm font-medium text-muted-foreground mb-2"
        />
      ),
    },
    items: [
      { label: "Authentication", href: "/docs/authentication" },
      { label: "Database", href: "/docs/database" },
      { label: "Emailing", href: "/docs/emailing" },
      { label: "UI components", href: "/docs/ui-components" },
    ],
  },
  // Add more sections as needed
];

const Sidebar = () => {
  return (
    <>
      <div className="fixed left-0 top-20 bottom-0 w-64 bg-card border-r border-border overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Documentation</h2>
            {sidebarItems.map((section, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center space-x-2">
                  {section.title?.icon}
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {section.title?.label}
                  </h3>
                </div>
                <ul className="space-y-2 ml-4">
                  {section.items.map((item, itemIndex) => (
                    <NavItem
                      key={itemIndex}
                      href={item.href}
                      label={item.label}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      {/* <div className="block md:hidden">
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
            {sidebarItems.map((item, index) => (
              <NavItem
                key={index}
                href={item.title.href}
                label={item.title.label}
              />
            ))}
            <SheetFooter className="flex justify-center items-center">
              <Link href={"/sign-in"}>
                <Button size="lg">Sign In</Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div> */}
    </>
  );
};

export default Sidebar;
