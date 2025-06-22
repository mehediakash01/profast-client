import React from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  return (
    <div >
        <div className="my-10 space-y-2">
            <h1 className="text-5xl font-extrabold">Welcome Back</h1>
            <p className="opacity-70">login with profast</p>
        </div>
      <form className="fieldset">
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />
        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-primary  w-[320px]  text-secondary mt-4 ">Login</button>
          <div>
          <p>Don't Have an account? <Link to={'/auth/register'} className="link link-primary">Register</Link></p>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
