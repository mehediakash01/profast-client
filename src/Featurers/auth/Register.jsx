import React from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuthContext from "../../Hooks/useAuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, UpdateUser, setUser } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onsubmit = (data) => {
    const { name, email, password, photo } = data;
    createUser(email, password)
      .then((result) => {
        const newUser = result.user;
        UpdateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...newUser, displayName: name, photoURL: photo });
            toast.success("Register Successful!");
            navigate("/");
            reset();
          })
          .catch((err) => {
            toast.error(`${err.message}`);
          });
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  return (
    <div>
      <div className="my-10 space-y-2">
        <h1 className="text-5xl font-extrabold">Create An Account</h1>
        <p className="opacity-70">Register with profast</p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className="fieldset">
        <label className="label">Name</label>
        <input
          autoFocus
          type="text"
          className="input"
          {...register("name", { required: "name is required" })}
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label className="label">Photo</label>
        <input
          type="text"
          className="input"
          {...register("photo", { required: "Photo is required" })}
          placeholder="Enter your img URL"
        />
        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
        <label className="label">Email</label>
        <input
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
            required: "password is required",
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
