"use client";

// React
import { useState } from "react";
import toast from "react-hot-toast";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Types
import type { StudentSelfUpdateFormData } from "../schemas/student.schema";

// Local Imports
import {
  useMyStudentProfile,
  useUpdateMyStudentProfile,
  useUploadStudentResume,
} from "@/features/student/hooks/useStudents";
import StudentDetailsView from "./StudentDetailsView";
import StudentDetailsForm from "./StudentDetailsForm";

const StudentDetails = () => {
  const { student, studentLoading, studentError, studentErrorObj } =
    useMyStudentProfile();
  const { updateMyStudentProfile, isPending: updateStudentPending } =
    useUpdateMyStudentProfile();
  const { uploadStudentResume, isPending: uploadPending } =
    useUploadStudentResume();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [resume, setResume] = useState<File | null>(null);

  const handleEditStart = () => {
    setResume(null);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setResume(null);
    setIsEditing(false);
  };

  const handleAcademicInfoSave = async (
    formData: StudentSelfUpdateFormData,
  ) => {
    try {
      const parsedSkills =
        typeof formData.skills === "string"
          ? formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

      const parsedCgpa = formData.cgpa
        ? String(formData.cgpa).trim() === ""
          ? undefined
          : Number(formData.cgpa)
        : undefined;
      if (parsedCgpa !== undefined && Number.isNaN(parsedCgpa)) {
        toast.error("Please enter a valid CGPA.");
        return;
      }

      await updateMyStudentProfile({
        cgpa: parsedCgpa,
        skills: parsedSkills,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleResumeUpload = async () => {
    if (!resume) {
      toast.error("Please select a resume PDF to upload first.");
      return;
    }

    try {
      await uploadStudentResume(resume);
      toast.success("Resume uploaded successfully");
      setResume(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload resume");
    }
  };

  return (
    <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6">
      <AsyncState
        isLoading={studentLoading}
        isError={studentError}
        error={studentErrorObj}
        isEmpty={!student}
        errorText="Failed to load student details"
        emptyText="No student details found"
      >
        {student &&
          (isEditing ? (
            <StudentDetailsForm
              data={student}
              resume={resume}
              isSaving={updateStudentPending}
              isUploadingResume={uploadPending}
              onResumeChange={setResume}
              onSave={handleAcademicInfoSave}
              onCancel={handleEditCancel}
              onUploadResume={handleResumeUpload}
            />
          ) : (
            <StudentDetailsView data={student} onEdit={handleEditStart} />
          ))}
      </AsyncState>
    </div>
  );
};

export default StudentDetails;
