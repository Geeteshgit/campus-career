"use client";

// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shared UI Components
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Types
import type { ChangePasswordFormData } from "../schemas/change-password.schema";

// Local Imports
import { useLogout } from "../hooks/useLogout";
import { useChangePasswordMutation } from "../api/auth.queries";
import { changePasswordSchema } from "../schemas/change-password.schema";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleLogout } = useLogout();
  const { changePassword } = useChangePasswordMutation();

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      await handleLogout();
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200"
    >
      <h3 className="text-xl font-semibold text-neutral-800">
        Change Password
      </h3>

      {/* Current Password */}
      <div>
        <FormLabel>Current Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter current password"
          {...register("oldPassword")}
        />
        <ErrorMessage message={errors.oldPassword?.message} />
      </div>

      {/* New Password */}
      <div>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter new password"
          {...register("newPassword")}
        />
        <ErrorMessage message={errors.newPassword?.message} />
      </div>

      {/* Confirm Password */}
      <div>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          type="password"
          placeholder="Re-enter new password"
          {...register("confirmPassword")}
        />
        <ErrorMessage message={errors.confirmPassword?.message} />
      </div>

      {/* Save Button */}
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;
