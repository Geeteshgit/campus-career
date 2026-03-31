// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shared UI Components
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";
import ErrorMessage from "@/shared/ui/ErrorMessage";

// Types
import type { User } from "../types/user.types";
import type { UpdateUserFormData } from "../schemas/user.schema";

// Local Imports
import { updateUserSchema } from "../schemas/user.schema";

type UserDetailsFormProps = {
  data: User;
  onSave: (data: UpdateUserFormData) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
};

const UserDetailsForm = ({
  data,
  onSave,
  onCancel,
  isSaving,
}: UserDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      phone: data?.phone ?? "",
    },
  });

  const onSubmit = (formData: UpdateUserFormData) => {
    onSave(formData);
  };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold text-neutral-800">
        Edit Personal Details
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel htmlFor="name" label="Name" />
          <Input id="name" readOnly value={data?.name ?? ""} />
        </div>

        <div className="w-full">
          <FormLabel htmlFor="email" label="Email" />
          <Input id="email" readOnly value={data?.email ?? ""} />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="phone" label="Phone Number" />
        <Input id="phone" placeholder="Phone Number" {...register("phone")} />
        <ErrorMessage message={errors.phone?.message} />
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
          disabled={isSaving || isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserDetailsForm;
