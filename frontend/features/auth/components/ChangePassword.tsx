"use client";

// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Types
import type { ChangePasswordFormData } from "../schemas/change-password.schema";

// Shared UI Components
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Local Imports
import { useLogout } from "../hooks/useLogout";
import { useChangePasswordMutation } from "../hooks/mutations";
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
      toast.success("Password changed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 bg-neutral-50 p-6 rounded-xl border border-neutral-300"
    >
      <h2 className="text-xl font-semibold text-neutral-800">
        Change Password
      </h2>
      <div className="flex flex-col gap-3">
        <div>
          <FormLabel htmlFor="oldPassword" label="Current Password" />
          <Input
            id="oldPassword"
            type="password"
            placeholder="Enter current password"
            {...register("oldPassword")}
          />
          <ErrorMessage message={errors.oldPassword?.message} />
        </div>
        <div>
          <FormLabel htmlFor="newPassword" label="New Password" />
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            {...register("newPassword")}
          />
          <ErrorMessage message={errors.newPassword?.message} />
        </div>
        <div>
          <FormLabel htmlFor="confirmPassword" label="Confirm New Password" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            {...register("confirmPassword")}
          />
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
      </div>

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;
