"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputField from "@/components/FormComponents/InputField";
import FormLabel from "@/components/FormComponents/FormLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/features/user/userSlice";
import { connectSocket, initSocket } from "@/lib/socket";
import { setPrograms } from "@/redux/features/academic/academicSlice";
import CloseButton from "@/components/ui/CloseButton";

const Login = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [fpEmail, setFpEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    if (user) {
      if (user.role === "student") router.replace("/student/postings");
      else router.replace("/admin/dashboard");
    }

    const token = localStorage.getItem("token");
    if (token && !user) {
      router.replace("/");
    }
  }, [user]);

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
      const loginResponse = await axios.post(
        `${env.USER_SERVICE}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );

      const user = loginResponse.data.user;

      localStorage.setItem("token", loginResponse.data.token);

      initSocket();
      connectSocket();

      let studentProfile = null;

      if (user.role === "student") {
        const profRes = await axios.get(`${env.USER_SERVICE}/api/student/me`, {
          headers: { Authorization: `Bearer ${loginResponse.data.token}` },
        });

        studentProfile = profRes.data.profile;
      }

      const academicResponse = await axios.get(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/academics/programs`,
        { headers: { Authorization: `Bearer ${loginResponse.data.token}` } },
      );
      dispatch(setPrograms(academicResponse.data.programs));

      dispatch(login({ user, studentProfile }));

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
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post(
        `${env.USER_SERVICE}/api/auth/forgot-password`,
        {
          email: fpEmail,
        },
      );
      setStep(2);
      setMessage(response.data.message);
    } catch {
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");
      await axios.post(`${env.USER_SERVICE}/api/auth/verify-reset-otp`, {
        email: fpEmail,
        otp,
      });
      setStep(3);
      setMessage("OTP verified");
    } catch {
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setLoading(true);
      setMessage("");
      await axios.post(`${env.USER_SERVICE}/api/auth/reset-password`, {
        email: fpEmail,
        newPassword,
        confirmNewPassword,
      });
      setMessage("Password reset successful. Please login.");
      setTimeout(() => setShowForgotModal(false), 1500);
    } catch {
      setMessage("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

            <PrimaryButton type="submit" className="w-full">
              Login
            </PrimaryButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  (setShowForgotModal(true), setFpEmail(""), setStep(1), setMessage(""));
                }}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </main>
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-lg p-6 relative">
            <CloseButton onClick={() => setShowForgotModal(false)} />
            <h2 className="text-xl font-semibold text-blue-500 mb-4 text-center">
              Reset Password
            </h2>

            {message && (
              <p className="text-center text-neutral-600 text-sm mb-3">
                {message}
              </p>
            )}

            {step === 1 && (
              <>
                <InputField
                  name="email"
                  placeholder="Enter your email"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                />
                <PrimaryButton
                  className="w-full mt-3"
                  onClick={sendOtp}
                  disabled={loading}
                >
                  Send OTP
                </PrimaryButton>
              </>
            )}

            {step === 2 && (
              <>
                <InputField
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <PrimaryButton className="w-full mt-3" onClick={verifyOtp}>
                  Verify OTP
                </PrimaryButton>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-col gap-2">
                  <InputField
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputField
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <PrimaryButton className="w-full mt-3" onClick={resetPassword}>
                  Reset Password
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
