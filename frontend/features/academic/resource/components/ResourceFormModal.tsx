// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { ResourceFormData } from "../schemas/resource.schema";

// Shared UI Components
import Modal from "@/shared/ui/Modal";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import Select from "@/shared/ui/Select";
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";

// Local Imports
import { resourceFormSchema } from "../schemas/resource.schema";
import { usePrograms } from "../../program";

type ResourceFormModalProps = {
  mode: "create" | "edit";
  defaultValues: ResourceFormData;
  onSubmit: (data: ResourceFormData) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResourceFormModal = ({
  mode,
  defaultValues,
  onSubmit,
  open,
  onOpenChange,
}: ResourceFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues,
  });

  const { programs } = usePrograms();

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-neutral-800">
          {mode === "create" ? "Create Resource" : "Edit Resource"}
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="title" label="Title" />
            <Input
              id="title"
              {...register("title")}
              placeholder="Resource Title"
            />
            <ErrorMessage message={errors.title?.message} />
          </div>
          <div>
            <FormLabel htmlFor="url" label="URL" />
            <Input id="url" {...register("url")} placeholder="Resource URL" />
            <ErrorMessage message={errors.url?.message} />
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
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Create Resource" : "Update Resource"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ResourceFormModal;
