"use client";

// React
import { useState } from "react";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Types
import type { UpdateStudentFormData } from "../schemas/student.schema";

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

  const handleAcademicInfoSave = async (formData: UpdateStudentFormData) => {
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
        alert("Please enter a valid CGPA.");
        return;
      }

      await updateMyStudentProfile({
        cgpa: parsedCgpa,
        skills: parsedSkills,
      });
      alert("Academic details updated!");
      setIsEditing(false);
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
      await uploadStudentResume(resume);
      alert("Resume uploaded and skills updated successfully!");
      setResume(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume and extract skills");
    }
  };

  return (
    <>
      <AsyncState
        isLoading={studentLoading}
        isError={studentError}
        error={studentErrorObj}
        isEmpty={!student}
        loadingText="Loading student details"
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
    </>
  );
};

export default StudentDetails;
