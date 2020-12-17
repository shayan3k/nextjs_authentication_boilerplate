import axios from "axios";
import { logOut } from "@/util/auth";

export default function api() {
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logOut();

        return Promise.reject();
      }

      return Promise.reject(error);
    }
  );

  return api;
}
