"use client";

// React
import { useState } from "react";

// External Libraries
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { ForgotPasswordFormData } from "../schemas/forgot-password.schema";

// Shared UI Components
import CloseButton from "@/shared/ui/CloseButton";

// Local Imports
import ResetPasswordStep from "./ResetPasswordStep";
import SendOtpStep from "./SendOtpStep";
import VerifyOtpStep from "./VerifyOtpStep";
import { forgotPasswordSchema } from "../schemas/forgot-password.schema";
import toast from "react-hot-toast";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PasswordResetStep = 1 | 2 | 3;

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<PasswordResetStep>(1);
  const [message, setMessage] = useState<string>("");

  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleClose = () => {
    methods.reset();
    setStep(1);
    setMessage("");
    onClose();
  };

  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  if (!isOpen) return null;

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-lg p-6 relative">
          <CloseButton onClick={handleClose} />
          <h2 className="text-xl font-semibold text-blue-500 mb-4 text-center">
            Reset Password
          </h2>

          {message && (
            <p className="text-center text-neutral-600 text-sm mb-3">
              {message}
            </p>
          )}

          {step === 1 && (
            <SendOtpStep
              onSuccess={() => {
                setStep(2);
                setMessage("OTP sent to your email");
              }}
            />
          )}

          {step === 2 && (
            <VerifyOtpStep
              onSuccess={() => {
                setStep(3);
                setMessage("OTP verified");
              }}
              onError={handleError}
            />
          )}

          {step === 3 && (
            <ResetPasswordStep
              onSuccess={() => {
                toast.success("Password reset successfully");
                handleClose();
              }}
              onError={handleError}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default ForgotPasswordModal;
