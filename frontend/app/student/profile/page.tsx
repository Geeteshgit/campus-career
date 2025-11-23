"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserField } from "@/redux/features/user/userSlice";

import ReadOnlyField from "@/components/FormComponents/ReadonlyField"; 
import InputField from "@/components/FormComponents/InputField";
import TextAreaField from "@/components/FormComponents/TextareaField";
import FileUploadField from "@/components/FormComponents/FileUploadField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";
import FormLabel from "@/components/FormComponents/FormLabel";

const Profile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [resume, setResume] = useState<File | null>(null);

  const handleSave = () => {
    alert("Profile Saved!");
  };

  const handlePasswordChange = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return alert("Passwords do not match!");
    }
    alert("Password updated");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal and academic details"
        />

        <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6 flex flex-col gap-6">

          {/* NAME + ENROLL */}
          <div className="flex flex-col md:flex-row gap-6">

            <div className="w-full">
              <FormLabel>Name</FormLabel>
              <ReadOnlyField value={user?.name ?? ""} />
            </div>

            <div className="w-full">
              <FormLabel>Enrollment Number</FormLabel>
              <ReadOnlyField value={user?.enrollmentNumber ?? ""} />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <FormLabel>Phone Number</FormLabel>
            <InputField
              name="phone"
              placeholder="Phone Number"
              value={user?.phone ?? ""}
              onChange={(e) =>
                dispatch(updateUserField({ field: "phone", value: e.target.value }))
              }
            />
          </div>

          {/* DEPT + YEAR */}
          <div className="flex flex-col md:flex-row gap-6">

            <div className="w-full">
              <FormLabel>Department</FormLabel>
              <ReadOnlyField value={user?.department ?? ""} />
            </div>

            <div className="w-full">
              <FormLabel>Year</FormLabel>
              <ReadOnlyField value={user?.year ?? ""} />
            </div>
          </div>

          {/* CGPA */}
          <div>
            <FormLabel>CGPA</FormLabel>
            <InputField
              name="cgpa"
              placeholder="CGPA"
              value={user?.cgpa ?? ""}
              onChange={(e) =>
                dispatch(updateUserField({ field: "cgpa", value: e.target.value }))
              }
            />
          </div>

          {/* SKILLS */}
          <div>
            <FormLabel>Skills</FormLabel>
            <TextAreaField
              name="skills"
              value={user?.skills ?? ""}
              placeholder="Add your skills..."
              onChange={(e) =>
                dispatch(updateUserField({ field: "skills", value: e.target.value }))
              }
            />
          </div>

          {/* RESUME UPLOAD */}
          <div>
            <FormLabel>Resume Upload</FormLabel>
            <FileUploadField file={resume} onChange={setResume} />
          </div>

          {/* SAVE BUTTON */}
          <PrimaryButton children="Save" onClick={handleSave} />

          {/* CHANGE PASSWORD */}
          <ProfileChangePassword onSubmit={handlePasswordChange} />

        </div>
      </main>
    </>
  );
};

export default Profile;
