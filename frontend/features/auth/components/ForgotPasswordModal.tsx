"use client";

// React
import React, { useState } from "react";

// Shared UI Components
import CloseButton from "@/shared/ui/CloseButton";

// Local Imports
import ResetPasswordStep from "./ResetPasswordStep";
import SendOtpStep from "./SendOtpStep";
import VerifyOtpStep from "./VerifyOtpStep";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PasswordResetStep = 1 | 2 | 3;

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<PasswordResetStep>(1);
  const [fpEmail, setFpEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClose = () => {
    setFpEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setStep(1);
    setMessage("");
    onClose();
  };

  const handleSendOtpSuccess = () => {
    setStep(2);
    setMessage("OTP sent to your email");
  };

  const handleVerifyOtpSuccess = () => {
    setStep(3);
    setMessage("OTP verified");
  };

  const handleResetPasswordSuccess = () => {
    setMessage("Password reset successful. Please login.");
    setTimeout(() => handleClose(), 1500);
  };

  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-lg p-6 relative">
        <CloseButton onClick={handleClose} />
        <h2 className="text-xl font-semibold text-blue-500 mb-4 text-center">
          Reset Password
        </h2>

        {message && (
          <p className="text-center text-neutral-600 text-sm mb-3">{message}</p>
        )}

        {step === 1 && (
          <SendOtpStep
            email={fpEmail}
            onEmailChange={setFpEmail}
            onSuccess={handleSendOtpSuccess}
            message={message}
          />
        )}

        {step === 2 && (
          <VerifyOtpStep
            email={fpEmail}
            otp={otp}
            onOtpChange={setOtp}
            onSuccess={handleVerifyOtpSuccess}
            onError={handleError}
          />
        )}

        {step === 3 && (
          <ResetPasswordStep
            email={fpEmail}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            onPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmNewPassword}
            onSuccess={handleResetPasswordSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
