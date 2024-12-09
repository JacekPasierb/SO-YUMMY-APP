import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export const axiosInstance = axios.create({
  baseURL: "https://so-yummy-app-backend.vercel.app/",
});


export default axiosInstance;
