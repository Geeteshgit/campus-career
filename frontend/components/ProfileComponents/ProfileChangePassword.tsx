"use client";

import { useState } from "react";
import ProfileEditableField from "./ProfileEditableField";

interface ProfileChangePasswordProps {
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

const ProfileChangePassword = ({ onSubmit }: ProfileChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="flex flex-col gap-6 mt-4 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-800">Change Password</h3>

      <ProfileEditableField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={setCurrentPassword}
      />

      <ProfileEditableField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
      />

      <ProfileEditableField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <button
        onClick={handleSubmit}
        className="w-full h-12 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        Update Password
      </button>
    </div>
  );
};

export default ProfileChangePassword;
