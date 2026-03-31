"use client";

// External Libraries
import { useFormContext } from "react-hook-form";

// Shared UI Components
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import FormLabel from "@/shared/ui/FormLabel";

// Features
import { usePasswordReset } from "@/features/auth";

type ResetPasswordStepProps = {
  onSuccess: () => void;
  onError: (message: string) => void;
};

const ResetPasswordStep = ({ onSuccess, onError }: ResetPasswordStepProps) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { handleResetPassword, resetPasswordPending } = usePasswordReset();

  const resetPassword = async () => {
    const isValid = await trigger(["newPassword", "confirmNewPassword"]);
    if (!isValid) return;

    const { email, newPassword, confirmNewPassword } = getValues();
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
        <div>
          <FormLabel htmlFor="newPassword" label="New Password" />
          <Input
            id="newPassword"
            type="password"
            placeholder="New password"
            {...register("newPassword")}
          />
          <ErrorMessage message={errors.newPassword?.message as string} />
        </div>
        <div>
          <FormLabel htmlFor="confirmNewPassword" label="Confirm New Password" />
          <Input
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmNewPassword")}
          />
          <ErrorMessage
            message={errors.confirmNewPassword?.message as string}
          />
        </div>
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
