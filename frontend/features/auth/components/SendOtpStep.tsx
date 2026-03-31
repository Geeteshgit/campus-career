// External Libraries
import { useFormContext } from "react-hook-form";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import FormLabel from "@/shared/ui/FormLabel";

// Features
import { usePasswordReset } from "@/features/auth";

type SendOtpStepProps = {
  onSuccess: () => void;
};

const SendOtpStep = ({ onSuccess }: SendOtpStepProps) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { handleSendOtp, sendOtpPending } = usePasswordReset();

  const sendOtp = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;

    const email = getValues("email");
    try {
      await handleSendOtp(email);
      onSuccess();
    } catch (err: unknown) {
      console.error("Failed to send OTP:", err);
    }
  };

  return (
    <>
      <FormLabel htmlFor="forgot-email" label="Email" />
      <Input
        id="forgot-email"
        placeholder="Enter your email"
        {...register("email")}
      />
      <ErrorMessage message={errors.email?.message as string} />
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
