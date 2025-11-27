"use client";

import { env } from "@/config/env";
import { login, logout } from "@/redux/features/user/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          dispatch(logout());
          return;
        }

        const response = await axios.get(
          `${env.USER_SERVICE}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(login(response.data.user));
      } catch (err) {
        console.error("Auth initialization failed:", err);
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};

export default ReduxInitializer;
