"use client";

import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

interface AdminCardProps {
  admin: AdminUser;
  role: string;
  onEdit: (admin: AdminUser) => void;
  onDelete: (admin: AdminUser) => void;
}

const AdminCard = ({
  admin,
  role,
  onEdit,
  onDelete,
}: AdminCardProps): React.JSX.Element => {
  const isSuperAdmin = role === "super_admin";

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-4">
      {/* INFO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
        <div>
          <p className="text-[13px] text-neutral-500">Name</p>
          <p className="font-semibold text-neutral-900">{admin.name}</p>
        </div>

        <div>
          <p className="text-[13px] text-neutral-500">Email</p>
          <p className="font-semibold text-neutral-900">{admin.email}</p>
        </div>

        <div>
          <p className="text-[13px] text-neutral-500">Phone</p>
          <p className="font-semibold text-neutral-900">{admin.phone}</p>
        </div>
      </div>

      {/* BUTTONS — only super_admin can see */}
      {isSuperAdmin && (
        <div className="flex justify-end gap-2">
          <PrimaryButton onClick={() => onEdit(admin)}>Edit</PrimaryButton>
          <DangerButton onClick={() => onDelete(admin)}>Delete</DangerButton>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
