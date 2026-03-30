// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { Student } from "../types/student.types";
import type { StudentSelfUpdateFormData } from "../schemas/student.schema";

// Shared UI Components
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import TextArea from "@/shared/ui/TextArea";
import Button from "@/shared/ui/Button";
import FileUploadField from "@/shared/ui/FileUploadField";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Local Imports
import { studentSelfUpdateSchema } from "../schemas/student.schema";

type StudentDetailsFormProps = {
  data: Student;
  resume: File | null;
  isSaving: boolean;
  isUploadingResume: boolean;
  onResumeChange: (file: File | null) => void;
  onSave: (data: StudentSelfUpdateFormData) => Promise<void>;
  onCancel: () => void;
  onUploadResume: () => void;
};

const StudentDetailsForm = ({
  data,
  resume,
  isSaving,
  isUploadingResume,
  onResumeChange,
  onSave,
  onCancel,
  onUploadResume,
}: StudentDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentSelfUpdateFormData>({
    resolver: zodResolver(studentSelfUpdateSchema),
    defaultValues: {
      cgpa: data?.cgpa ?? 0,
      skills: Array.isArray(data?.skills) ? data.skills.join(", ") : "",
    },
  });

  const onSubmit = async (formData: StudentSelfUpdateFormData) => {
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-neutral-800">
        Edit Academic Details
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel htmlFor="enrollmentNumber" label="Enrollment Number" />
          <Input
            id="enrollmentNumber"
            readOnly
            value={data?.enrollmentNumber ?? ""}
          />
        </div>

        <div className="w-full">
          <FormLabel htmlFor="program" label="Program" />
          <Input id="program" readOnly value={data?.program ?? ""} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel htmlFor="year" label="Year" />
          <Input id="year" readOnly value={data?.year ?? ""} />
        </div>
        <div className="w-full">
          <FormLabel htmlFor="batch" label="Batch" />
          <Input id="batch" readOnly value={data?.batch ?? ""} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel htmlFor="specialization" label="Specialization" />
          <Input
            id="specialization"
            readOnly
            value={data?.specialization ?? ""}
          />
        </div>

        <div className="w-full">
          <FormLabel htmlFor="cgpa" label="CGPA" />
          <Input
            id="cgpa"
            placeholder="CGPA"
            {...register("cgpa", { valueAsNumber: true })}
          />
          <ErrorMessage message={errors.cgpa?.message} />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="skills" label="Skills" />
        <TextArea
          id="skills"
          placeholder="Add your skills..."
          {...register("skills")}
        />
        <ErrorMessage message={errors.skills?.message} />
      </div>

      <div className="flex flex-col pt-4 border-t border-neutral-200">
        <FormLabel htmlFor="resume" label="Resume Upload" />
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
          <div className="flex-1">
            <FileUploadField id="resume" file={resume} onFileChange={onResumeChange} />
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
        <Button
          variant="primary"
          type="submit"
          disabled={isSaving || isSubmitting}
        >
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
    </form>
  );
};

export default StudentDetailsForm;
