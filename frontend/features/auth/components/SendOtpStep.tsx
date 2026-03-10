"use client";
import React, { useState } from "react";
import InputField from "@/shared/ui/InputField";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";

interface SendOtpStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSuccess: () => void;
  message: string;
}

const SendOtpStep: React.FC<SendOtpStepProps> = ({
  email,
  onEmailChange,
  onSuccess,
  message,
}) => {
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${env.USER_SERVICE}/api/auth/forgot-password`,
        {
          email,
        },
      );
      onSuccess();
    } catch (err: any) {
      console.error("Failed to send OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputField
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <PrimaryButton
        className="w-full mt-3"
        onClick={sendOtp}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </PrimaryButton>
    </>
  );
};

export default SendOtpStep;
