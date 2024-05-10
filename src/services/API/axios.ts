import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://so-yummy-app-backend.vercel.app/",
});
