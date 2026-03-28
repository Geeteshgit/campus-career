"use client";

// React
import React from "react";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

// Features
import { usePasswordReset } from "@/features/auth";

type ResetPasswordStepProps = {
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
  const { handleResetPassword, resetPasswordPending } = usePasswordReset();

  const resetPassword = async () => {
    try {
      await handleResetPassword(email, newPassword, confirmNewPassword);
      onSuccess();
    } catch (err: unknown) {
      console.error("Password reset failed:", err);
      onError("Failed to reset password");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Input
          name="newPassword"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <Input
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />
      </div>
      <Button
        variant="primary"
        className="w-full mt-3"
        onClick={resetPassword}
        disabled={resetPasswordPending}
      >
        {resetPasswordPending ? "Resetting..." : "Reset Password"}
      </Button>
    </>
  );
};

export default ResetPasswordStep;
