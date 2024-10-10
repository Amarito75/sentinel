import Header from "@/components/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <Header />
      <div className="flex-grow mt-12 lg:mt-24 flex flex-col gap-4 w-full mb-32">
        {children}
      </div>
    </div>
  );
};

export default Layout;
