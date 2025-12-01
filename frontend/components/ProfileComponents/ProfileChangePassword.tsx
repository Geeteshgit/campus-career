"use client";

import React, { useState } from "react";
import FormLabel from "@/components/FormComponents/FormLabel";
import InputField from "@/components/FormComponents/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import axios from "axios";
import { env } from "@/config/env";
import { disconnectSocket } from "@/lib/socket";
import { logout } from "@/redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ProfileChangePassword = (): React.JSX.Element => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handlePasswordChange = async (data: any) => {
    if (data.newPassword !== data.confirmPassword)
      return alert("Passwords do not match!");

    try {
      await axios.put(
        `${env.USER_SERVICE}/api/auth/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleLogout();
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  const handleLogout = () => {
    disconnectSocket();
    dispatch(logout());
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="flex flex-col gap-6 mt-4 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-800">
        Change Password
      </h3>

      {/* Current Password */}
      <div>
        <FormLabel>Current Password</FormLabel>
        <InputField
          name="currentPassword"
          type="password"
          placeholder="Enter current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required={true}
        />
      </div>

      {/* New Password */}
      <div>
        <FormLabel>New Password</FormLabel>
        <InputField
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required={true}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <FormLabel>Confirm New Password</FormLabel>
        <InputField
          name="confirmPassword"
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />
      </div>

      {/* Save Button */}
      <PrimaryButton
        onClick={() =>
          handlePasswordChange({ oldPassword, newPassword, confirmPassword })
        }
      >
        Change Password
      </PrimaryButton>
    </div>
  );
};

export default ProfileChangePassword;
