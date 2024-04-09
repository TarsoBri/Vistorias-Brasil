import axios from "axios";

export const api = axios.create({
  baseURL: "https://vistorias-brasil-back.vercel.app",
});
