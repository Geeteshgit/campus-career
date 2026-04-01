// External Libraries
import clsx from "clsx";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
import type { Role } from "@/features/auth";
import type { Admin } from "@/features/admin";

type AdminCardProps = {
  admin: Admin;
  role: Role;
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => Promise<void>;
  deletePending?: boolean;
};

const AdminCard = ({
  admin,
  role,
  onEdit,
  onDelete,
  deletePending = false,
}: AdminCardProps) => {
  const isSuperAdmin = role === "super_admin";

  return (
    <div className="bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition flex flex-col gap-4">
      <div
        className={clsx(
          "grid gap-3 w-full items-center",
          role === "super_admin" ? "grid-cols-6" : "grid-cols-5",
        )}
      >
        <p className="font-semibold text-neutral-900 truncate">{admin.name}</p>
        <p className="col-span-2 font-semibold text-neutral-900 truncate">{admin.email}</p>
        <p className="font-semibold text-neutral-900 truncate text-center">
          {admin.phone}
        </p>
        <p className="font-semibold text-neutral-900 truncate text-center">
          {admin.role === "super_admin" ? "Super Admin" : "Admin"}
        </p>
        {isSuperAdmin && (
          <div className="flex justify-center items-center gap-6">
            <span
              className="text-xl cursor-pointer text-blue-500 hover:scale-105 transition duration-300"
              onClick={() => onEdit(admin)}
            >
              <FiEdit2 />
            </span>
            <span
              className={clsx("text-xl text-red-500 transition duration-300", {
                "cursor-not-allowed": deletePending,
                "cursor-pointer hover:scale-105": !deletePending,
              })}
              onClick={() => !deletePending && onDelete(admin)}
            >
              <RiDeleteBin6Line />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
