import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">
          Open Sidebar
        </label>
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
