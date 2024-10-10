import Sidebar from "./components/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start justify-between w-screen">
      <div className="h-full w-1/5 left-0 top-0">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5 h-full mt-8 flex flex-col items-center justify-start right-0">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
