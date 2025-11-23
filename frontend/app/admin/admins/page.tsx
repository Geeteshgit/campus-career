"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import AdminCard, {
  AdminUser,
} from "@/components/AdminDashboardComponents/AdminCard";
import { useAppSelector } from "@/redux/hooks";
import AddAdminModal from "@/components/AdminDashboardComponents/AddAdminModal";
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

  const handleEdit = (admin: AdminUser) => {
    alert(`Editing admin: ${admin.name}`);
  };

  const handleDelete = (admin: AdminUser) => {
    alert(`Deleting admin: ${admin.name}`);
  };

  const handleAdminAdded = (newAdmin: AdminUser) => {
    setAdmins((prev) => [...prev, newAdmin]);
    setAddAdminModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
        {/* HEADER + ADD ADMIN BUTTON */}
        <div className="flex items-center justify-between">
          <PageHeader
            title="Admin Users"
            subtitle="View and manage all the admin accounts"
          />
          <PrimaryButton onClick={() => setAddAdminModalOpen(true)}>Add Admin</PrimaryButton>
        </div>

        {/* ADMIN CARDS */}
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
    </>
  );
};

export default AdminManagement;
