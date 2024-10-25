import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export const axiosInstance = axios.create({
  baseURL: "https://so-yummy-app-backend.vercel.app/",
});

// axiosInstance.interceptors.response.use(
//   (response) => response, // Zwróć odpowiedź, jeśli jest poprawna
//   (error) => {
//     const { status } = error.response;

//     // Sprawdzenie statusu 401
//     if (status === 401) {
//       window.location.href = "/welcome";
//     }

//     return Promise.reject(error); // Rzuć błąd, aby można go było obsłużyć w aplikacji
//   }
// );

export default axiosInstance;
