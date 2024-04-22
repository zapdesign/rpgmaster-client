import axios from "axios";
import { URL } from "./baseURL";
import { token } from "./takeToken";



export const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });