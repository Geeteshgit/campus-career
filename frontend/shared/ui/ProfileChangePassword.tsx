"use client";

// React
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// External Libraries
import axios from "axios";

// Config
import { env } from "@/config/env";

// Lib
import { disconnectSocket } from "@/lib/socket";

// Local Imports
import Button from "./Button";
import FormLabel from "./FormLabel";
import Input from "./Input";

// Features
import { useAuthStore } from "@/features/auth";

interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileChangePassword = (): React.JSX.Element => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  const handlePasswordChange = async (data: PasswordChangeData) => {
    if (data.newPassword !== data.confirmPassword)
      return alert("Passwords do not match!");

    try {
      await axios.put(
        `${env.USER_SERVICE}/api/auth/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true },
      );

      handleLogout();
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${env.USER_SERVICE}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      
      logoutStore();
      disconnectSocket();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
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
          name="currentPassword"
          type="password"
          placeholder="Enter current password"
          value={oldPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
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
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          required={true}
        />
      </div>

      {/* Save Button */}
      <Button
        variant="primary"
        onClick={() =>
          handlePasswordChange({ oldPassword, newPassword, confirmPassword })
        }
      >
        Change Password
      </Button>
    </div>
  );
};

export default ProfileChangePassword;
