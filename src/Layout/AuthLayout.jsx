import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import parcel from "../assets/parcel.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
 
      <div className="w-full md:w-1/2 px-6 py-8 flex flex-col">
        <div className="mb-6 w-[120px]">
         
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
      </div>

   
      <div className="hidden md:flex w-1/2 bg-[#FAFDF0] items-center justify-center">
        <img src={parcel} alt="Parcel illustration" className="w-3/4 max-w-md" />
      </div>
    </div>
  );
};

export default AuthLayout;
