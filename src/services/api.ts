import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

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
