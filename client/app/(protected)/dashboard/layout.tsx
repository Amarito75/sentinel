import Sidebar from "./components/sidebar";
import React from "react";
import HeaderDashboard from "./components/header-dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center h-screen">
      <div className="w-auto">
        <Sidebar />
      </div>
      <div className="w-5/6 absolute right-0 inset-y-0">
        <HeaderDashboard />
        <div className="h-full mt-24">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
