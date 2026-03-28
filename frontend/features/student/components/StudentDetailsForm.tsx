"use client";

// Shared UI Components
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import TextArea from "@/shared/ui/TextArea";
import Button from "@/shared/ui/Button";
import FileUploadField from "@/shared/ui/FileUploadField";

type StudentDetailsFormProps = {
  enrollmentNumber: string;
  program: string;
  year: string;
  batch: string;
  specialization: string;
  cgpa: string;
  skills: string;
  resume: File | null;
  isSaving: boolean;
  isUploadingResume: boolean;
  onCgpaChange: (value: string) => void;
  onSkillsChange: (value: string) => void;
  onResumeChange: (file: File | null) => void;
  onSave: () => void;
  onCancel: () => void;
  onUploadResume: () => void;
};

const StudentDetailsForm = ({
  enrollmentNumber,
  program,
  year,
  batch,
  specialization,
  cgpa,
  skills,
  resume,
  isSaving,
  isUploadingResume,
  onCgpaChange,
  onSkillsChange,
  onResumeChange,
  onSave,
  onCancel,
  onUploadResume,
}: StudentDetailsFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-neutral-800">
        Edit Academic Details
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel>Enrollment Number</FormLabel>
          <Input readOnly value={enrollmentNumber} />
        </div>

        <div className="w-full">
          <FormLabel>Program</FormLabel>
          <Input readOnly value={program} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel>Year</FormLabel>
          <Input readOnly value={year} />
        </div>
        <div className="w-full">
          <FormLabel>Batch</FormLabel>
          <Input readOnly value={batch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel>Specialization</FormLabel>
          <Input readOnly value={specialization} />
        </div>

        <div className="w-full">
          <FormLabel>CGPA</FormLabel>
          <Input
            name="cgpa"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => onCgpaChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <FormLabel>Skills</FormLabel>
        <TextArea
          name="skills"
          value={skills}
          placeholder="Add your skills..."
          onChange={(e) => onSkillsChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col pt-4 border-t border-neutral-200">
        <FormLabel>Resume Upload</FormLabel>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
          <div className="flex-1">
            <FileUploadField file={resume} onChange={onResumeChange} />
          </div>
          <div>
            <Button
              variant="primary"
              disabled={isUploadingResume}
              onClick={onUploadResume}
            >
              Upload
            </Button>
          </div>
        </div>
        <p className="text-sm text-neutral-500 mt-3">
          Upload a PDF resume — AI will read it and automatically update your
          skills.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={onSave} disabled={isSaving}>
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSaving || isUploadingResume}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
