import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://popular-medical-camp-server.vercel.app",
});

const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token-access");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logoutUser();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export { useAxiosSecure };