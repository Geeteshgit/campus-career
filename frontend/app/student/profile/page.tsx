"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logout,
  updateUserField,
  updateStudentField,
  login,
} from "@/redux/features/user/userSlice";
import ReadOnlyField from "@/components/FormComponents/ReadonlyField";
import InputField from "@/components/FormComponents/InputField";
import TextAreaField from "@/components/FormComponents/TextareaField";
import FileUploadField from "@/components/FormComponents/FileUploadField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";
import FormLabel from "@/components/FormComponents/FormLabel";
import { useRouter } from "next/navigation";
import DangerButton from "@/components/ui/DangerButton";
import { disconnectSocket } from "@/lib/socket";
import axios from "axios";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";

const StudentProfile = (): React.JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const student = useAppSelector((state) => state.user.studentProfile);

  const [resume, setResume] = useState<File | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleAccountInfoSave = async () => {
    try {
      const response = await axios.put(
        `${env.USER_SERVICE}/api/user`,
        { phone: user?.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        login({
          user: response.data.updatedUser,
          studentProfile: student,
        })
      );

      alert("Account details updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update account");
    }
  };

  const handleAcademicInfoSave = async () => {
    try {
      const response = await axios.put(
        `${env.USER_SERVICE}/api/student/me`,
        {
          cgpa: student?.cgpa,
          skills: student?.skills
            ?.split(",")
            .map((s) => s.trim())
            .filter((s) => s !== ""),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        login({
          user,
          studentProfile: response.data.updatedStudent,
        })
      );

      alert("Academic details updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update academic details");
    }
  };

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
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <PageHeader
              title="My Profile"
              subtitle="Manage your personal and academic details"
            />
            <DangerButton onClick={handleLogout}>Logout</DangerButton>
          </div>

          <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-6 pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <FormLabel>Name</FormLabel>
                  <ReadOnlyField value={user?.name ?? ""} />
                </div>

                <div className="w-full">
                  <FormLabel>Email</FormLabel>
                  <ReadOnlyField value={user?.email ?? ""} />
                </div>
              </div>

              <div>
                <FormLabel>Phone Number</FormLabel>
                <InputField
                  name="phone"
                  placeholder="Phone Number"
                  value={user?.phone ?? ""}
                  onChange={(e) =>
                    dispatch(
                      updateUserField({
                        field: "phone",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>

              <PrimaryButton onClick={handleAccountInfoSave}>
                Save
              </PrimaryButton>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <FormLabel>Enrollment Number</FormLabel>
                  <ReadOnlyField value={student?.enrollmentNumber ?? ""} />
                </div>

                <div className="w-full">
                  <FormLabel>Program</FormLabel>
                  <ReadOnlyField value={student?.program ?? ""} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <FormLabel>Year</FormLabel>
                  <ReadOnlyField value={student?.year ?? ""} />
                </div>

                <div className="w-full">
                  <FormLabel>CGPA</FormLabel>
                  <InputField
                    name="cgpa"
                    placeholder="CGPA"
                    value={student?.cgpa ?? ""}
                    onChange={(e) =>
                      dispatch(
                        updateStudentField({
                          field: "cgpa",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <FormLabel>Skills</FormLabel>
                <TextAreaField
                  name="skills"
                  value={
                    Array.isArray(student?.skills)
                      ? student.skills.join(", ")
                      : student?.skills ?? ""
                  }
                  placeholder="Add your skills..."
                  onChange={(e) =>
                    dispatch(
                      updateStudentField({
                        field: "skills",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>

              <div>
                <FormLabel>Resume Upload</FormLabel>
                <FileUploadField file={resume} onChange={setResume} />
              </div>

              <PrimaryButton onClick={handleAcademicInfoSave}>
                Save
              </PrimaryButton>
            </div>

            <ProfileChangePassword onSubmit={handlePasswordChange} />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default StudentProfile;
