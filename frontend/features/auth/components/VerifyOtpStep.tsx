"use client";
import React, { useState } from "react";
import InputField from "@/shared/ui/InputField";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";

interface VerifyOtpStepProps {
  email: string;
  otp: string;
  onOtpChange: (otp: string) => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const VerifyOtpStep: React.FC<VerifyOtpStepProps> = ({
  email,
  otp,
  onOtpChange,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${env.USER_SERVICE}/api/auth/verify-reset-otp`, {
        email,
        otp,
      });
      onSuccess();
    } catch (err: any) {
      console.error("OTP verification failed:", err);
      onError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputField
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => onOtpChange(e.target.value)}
      />
      <PrimaryButton
        className="w-full mt-3"
        onClick={verifyOtp}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </PrimaryButton>
    </>
  );
};

export default VerifyOtpStep;
