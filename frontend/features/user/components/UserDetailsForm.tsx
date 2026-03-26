"use client";

// React
import React, { useState } from "react";

// Shared UI Components
import Button from "@/shared/ui/Button";
import FormLabel from "@/shared/ui/FormLabel";
import Input from "@/shared/ui/Input";

// Local Imports
import { UpdateUserPayload, User } from "../types/user.types";

type UserDetailsFormProps = {
  data: User;
  onSave: (payload: UpdateUserPayload) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
};

const UserDetailsForm = ({
  data,
  onSave,
  onCancel,
  isSaving,
}: UserDetailsFormProps): React.JSX.Element => {
  const [phone, setPhone] = useState(data?.phone ?? "");

  return (
    <div className="flex flex-col gap-6 pb-6 border-b border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-800">
        Edit Personal Details
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <FormLabel>Name</FormLabel>
          <Input readOnly value={data?.name ?? ""} />
        </div>

        <div className="w-full">
          <FormLabel>Email</FormLabel>
          <Input readOnly value={data?.email ?? ""} />
        </div>
      </div>

      <div>
        <FormLabel>Phone Number</FormLabel>
        <Input
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          onClick={() => onSave({ phone })}
          disabled={isSaving}
        >
          Save
        </Button>

        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsForm;
