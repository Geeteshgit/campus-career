// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { StudentFormData } from "../schemas/student.schema";

// Shared UI Components
import Modal from "@/shared/ui/Modal";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import Select from "@/shared/ui/Select";
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";

// Features
import { usePrograms } from "@/features/academic/program";

// Local Imports
import { studentFormSchema } from "../schemas/student.schema";
import { years } from "@/shared/constants/academics.constants";

type AdminFormModalProps = {
  mode: "create" | "edit";
  defaultValues: StudentFormData;
  onSubmit: (data: StudentFormData) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdminFormModal = ({
  mode,
  defaultValues,
  onSubmit,
  open,
  onOpenChange,
}: AdminFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  });

  const { programs } = usePrograms();

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-neutral-800">
          {mode === "create" ? "Create Student" : "Edit Student"}
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="name" label="Name" />
            <Input id="name" {...register("name")} placeholder="Name" />
            <ErrorMessage message={errors.name?.message} />
          </div>
          <div>
            <FormLabel htmlFor="enrollmentNumber" label="Enrollment Number" />
            <Input
              id="enrollmentNumber"
              {...register("enrollmentNumber")}
              placeholder="Enrollment Number"
            />
            <ErrorMessage message={errors.enrollmentNumber?.message} />
          </div>
          <div>
            <FormLabel htmlFor="email" label="Email" />
            <Input id="email" {...register("email")} placeholder="Email" />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div>
            <FormLabel htmlFor="program" label="Program" />
            <Select
              id="program"
              options={programs.map((program) => program.name)}
              {...register("program")}
            />
            <ErrorMessage message={errors.program?.message} />
          </div>
          <div>
            <FormLabel htmlFor="year" label="Year" />
            <Select id="year" options={years} {...register("year")} />
            <ErrorMessage message={errors.year?.message} />
          </div>
          <div>
            <FormLabel htmlFor="batch" label="Batch" />
            <Input id="batch" {...register("batch")} placeholder="Batch" />
            <ErrorMessage message={errors.batch?.message} />
          </div>
          <div>
            <FormLabel htmlFor="specialization" label="Specialization" />
            <Input
              id="specialization"
              {...register("specialization")}
              placeholder="Specialization"
            />
            <ErrorMessage message={errors.specialization?.message} />
          </div>
          <div>
            <FormLabel htmlFor="phone" label="Phone" />
            <Input id="phone" {...register("phone")} placeholder="Phone" />
            <ErrorMessage message={errors.phone?.message} />
          </div>
          <div>
            <FormLabel htmlFor="cgpa" label="CGPA" />
            <Input id="cgpa" {...register("cgpa", { valueAsNumber: true })} placeholder="CGPA" />
            <ErrorMessage message={errors.cgpa?.message} />
          </div>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Create Student" : "Update Student"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminFormModal;
