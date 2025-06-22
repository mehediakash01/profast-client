import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Featurers/auth/Login";
import Register from "../Featurers/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "coverage",
        loader: () => fetch("./warehouses.json"),
        Component: Coverage,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage></ErrorPage>,
    Component: AuthLayout,

    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);
