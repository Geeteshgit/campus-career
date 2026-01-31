import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <div className="bg-white hover:bg-blue-50/70 border border-neutral-200 rounded-xl p-4 shadow-sm transition flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3 w-full items-center">
        <p className="font-semibold text-neutral-900 truncate">{admin.name}</p>
        <p className="font-semibold text-neutral-900 truncate">{admin.email}</p>
        <p className="font-semibold text-neutral-900 truncate text-center">{admin.phone}</p>
        {isSuperAdmin && (
          <div className="flex justify-center items-center gap-6">
              <span className="text-xl cursor-pointer text-blue-500 hover:scale-105 transition duration-300" onClick={() => onEdit(admin)}><FiEdit2 /></span>
              <span className="text-xl cursor-pointer text-red-500 hover:scale-105 transition duration-300" onClick={() => onDelete(admin)}><RiDeleteBin6Line /></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
