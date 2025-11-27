"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "@/components/FormComponents/InputField";
import FormLabel from "@/components/FormComponents/FormLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/user/userSlice";

const Login = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${env.USER_SERVICE}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(login(response.data.user));
      if(response.data.user.role === "student") {
        router.push("/student/home")
      }
      else if(response.data.user.role === "admin" || response.data.user.role === "super_admin") {
        router.push("/admin/dashboard");
      }
      else {
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[url(/background-img.jpg)] bg-top bg-cover">
      {/* Login Card */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white border border-blue-200 rounded-xl shadow-xl p-8">
        {/* Logo */}
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

        {/* Title */}
        <div className="flex flex-col items-center gap-2 mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
            CampusCareer
          </h1>
          <p className="text-sm text-center text-neutral-600">
            Login using email and password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          {/* Email */}
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

          {/* Password */}
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

          {/* Login Button */}
          <PrimaryButton type="submit" className="w-full">
            Login
          </PrimaryButton>

          {/* Forgot Password */}
          <div className="text-center">
            <a
              href="#"
              className="text-blue-500 hover:underline text-md font-medium"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
