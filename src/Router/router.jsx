import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Featurers/auth/Login";
import Register from "../Featurers/auth/Register";
import AddParcelForm from "../Pages/AddPercel/AddParcelForm";
import BeRider from "../Pages/Rider/BeRider";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import DashHome from "../Layout/Dashboard/DashHome";
import MyParcel from "../Pages/MyPercel/MyParcel";
import PrivateRoute from "../Router/PrivateRoute";
import Payment from "../Layout/Dashboard/Payment/Payment";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/AboutPages/Story";
import Mission from "../Pages/AboutUs/AboutPages/Mission";
import Success from "../Pages/AboutUs/AboutPages/Success";
import Team from "../Pages/AboutUs/AboutPages/Team";
import Pricing from "../Pages/Pricing/Pricing";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "coverage",
        loader: () => fetch("./warehouses.json"),
        element: <Coverage />,
      },
  
      {
        path: "price",
        loader: () => fetch("./warehouses.json"),
        element: <AddParcelForm />,
      },
      {
        path: "pricing",
      
        element: <Pricing></Pricing>
      },
      {
        path: "AboutUs",

        element: <AboutUs />,
        children: [
          {
            index: true,
            Component: Story,
          },
          {
            path: "mission",
            Component: Mission,
          },
          {
            path: "success",
            Component: Success,
          },
          {
            path: "team",
            Component: Team,
          },
        ],
      },
      {
        path: "beRider",
        loader: () => fetch("./warehouses.json"),
        element: <BeRider />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        path: "login", // ⚠️ Removed leading slash
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashHome />,
      },
      {
        path: "my-parcel",
        element: <MyParcel />,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
    ],
  },
]);
