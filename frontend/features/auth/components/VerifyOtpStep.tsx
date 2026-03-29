// External Libraries
import { useFormContext } from "react-hook-form";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Features
import { usePasswordReset } from "@/features/auth";

type VerifyOtpStepProps = {
  onSuccess: () => void;
  onError: (message: string) => void;
};

const VerifyOtpStep = ({ onSuccess, onError }: VerifyOtpStepProps) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { handleVerifyOtp, verifyOtpPending } = usePasswordReset();

  const verifyOtp = async () => {
    const isValid = await trigger("otp");
    if (!isValid) return;

    const { email, otp } = getValues();
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
        placeholder="Enter OTP"
        {...register("otp")}
      />
      <ErrorMessage message={errors.otp?.message as string} />
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
