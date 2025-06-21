import {
  createBrowserRouter,

} from "react-router";
import MainLayout from "./Layout/MainLayout";
import ErrorPage from "./Pages/Error/ErrorPage";
import Home from "./Pages/Home/Home";
import Coverage from "./Pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
   Component: MainLayout,
   children:[
    {index:true,
      Component:Home
    },
    {
      path:'coverage',
      loader:()=> fetch('./warehouses.json'),
      Component: Coverage
    }
   ]
  },
]);
