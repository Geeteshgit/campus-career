"use client";

// React
import React, { useState } from "react";
import Image from "next/image";

// Shared UI Components
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";

// Local Imports
import { useLogin } from "../hooks/useLogin";
import { LoginPayload } from "../types/auth.types";

type LoginFormProps = {
  onForgotPasswordClick: () => void;
};

const LoginForm = ({
  onForgotPasswordClick,
}: LoginFormProps): React.JSX.Element => {
  const { handleLogin, loginPending } = useLogin();

  const [loginData, setloginData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(loginData);
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={loginPending}
          >
            Login
          </Button>

          <div className="text-center">
            <Button
              variant="link"
              onClick={onForgotPasswordClick}
            >
              Forgot password?
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
