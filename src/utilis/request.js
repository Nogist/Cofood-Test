"use client";

import axios from "axios";
import { baseUrl } from "./constants";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
