"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import AdminCard, { AdminUser } from "@/components/AdminDashboardComponents/AdminCard";
import { useAppSelector } from "@/redux/hooks";
import AddAdminModal from "@/components/AdminDashboardComponents/AddAdminModal";
import EditModal, { FieldConfig } from "@/components/ui/EditModal";
import PrimaryButton from "@/components/ui/PrimaryButton";

const dummyAdmins: AdminUser[] = [
  {
    id: 1,
    name: "Rakesh Kumar",
    email: "rakesh.admin@example.com",
    phone: "9876543210",
    role: "admin",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.admin@example.com",
    phone: "9876500001",
    role: "admin",
  },
];

const AdminManagement = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const role = user?.role ?? "admin";

  const [admins, setAdmins] = useState<AdminUser[]>(dummyAdmins);

  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);

  const [editAdminModalOpen, setEditAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const handleEdit = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setEditAdminModalOpen(true);
  };

  const handleDelete = (admin: AdminUser) => {
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
  };

  const handleAdminAdded = (newAdmin: AdminUser) => {
    setAdmins((prev) => [...prev, newAdmin]);
    setAddAdminModalOpen(false);
  };

  const handleAdminUpdated = (updatedValues: Record<string, any>) => {
    if (!selectedAdmin) return;

    const updatedAdmin: AdminUser = {
      ...selectedAdmin,
      ...updatedValues,
    };

    setAdmins((prev) =>
      prev.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a))
    );

    setEditAdminModalOpen(false);
  };

  // Fields for EditModal component
  const adminFields: FieldConfig[] = [
  { name: "name", placeholder: "Admin Name", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "phone", placeholder: "Phone Number", type: "text" },
];


  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Admin Users"
            subtitle="View and manage all the admin accounts"
          />
          <PrimaryButton onClick={() => setAddAdminModalOpen(true)}>
            Add Admin
          </PrimaryButton>
        </div>

        {/* Admin Cards */}
        <div className="flex flex-col gap-4">
          {admins.map((admin) => (
            <AdminCard
              key={admin.id}
              admin={admin}
              role={role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      {/* ADD ADMIN MODAL */}
      {addAdminModalOpen && (
        <AddAdminModal
          onClose={() => setAddAdminModalOpen(false)}
          onAdminAdded={handleAdminAdded}
        />
      )}

      {/* EDIT ADMIN MODAL */}
      {editAdminModalOpen && selectedAdmin && (
        <EditModal
          title="Edit Admin"
          fields={adminFields}
          initialValues={selectedAdmin}
          onClose={() => setEditAdminModalOpen(false)}
          onSave={handleAdminUpdated}
        />
      )}
    </>
  );
};

export default AdminManagement;
