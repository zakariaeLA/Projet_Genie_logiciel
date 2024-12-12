import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api/clubs/67508266533eb41d8194ded0/clubs",
  withCredentials: true,
});
