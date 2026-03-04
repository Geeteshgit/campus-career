"use client";

import { env } from "@/config/env";
import { setPrograms } from "@/redux/features/academic/academicSlice";
import { login, logout } from "@/redux/features/user/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userResponse = await axios.get(
          `${env.USER_SERVICE}/api/auth/me`,
          {
            withCredentials: true,
          },
        );

        const user = userResponse.data.user;

        const [studentResponse, academicResponse] = await Promise.all([
          user.role === "student"
            ? axios.get(`${env.USER_SERVICE}/api/student/me`, { withCredentials: true })
            : Promise.resolve(null),
          axios.get(`${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs`, {
            withCredentials: true,
          }),
        ]);
        
        const studentProfile = studentResponse ? studentResponse.data.profile : null;
        
        dispatch(login({ user, studentProfile }));
        dispatch(setPrograms(academicResponse.data.programs));
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
