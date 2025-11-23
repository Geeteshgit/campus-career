"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "@/components/FormComponents/InputField";
import FormLabel from "@/components/FormComponents/FormLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";

const Login = (): React.JSX.Element => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push("/student/home");
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">CampusCareer</h1>
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
              value={form.email}
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
              value={form.password}
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
