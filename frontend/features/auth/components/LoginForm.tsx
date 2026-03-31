"use client";

// React
import Image from "next/image";
import { useRouter } from "next/navigation";

// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Lib
import { connectSocket, initSocket } from "@/lib/socket";

// Types
import type { LoginFormData } from "../schemas/login.schema";

// Shared UI Components
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Local Imports
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../schemas/login.schema";

type LoginFormProps = {
  onForgotPasswordClick: () => void;
};

const LoginForm = ({ onForgotPasswordClick }: LoginFormProps) => {
  const router = useRouter();

  const { handleLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await handleLogin(data);
      initSocket();
      connectSocket();
      
      if (user.role === "student") {
        router.push("/student/postings");
      } else if (user.role === "admin" || user.role === "super_admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <FormLabel htmlFor="email" label="Email" />
            <Input id="email" placeholder="Enter your email" {...register("email")} />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div>
            <FormLabel htmlFor="password" label="Password" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Login
          </Button>

          <Button variant="link" onClick={onForgotPasswordClick}>
            Forgot password?
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
