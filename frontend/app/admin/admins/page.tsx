"use client";

// React
import { useState } from "react";

// External Libraries
import clsx from "clsx";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import Button from "@/shared/ui/Button";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import {
  AdminCard,
  AdminFormModal,
  useAdminManagement,
  useAdmins,
} from "@/features/admin";

const AdminManagement = () => {
  const user = useAuthStore((state) => state.user);
  const role = user?.role ?? "admin";

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { filteredAdmins, adminsLoading, adminsError, adminsErrorObj } =
    useAdmins(searchTerm);

  const {
    handleCreateAdmin,
    handleUpdateAdmin,
    handleDeleteAdmin,
    handleEditAdmin,
    deletePending,
    addAdminModalOpen,
    editAdminModalOpen,
    setAddAdminModalOpen,
    setEditAdminModalOpen,
    selectedAdmin,
  } = useAdminManagement(role);

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Admin Users"
            subtitle="View and manage all the admin accounts"
          />
          <Button variant="primary" onClick={() => setAddAdminModalOpen(true)}>
            Create Admin
          </Button>
        </div>

        <div className="flex justify-end">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email or phone..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <div
            className={clsx(
              "grid gap-3 rounded-xl bg-blue-50 p-4",
              role === "super_admin" ? "grid-cols-6" : "grid-cols-5",
            )}
          >
            <p className="text-sm font-semibold text-neutral-600">Name</p>
            <p className="col-span-2 text-sm font-semibold text-neutral-600">Email</p>
            <p className="text-sm font-semibold text-neutral-600 text-center">
              Phone
            </p>
            <p className="text-sm font-semibold text-neutral-600 text-center">
              Role
            </p>
            {role === "super_admin" && (
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Actions
              </p>
            )}
          </div>
          <AsyncState
            isLoading={adminsLoading}
            isError={adminsError}
            error={adminsErrorObj}
            isEmpty={filteredAdmins.length === 0}
            loadingText="Loading admins"
            errorText="Failed to load admins"
            emptyText="No admins found"
          >
            <div className="flex flex-col gap-1">
              {filteredAdmins.map((admin) => (
                <AdminCard
                  key={admin._id}
                  admin={admin}
                  role={role}
                  onEdit={handleEditAdmin}
                  onDelete={handleDeleteAdmin}
                  deletePending={deletePending}
                />
              ))}
            </div>
          </AsyncState>
        </div>
      </main>

      {addAdminModalOpen && (
        <AdminFormModal
          mode="create"
          role={role}
          defaultValues={{
            name: "",
            email: "",
            phone: "",
            role: "admin",
          }}
          onSubmit={handleCreateAdmin}
          open={addAdminModalOpen}
          onOpenChange={setAddAdminModalOpen}
        />
      )}

      {editAdminModalOpen && selectedAdmin && (
        <AdminFormModal
          mode="edit"
          role={role}
          defaultValues={{
            name: selectedAdmin.name,
            email: selectedAdmin.email,
            phone: selectedAdmin.phone,
            role: selectedAdmin.role as "admin" | "super_admin",
          }}
          onSubmit={handleUpdateAdmin}
          open={editAdminModalOpen}
          onOpenChange={setEditAdminModalOpen}
        />
      )}
    </ProtectedRoute>
  );
};

export default AdminManagement;
