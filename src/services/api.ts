import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../context/AuthContext";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "https://localhost:7217/api/v1/",
  headers: {
    Authorization: `Bearer ${cookies["idip.token"]}`,
  },
});

export const apiJson = axios.create({
  baseURL: "http://localhost:3004/",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.data?.code === "token.expired") {
      signOut;
    }
  }
);
