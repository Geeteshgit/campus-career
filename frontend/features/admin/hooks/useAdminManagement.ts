"use client";

import { useState } from "react";
import { Admin, CreateAdminPayload, UpdateAdminPayload } from "../types/admin.types";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} from "../api/admins.queries";

export const useAdminManagement = (role: string) => {
  const [addAdminModalOpen, setAddAdminModalOpen] = useState<boolean>(false);
  const [editAdminModalOpen, setEditAdminModalOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const { createAdmin, isPending: createPending } = useCreateAdminMutation();
  const { updateAdmin, isPending: updatePending } = useUpdateAdminMutation();
  const { deleteAdmin, isPending: deletePending } = useDeleteAdminMutation();

  const handleCreateAdmin = async (data: CreateAdminPayload) => {
    try {
      const payload =
        role === "super_admin" ? data : { ...data, role: "admin" };

      await createAdmin(payload);
      setAddAdminModalOpen(false);
    } catch (err) {
      console.error("Failed to add admin:", err);
    }
  };

  const handleUpdateAdmin = async (data: UpdateAdminPayload) => {
    if (!selectedAdmin) return;

    try {
      await updateAdmin({ id: selectedAdmin._id, payload: data });
      setEditAdminModalOpen(false);
    } catch (err) {
      console.error("Failed to update admin:", err);
    }
  };

  const handleDeleteAdmin = async (admin: Admin) => {
    try {
      await deleteAdmin(admin._id);
    } catch (err) {
      console.error("Failed to delete admin:", err);
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setEditAdminModalOpen(true);
  };

  return {
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
  };
};
