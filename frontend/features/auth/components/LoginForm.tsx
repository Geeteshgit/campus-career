"use client";
import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/shared/ui/InputField";
import FormLabel from "@/shared/ui/FormLabel";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/features/user/userSlice";
import { connectSocket, initSocket } from "@/lib/socket";
import { setPrograms } from "@/redux/features/academic/academicSlice";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onForgotPasswordClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPasswordClick }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("USER SERVICE:", env.USER_SERVICE);

    try {
      setLoading(true);
      const loginResponse = await axios.post(
        `${env.USER_SERVICE}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      const user = loginResponse.data.user;

      const [studentResponse, academicResponse] = await Promise.all([
        user.role === "student"
          ? axios.get(`${env.USER_SERVICE}/api/student/me`, {
              withCredentials: true,
            })
          : Promise.resolve(null),
        axios.get(`${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs`, {
          withCredentials: true,
        }),
      ]);

      const studentProfile = studentResponse
        ? studentResponse.data.profile
        : null;

      dispatch(setPrograms(academicResponse.data.programs));
      dispatch(login({ user, studentProfile }));

      initSocket();
      connectSocket();

      if (user.role === "student") {
        router.push("/student/home");
      } else if (user.role === "admin" || user.role === "super_admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[url(/background-img.jpg)] bg-top bg-cover">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white border border-blue-200 rounded-xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <Image
            src="/bennett.png"
            alt="bennett-logo"
            width={100}
            height={100}
            className="h-20 w-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-2 mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
            CampusCareer
          </h1>
          <p className="text-sm text-center text-neutral-600">
            Login using email and password
          </p>
        </div>

        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          <div>
            <FormLabel>Email</FormLabel>
            <InputField
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <FormLabel>Password</FormLabel>
            <InputField
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <PrimaryButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </PrimaryButton>

          <div className="text-center">
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-blue-500 font-medium cursor-pointer hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
