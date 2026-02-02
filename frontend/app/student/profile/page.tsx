"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateUserField,
  updateStudentField,
  login,
  logout,
} from "@/redux/features/user/userSlice";
import ReadOnlyField from "@/components/FormComponents/ReadonlyField";
import InputField from "@/components/FormComponents/InputField";
import TextAreaField from "@/components/FormComponents/TextareaField";
import FileUploadField from "@/components/FormComponents/FileUploadField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";
import FormLabel from "@/components/FormComponents/FormLabel";
import DangerButton from "@/components/ui/DangerButton";
import axios from "axios";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";
import { disconnectSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";

const StudentProfile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);
  const student = useAppSelector((state) => state.user.studentProfile);

  const [resume, setResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleAccountInfoSave = async () => {
    try {
      const response = await axios.put(
        `${env.USER_SERVICE}/api/user`,
        { phone: user?.phone },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch(
        login({
          user: response.data.updatedUser,
          studentProfile: student,
        }),
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
          skills:
            typeof student?.skills === "string"
              ? student.skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : Array.isArray(student?.skills)
                ? student.skills
                : [],
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch(
        login({
          user,
          studentProfile: response.data.updatedStudent,
        }),
      );
      alert("Academic details updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update academic details");
    }
  };

  const handleResumeUpload = async () => {
    if (!resume) {
      alert("Please select a resume PDF to upload first.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", resume);

      const response = await axios.post(
        `${env.USER_SERVICE}/api/student/me/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(
        login({
          user,
          studentProfile: response.data.updatedStudent,
        }),
      );
      alert("Resume uploaded and skills updated successfully!");
      setResume(null);
      setUploading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume and extract skills");
    } finally {
      setUploading(false);
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
                      }),
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
                  <FormLabel>Batch</FormLabel>
                  <ReadOnlyField value={student?.batch ?? ""} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <FormLabel>Specialization</FormLabel>
                  <ReadOnlyField value={student?.specialization ?? ""} />
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
                        }),
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
                      : (student?.skills ?? "")
                  }
                  placeholder="Add your skills..."
                  onChange={(e) =>
                    dispatch(
                      updateStudentField({
                        field: "skills",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </div>

              <PrimaryButton onClick={handleAcademicInfoSave}>
                Save
              </PrimaryButton>
            </div>

            <div className="flex flex-col pt-4 border-t border-neutral-200">
              <FormLabel>Resume Upload</FormLabel>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
                <div className="flex-1">
                  <FileUploadField file={resume} onChange={setResume} />
                </div>
                <div>
                  <PrimaryButton
                    disabled={uploading}
                    onClick={handleResumeUpload}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </PrimaryButton>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mt-3">
                Upload a PDF resume — AI will read it and automatically update
                your skills.
              </p>
            </div>

            <ProfileChangePassword />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default StudentProfile;
