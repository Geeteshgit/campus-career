"use client";
import React, { useState } from "react";
import InputField from "@/shared/ui/InputField";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";

interface ResetPasswordStepProps {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({
  email,
  newPassword,
  confirmNewPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${env.USER_SERVICE}/api/auth/reset-password`, {
        email,
        newPassword,
        confirmNewPassword,
      });
      onSuccess();
    } catch (err: any) {
      console.error("Password reset failed:", err);
      onError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <InputField
          name="newPassword"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <InputField
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />
      </div>
      <PrimaryButton
        className="w-full mt-3"
        onClick={resetPassword}
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </PrimaryButton>
    </>
  );
};

export default ResetPasswordStep;
