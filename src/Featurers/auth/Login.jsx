import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuthContext from "../../Hooks/useAuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { loginUser } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onsubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        toast.success("Login Successful");
        navigate(from);
        reset();
      })
      .catch((err) => toast.error(`${err.message}`));
  };
  return (
    <div>
      <div className="my-10 space-y-2">
        <h1 className="text-5xl font-extrabold">Welcome Back</h1>
        <p className="opacity-70">login with profast</p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className="fieldset">
        <label className="label">Email</label>
        <input
          autoFocus
          type="email"
          className="input"
          {...register("email", { required: "email is required" })}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
            },
          })}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-primary  w-[320px]  text-secondary mt-4 ">
          Login
        </button>
        <div>
          <p>
            Don't Have an account?{" "}
            <Link to={"/auth/register"} className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
