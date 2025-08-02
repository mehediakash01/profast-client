import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuthContext from "../../Hooks/useAuthContext";

const Navbar = () => {
  const { user, Logout } = useAuthContext();
  const [clicked, setClicked] = useState(false);
  const handleDp = () => {
    setClicked(!clicked);
  };
  const navLink = (
    <ul className="space-x-4">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/service"}>services</NavLink>
      <NavLink to={"/coverage"}>coverage</NavLink>
      <NavLink to={"/AboutUs"}>about us</NavLink>
      <NavLink to={"/pricing"}>pricing</NavLink>
      {user && (
        <>
          <NavLink to={"/beRider"}>be a Rider</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </>
      )}
    </ul>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="navbar-start ml-6">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLink}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>
      <div className="navbar-end space-x-1 mr-6">
        {user ? (
          <div onClick={handleDp} className="avatar relative">
            <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring-2 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
            {clicked && (
              <div className="bg-gray-400 rounded-md p-4 transition-all ease-in-out duration-300 absolute mt-16 -ml-20 z-10">
                <p>{user?.displayName}</p>
                <button
                  onClick={() => Logout()}
                  className="btn btn-secondary text-white"
                >
                  logOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-2">
            <Link to={"/auth/login"}>
              <button className="btn ">sign in</button>
            </Link>
            <Link to={"/beRider"}>
              <button className="btn btn-primary text-black">be a rider</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
