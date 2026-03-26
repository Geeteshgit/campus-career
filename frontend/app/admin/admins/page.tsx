"use client";

// React
import React, { useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import Button from "@/shared/ui/Button";
import FormModal from "@/shared/ui/FormModal";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import {
  AdminCard,
  adminFieldsConfig,
  superAdminFieldsConfig,
  useAdminManagement,
  useAdmins,
} from "@/features/admin";

const AdminManagement = (): React.JSX.Element => {
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
    createPending,
    updatePending,
    deletePending,
    addAdminModalOpen,
    editAdminModalOpen,
    setAddAdminModalOpen,
    setEditAdminModalOpen,
    selectedAdmin,
  } = useAdminManagement(role);

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
            <Button
              variant="primary"
              onClick={() => setAddAdminModalOpen(true)}
            >
              Add Admin
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
            <div className="grid grid-cols-5 gap-3 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-semibold text-neutral-600">Name</p>
              <p className="text-sm font-semibold text-neutral-600">Email</p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Phone
              </p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Role
              </p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Actions
              </p>
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
          <FormModal
            title="Add New Admin"
            fields={
              role === "super_admin"
                ? superAdminFieldsConfig
                : adminFieldsConfig
            }
            onClose={() => setAddAdminModalOpen(false)}
            onSave={handleCreateAdmin}
            isPending={createPending}
          />
        )}

        {editAdminModalOpen && selectedAdmin && (
          <FormModal
            title="Edit Admin"
            fields={
              role === "super_admin"
                ? superAdminFieldsConfig
                : adminFieldsConfig
            }
            initialValues={selectedAdmin}
            onClose={() => setEditAdminModalOpen(false)}
            onSave={handleUpdateAdmin}
            isPending={updatePending}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default AdminManagement;
