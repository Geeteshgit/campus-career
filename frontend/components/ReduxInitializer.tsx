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

        const userResponse = await axios.get(`${env.USER_SERVICE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = userResponse.data.user;
        let studentProfile = null;

        if (user.role === "student") {
          const studentResponse = await axios.get(
            `${env.USER_SERVICE}/api/student/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          studentProfile = studentResponse.data.profile;
        }

        dispatch(login({ user, studentProfile }));
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
