import { env } from "@/config/env";
import axios from "axios";

export const usersApi = axios.create({
  baseURL: env.USER_SERVICE + "/api",
  withCredentials: true,
});

export const jobsApi = axios.create({
  baseURL: env.JOB_SERVICE + "/api",
  withCredentials: true,
});

export const messagesApi = axios.create({
  baseURL: env.MESSAGE_SERVICE + "/api",
  withCredentials: true,
});

export const academicsApi = axios.create({
  baseURL: env.ACADEMIC_CONFIG_SERVICE + "/api",
  withCredentials: true,
});

export const analyticsApi = axios.create({
  baseURL: env.ANALYTICS_SERVICE + "/api",
  withCredentials: true,
});
