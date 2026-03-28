"use client";

// React
import React from "react";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

// Features
import { usePasswordReset } from "@/features/auth";

type SendOtpStepProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onSuccess: () => void;
  message: string;
}

const SendOtpStep: React.FC<SendOtpStepProps> = ({
  email,
  onEmailChange,
  onSuccess,
}) => {
  const { handleSendOtp, sendOtpPending } = usePasswordReset();

  const sendOtp = async () => {
    try {
      await handleSendOtp(email);
      onSuccess();
    } catch (err: any) {
      console.error("Failed to send OTP:", err);
    }
  };

  return (
    <>
      <Input
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <Button
        variant="primary"
        className="w-full mt-3"
        onClick={sendOtp}
        disabled={sendOtpPending}
      >
        {sendOtpPending ? "Sending..." : "Send OTP"}
      </Button>
    </>
  );
};

export default SendOtpStep;
