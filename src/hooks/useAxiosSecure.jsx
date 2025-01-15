import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
        res => {return res},
        async error => {
            if(error.response.status === 401 || error.response.status === 403){
                logoutUser();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    )
  }, [logoutUser, navigate]);
  return axiosSecure;
};

export { useAxiosSecure };
