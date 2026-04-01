// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import type { AdminFormData } from "../schemas/admin.schema";
import type { Role } from "@/features/auth";

// Shared UI Components
import Modal from "@/shared/ui/Modal";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import Select from "@/shared/ui/Select";
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";

// Local Imports
import { adminFormSchema } from "../schemas/admin.schema";

type AdminFormModalProps = {
  mode: "create" | "edit";
  role: Role;
  defaultValues: AdminFormData;
  onSubmit: (data: AdminFormData) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdminFormModal = ({
  mode,
  role,
  defaultValues,
  onSubmit,
  open,
  onOpenChange,
}: AdminFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      ...defaultValues,
      role: role === "admin" ? "admin" : defaultValues?.role,
    },
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-neutral-800">
          {mode === "create" ? "Create Admin" : "Edit Admin"}
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="name" label="Name" />
            <Input id="name" {...register("name")} placeholder="Name" />
            <ErrorMessage message={errors.name?.message} />
          </div>
          <div>
            <FormLabel htmlFor="email" label="Email" />
            <Input id="email" {...register("email")} placeholder="Email" />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div>
            <FormLabel htmlFor="phone" label="Phone" />
            <Input id="phone" {...register("phone")} placeholder="Phone" />
            <ErrorMessage message={errors.phone?.message} />
          </div>

          {role === "super_admin" && (
            <div>
              <FormLabel htmlFor="role" label="Role" />
              <Select
                id="role"
                options={["admin", "super_admin"]}
                {...register("role")}
              />
              <ErrorMessage message={errors.role?.message} />
            </div>
          )}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Create Admin" : "Update Admin"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminFormModal;
