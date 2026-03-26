"use client";

// React
import React from "react";

// Shared UI Components
import Button from "@/shared/ui/Button";

// Local Imports
import { User } from "../types/user.types";

type UserDetailsViewProps = {
  data: User;
  onEdit: () => void;
};

const UserDetailsView = ({
  data,
  onEdit,
}: UserDetailsViewProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-6 pb-6 border-b border-neutral-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-800">
          Personal Details
        </h2>
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-sm text-neutral-500">Name</p>
          <p className="text-base text-neutral-900 font-medium">
            {data.name ?? ""}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm text-neutral-500">Email</p>
          <p className="text-base text-neutral-900 font-medium">
            {data.email ?? ""}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-500">Phone Number</p>
        <p className="text-base text-neutral-900 font-medium">
          {data.phone ?? ""}
        </p>
      </div>
    </div>
  );
};

export default UserDetailsView;
