"use client";

// React
import React, { useState } from "react";

// Shared UI Components
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";

// Features
import { useChangePasswordMutation, useLogout } from "@/features/auth";

type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ProfileChangePassword = (): React.JSX.Element => {
  const [passwordFormData, setPasswordFormData] = useState<ChangePasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { handleLogout, logoutPending } = useLogout();
  const { changePassword, isPending: updatePending } = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
  };

  const handlePasswordChange = async (data: ChangePasswordData) => {
    if (data.newPassword !== data.confirmPassword)
      return alert("Passwords do not match!");

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
    <div className="flex flex-col gap-6 mt-4 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-800">
        Change Password
      </h3>

      {/* Current Password */}
      <div>
        <FormLabel>Current Password</FormLabel>
        <Input
          name="oldPassword"
          type="password"
          placeholder="Enter current password"
          value={passwordFormData.oldPassword}
          onChange={handleChange}
          required={true}
        />
      </div>

      {/* New Password */}
      <div>
        <FormLabel>New Password</FormLabel>
        <Input
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          value={passwordFormData.newPassword}
          onChange={handleChange}
          required={true}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <FormLabel>Confirm New Password</FormLabel>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter new password"
          value={passwordFormData.confirmPassword}
          onChange={handleChange}
          required={true}
        />
      </div>

      {/* Save Button */}
      <Button
        variant="primary"
        onClick={() => handlePasswordChange(passwordFormData)}
        disabled={updatePending || logoutPending}
      >
        Change Password
      </Button>
    </div>
  );
};

export default ProfileChangePassword;
