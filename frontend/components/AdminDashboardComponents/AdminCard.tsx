import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";

export type AdminUser = {
  _id: string;
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
    <div className="bg-white border border-neutral-200 rounded-xl p-3 shadow-sm hover:shadow-md transition flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        <p className="font-semibold text-neutral-900">{admin.name}</p>
        <p className="font-semibold text-neutral-900">{admin.email}</p>
        <p className="font-semibold text-neutral-900">{admin.phone}</p>
        {isSuperAdmin && (
          <div className="flex justify-end gap-2">
            <PrimaryButton onClick={() => onEdit(admin)}>Edit</PrimaryButton>
            <DangerButton onClick={() => onDelete(admin)}>Delete</DangerButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
