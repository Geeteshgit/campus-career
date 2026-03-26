"use client";

// React
import React, { useState } from "react";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Local Imports
import {
  useMyStudentProfile,
  useUpdateMyStudentProfile,
  useUploadStudentResume,
} from "@/features/student/hooks/useStudents";
import StudentDetailsView from "./StudentDetailsView";
import StudentDetailsForm from "./StudentDetailsForm";

const StudentDetails = (): React.JSX.Element => {
  const {
    data: studentData,
    isPending: studentLoading,
    isError: studentError,
    error: studentErrorObj,
  } = useMyStudentProfile();

  const student = studentData?.student;

  const { updateMyStudentProfile, isPending: updateStudentPending } =
    useUpdateMyStudentProfile();
  const { uploadStudentResume, isPending: uploadPending } =
    useUploadStudentResume();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cgpa, setCgpa] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);

  const handleEditStart = () => {
    setCgpa(student?.cgpa !== undefined && student?.cgpa !== null ? String(student.cgpa) : "");
    setSkills(Array.isArray(student?.skills) ? student.skills.join(", ") : "");
    setResume(null);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setCgpa(student?.cgpa !== undefined && student?.cgpa !== null ? String(student.cgpa) : "");
    setSkills(Array.isArray(student?.skills) ? student.skills.join(", ") : "");
    setResume(null);
    setIsEditing(false);
  };

  const handleAcademicInfoSave = async () => {
    try {
      const parsedSkills =
        typeof skills === "string"
          ? skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

      const parsedCgpa = cgpa.trim() === "" ? undefined : Number(cgpa);
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
              enrollmentNumber={student.enrollmentNumber ?? ""}
              program={student.program ?? ""}
              year={student.year ?? ""}
              batch={student.batch ?? ""}
              specialization={student.specialization ?? ""}
              cgpa={cgpa}
              skills={skills}
              resume={resume}
              isSaving={updateStudentPending}
              isUploadingResume={uploadPending}
              onCgpaChange={setCgpa}
              onSkillsChange={setSkills}
              onResumeChange={setResume}
              onSave={handleAcademicInfoSave}
              onCancel={handleEditCancel}
              onUploadResume={handleResumeUpload}
            />
          ) : (
            <StudentDetailsView
              enrollmentNumber={student.enrollmentNumber ?? ""}
              program={student.program ?? ""}
              year={student.year ?? ""}
              batch={student.batch ?? ""}
              specialization={student.specialization ?? ""}
              cgpa={student.cgpa !== undefined && student.cgpa !== null ? String(student.cgpa) : ""}
              skills={Array.isArray(student.skills) ? student.skills.join(", ") : ""}
              onEdit={handleEditStart}
            />
          ))}
      </AsyncState>
    </>
  );
};

export default StudentDetails;
