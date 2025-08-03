import axios from "axios";
import { useEffect } from "react";
import useAuthContext from "./useAuthContext";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000/`,
});

const useAxiosSecure = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const accessToken = user?.accessToken;

    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log("🔐 Token attached:", config.headers.Authorization);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
