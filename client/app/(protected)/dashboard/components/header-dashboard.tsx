import { UserButton } from "@clerk/nextjs";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Searchbar from "./searchbar";

const HeaderDashboard = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 right-0 bg-muted/40 w-5/6 z-50">
      <nav className="flex items-center bg-muted/40 justify-between p-6 py-8 border-b border-border">
        <Searchbar />
        <div className="flex items-center gap-x-4 absolute right-4">
          <h1 className="text-md text-primary flex items-center gap-x-1">
            Hello{" "}
            <span className="text-md text-primary font-semibold">
              {user?.fullName}
            </span>
          </h1>
          <UserButton />
        </div>
      </nav>
    </div>
  );
};

export default HeaderDashboard;
