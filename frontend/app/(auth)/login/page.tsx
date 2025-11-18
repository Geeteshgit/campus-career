"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Login = (): React.JSX.Element => {
    const router = useRouter();
    const submitHandler = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        router.push("/student/home");
    }
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
          <p className="text-sm text-center text-neutral-600">Login using email and password</p>
        </div>

        <form 
          onSubmit={submitHandler}
          className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-blue-500 rounded-lg px-3 py-2 outline-none text-neutral-700 placeholder:text-neutral-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border border-blue-500 rounded-lg px-3 py-2 outline-none text-neutral-700 placeholder:text-neutral-500"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition hover:scale-[1.01] duration-300 cursor-pointer"
          >
            Login
          </button>

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
