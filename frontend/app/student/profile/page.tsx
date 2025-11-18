"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserField } from "@/redux/features/user/userSlice";
import ProfileHeader from "@/components/ProfileComponents/ProfileHeader";
import ProfileReadOnlyField from "@/components/ProfileComponents/ProfileReadOnlyField";
import ProfileEditableField from "@/components/ProfileComponents/ProfileEditableField";
import ProfileTextarea from "@/components/ProfileComponents/ProfileTextarea";
import ProfileResumeUpload from "@/components/ProfileComponents/ProfileUploadField";
import ProfileSaveButton from "@/components/ProfileComponents/ProfileSaveButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [resume, setResume] = useState<File | null>(null);

  const handleSave = (): void => {
    console.log("Updated User:", user);
    console.log("Uploaded Resume:", resume);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (data: PasswordChangeData): void => {
    console.log("Password change request:", data);

    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password updated successfully!");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal and academic details"
        />
        <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-4 sm:p-8 shadow-sm flex flex-col gap-6 md:gap-8">
          <ProfileHeader name={user?.name ?? ""} />
          
          {/* NAME + ENROLLMENT */}
          <div className="flex flex-col md:flex-row gap-6">
            <ProfileReadOnlyField label="Name" value={user?.name ?? ""} />
            <ProfileReadOnlyField
              label="Enrollment Number"
              value={user?.enrollmentNumber ?? ""}
            />
          </div>

          {/* PHONE */}
          <ProfileEditableField
            label="Phone Number"
            value={user?.phone ?? ""}
            onChange={(v: string) =>
              dispatch(updateUserField({ field: "phone", value: v }))
            }
          />

          {/* DEPARTMENT + YEAR */}
          <div className="flex flex-col md:flex-row gap-6">
            <ProfileReadOnlyField label="Department" value={user?.department ?? ""} />
            <ProfileReadOnlyField label="Year" value={user?.year ?? ""} />
          </div>

          {/* CGPA */}
          <ProfileEditableField
            label="CGPA"
            value={user?.cgpa ?? ""}
            onChange={(v: string) =>
              dispatch(updateUserField({ field: "cgpa", value: v }))
            }
          />

          {/* SKILLS */}
          <ProfileTextarea
            label="Skills"
            value={user?.skills ?? ""}
            onChange={(v: string) =>
              dispatch(updateUserField({ field: "skills", value: v }))
            }
          />

          {/* RESUME UPLOAD */}
          <ProfileResumeUpload resume={resume} onChange={setResume} />

          {/* SAVE BUTTON */}
          <ProfileSaveButton onClick={handleSave} />

          {/* CHANGE PASSWORD */}
          <ProfileChangePassword onSubmit={handlePasswordChange} />
        </div>
      </main>
    </>
  );
};

export default Profile;