import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li>
          <NavLink to="/dashboard">DashHome</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
