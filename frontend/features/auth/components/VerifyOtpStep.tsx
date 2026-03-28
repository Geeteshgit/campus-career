"use client";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

// Features
import { usePasswordReset } from "@/features/auth";

type VerifyOtpStepProps = {
  email: string;
  otp: string;
  onOtpChange: (otp: string) => void;
  onSuccess: () => void;
  onError: (message: string) => void;
};

const VerifyOtpStep = ({
  email,
  otp,
  onOtpChange,
  onSuccess,
  onError,
}: VerifyOtpStepProps) => {
  const { handleVerifyOtp, verifyOtpPending } = usePasswordReset();

  const verifyOtp = async () => {
    try {
      await handleVerifyOtp(email, otp);
      onSuccess();
    } catch (err: unknown) {
      console.error("OTP verification failed:", err);
      onError("Invalid or expired OTP");
    }
  };

  return (
    <>
      <Input
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => onOtpChange(e.target.value)}
      />
      <Button
        variant="primary"
        className="w-full mt-3"
        onClick={verifyOtp}
        disabled={verifyOtpPending}
      >
        {verifyOtpPending ? "Verifying..." : "Verify OTP"}
      </Button>
    </>
  );
};

export default VerifyOtpStep;
