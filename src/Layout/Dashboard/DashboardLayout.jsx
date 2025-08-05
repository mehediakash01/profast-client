import React from "react";
import { Outlet, NavLink, Link } from "react-router";
import Logo from "../../Components/Logo/Logo";
import {
  FaHome,
  FaBox,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserClock,
} from "react-icons/fa";
const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Outlet for nested routes */}
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full p-4 space-y-2">
          {/* Sidebar content here */}
          <Logo></Logo>
          <li>
            <Link to="/dashboard">
              <FaHome className="inline mr-2" /> DashHome
            </Link>
          </li>
          <li>
            <NavLink to="/dashboard/my-Parcel">
              <FaBox className="inline mr-2" /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment-history">
              <FaCreditCard className="inline mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track-package">
              <FaMapMarkerAlt className="inline mr-2" /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/update-profile">
              <FaUserEdit className="inline mr-2" /> Update Profile
            </NavLink>
          </li>

          {/* riders link */}
          <li>
            <NavLink to="/dashboard/pending-riders">
              <FaUserClock className="inline-block mr-2" />
              Pending Riders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
