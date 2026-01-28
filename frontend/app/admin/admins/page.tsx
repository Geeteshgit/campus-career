"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import AdminCard, {
  AdminUser,
} from "@/components/AdminDashboardComponents/AdminCard";
import { useAppSelector } from "@/redux/hooks";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";
import EditModal from "@/components/ui/EditModal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminManagement = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const role = user?.role ?? "admin";

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [editAdminModalOpen, setEditAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${env.USER_SERVICE}/api/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(response.data.admins);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdminAdded = async (newAdminData: any) => {
    try {
      const payload =
        role === "super_admin"
          ? newAdminData
          : { ...newAdminData, role: "admin" };

      const response = await axios.post(
        `${env.USER_SERVICE}/api/admin`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAdmins((prev) => [...prev, response.data.admin]);
      setAddAdminModalOpen(false);
    } catch (err) {
      console.error("Failed to add admin:", err);
    }
  };

  const handleAdminUpdated = async (updatedValues: any) => {
    if (!selectedAdmin) return;

    try {
      if (role !== "super_admin") {
        delete updatedValues.role;
      }

      const response = await axios.put(
        `${env.USER_SERVICE}/api/admin/${selectedAdmin._id}`,
        updatedValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAdmins((prev) =>
        prev.map((a) =>
          a._id === selectedAdmin._id ? response.data.updatedUser : a
        )
      );

      setEditAdminModalOpen(false);
    } catch (err) {
      console.error("Failed to update admin:", err);
    }
  };

  const handleDelete = async (admin: AdminUser) => {
    try {
      await axios.delete(`${env.USER_SERVICE}/api/admin/${admin._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins((prev) => prev.filter((a) => a._id !== admin._id));
    } catch (err) {
      console.error("Failed to delete admin:", err);
    }
  };

  const handleEdit = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setEditAdminModalOpen(true);
  };

  const adminFields: FieldConfig[] = [
    { name: "name", placeholder: "Admin Name", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "phone", placeholder: "Phone Number", type: "text" },
  ];

  const superAdminFields: FieldConfig[] = [
    ...adminFields,
    {
      name: "role",
      placeholder: "Select Role",
      type: "select",
      options: ["admin", "super_admin"],
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Admin Users"
              subtitle="View and manage all the admin accounts"
            />
            <PrimaryButton onClick={() => setAddAdminModalOpen(true)}>
              Add Admin
            </PrimaryButton>
          </div>

          <div className="flex flex-col gap-2">
            {admins.length === 0 ? (
              <p className="text-neutral-500 text-center">No admins found</p>
            ) : (
              admins.map((admin) => (
                <AdminCard
                  key={admin._id}
                  admin={admin}
                  role={role}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </main>

        {addAdminModalOpen && (
          <AddModal
            title="Add New Admin"
            fields={role === "super_admin" ? superAdminFields : adminFields}
            onClose={() => setAddAdminModalOpen(false)}
            onSave={handleAdminAdded}
          />
        )}

        {editAdminModalOpen && selectedAdmin && (
          <EditModal
            title="Edit Admin"
            fields={role === "super_admin" ? superAdminFields : adminFields}
            initialValues={selectedAdmin}
            onClose={() => setEditAdminModalOpen(false)}
            onSave={handleAdminUpdated}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default AdminManagement;
