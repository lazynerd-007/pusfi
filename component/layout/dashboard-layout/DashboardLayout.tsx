import React from "react";
import DashboardSider from "./DashboardSider";
import DashNav from "./DashNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open text-black mx-auto max-w-[1640px]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#FAFAFA]">
        <DashNav />
        {children}
      </div>
      <DashboardSider />
    </div>
  );
};

export default DashboardLayout;
