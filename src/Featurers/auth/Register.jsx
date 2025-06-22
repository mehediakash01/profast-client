import React from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div>
      <div className="my-10 space-y-2">
        <h1 className="text-5xl font-extrabold">Create An Account</h1>
        <p className="opacity-70">Register with profast</p>
      </div>
      <form className="fieldset">
        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Enter your name" />
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />
        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-primary w-[320px] text-secondary  ">
          Register
        </button>
        <div>
          <p>
            already Have an account?{" "}
            <Link to={"/auth/login"} className="link link-primary">
              login
            </Link>
          </p>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
