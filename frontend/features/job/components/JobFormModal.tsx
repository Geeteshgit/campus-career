// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { JobFormData } from "../schemas/job.schema";

// Shared UI Components
import Modal from "@/shared/ui/Modal";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import Select from "@/shared/ui/Select";
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import TextArea from "@/shared/ui/TextArea";

// Local Imports
import { jobFormSchema } from "../schemas/job.schema";

type JobFormModalProps = {
  mode: "create" | "edit";
  defaultValues: JobFormData;
  onSubmit: (data: JobFormData) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const JobFormModal = ({
  mode,
  defaultValues,
  onSubmit,
  open,
  onOpenChange,
}: JobFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      ...defaultValues,
      status: defaultValues?.status || "Active",
    },
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-neutral-800">
          {mode === "create" ? "Create Job Posting" : "Edit Job Posting"}
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="company" label="Company" />
            <Input
              id="company"
              {...register("company")}
              placeholder="Company"
            />
            <ErrorMessage message={errors.company?.message} />
          </div>
          <div>
            <FormLabel htmlFor="role" label="Role" />
            <Input id="role" {...register("role")} placeholder="Job Role" />
            <ErrorMessage message={errors.role?.message} />
          </div>
          <div>
            <FormLabel htmlFor="location" label="Location" />
            <Input
              id="location"
              {...register("location")}
              placeholder="Location"
            />
            <ErrorMessage message={errors.location?.message} />
          </div>
          <div>
            <FormLabel htmlFor="package" label="Package" />
            <Input
              id="package"
              {...register("package")}
              placeholder="Package / Salary"
            />
            <ErrorMessage message={errors.package?.message} />
          </div>
          <div>
            <FormLabel htmlFor="deadline" label="Application Deadline" />
            <Input id="deadline" type="date" {...register("deadline")} />
            <ErrorMessage message={errors.deadline?.message} />
          </div>
          <div>
            <FormLabel htmlFor="positions" label="Available Positions" />
            <Input
              id="positions"
              type="number"
              {...register("positions", { valueAsNumber: true })}
              placeholder="Available Positions"
            />
            <ErrorMessage message={errors.positions?.message} />
          </div>
          <div>
            <FormLabel htmlFor="type" label="Job Type" />
            <Select
              id="type"
              options={["Full-Time", "Internship"]}
              {...register("type")}
            />
            <ErrorMessage message={errors.type?.message} />
          </div>
          <div>
            <FormLabel htmlFor="description" label="Job Description" />
            <TextArea
              id="description"
              {...register("description")}
              placeholder="Job Description"
            />
            <ErrorMessage message={errors.description?.message} />
          </div>
          <div>
            <FormLabel htmlFor="requirements" label="Requirements" />
            <TextArea
              id="requirements"
              {...register("requirements")}
              placeholder="Requirements (one per line)"
            />
            <ErrorMessage message={errors.requirements?.message} />
          </div>
          <div>
            <FormLabel htmlFor="eligibility" label="Eligibility" />
            <TextArea
              id="eligibility"
              {...register("eligibility")}
              placeholder="Eligibility Criteria"
            />
            <ErrorMessage message={errors.eligibility?.message} />
          </div>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Create Job Posting" : "Update Job Posting"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JobFormModal;
