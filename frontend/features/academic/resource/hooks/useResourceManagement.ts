import { useState } from "react";
import toast from "react-hot-toast";
import {
  CreateResourcePayload,
  Resource,
  UpdateResourcePayload,
} from "../types/resource.types";
import {
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useUpdateResourceMutation,
} from "./mutations";

export const useResourceManagement = () => {
  const [addResourceModalOpen, setAddResourceModalOpen] =
    useState<boolean>(false);
  const [editResourceModalOpen, setEditResourceModalOpen] =
    useState<boolean>(false);
  const [selectedResource, setselectedResource] = useState<Resource | null>(
    null,
  );

  const { createResource, isPending: createPending } =
    useCreateResourceMutation();
  const { updateResource, isPending: updatePending } =
    useUpdateResourceMutation();
  const { deleteResource, isPending: deletePending } =
    useDeleteResourceMutation();

  const handleCreateResource = async (data: CreateResourcePayload) => {
    try {
      await createResource(data);
      setAddResourceModalOpen(false);
      toast.success("Resource created successfully");
    } catch (err) {
      console.error("Create resource error:", err);
      toast.error("Failed to create resource");
    }
  };

  const handleUpdateResource = async (data: UpdateResourcePayload) => {
    if (!selectedResource) return;

    try {
      await updateResource({
        id: selectedResource._id,
        payload: data,
      });

      setselectedResource(null);
      setEditResourceModalOpen(false);
      toast.success("Resource updated successfully");
    } catch (err) {
      console.error("Update resource error:", err);
      toast.error("Failed to update resource");
    }
  };

  const handleDeleteResource = async (resource: Resource) => {
    try {
      await deleteResource(resource._id);
      toast.success("Resource deleted successfully");
    } catch (err) {
      console.error("Delete resource error:", err);
      toast.error("Failed to delete resource");
    }
  };

  const handleEditResource = (resource: Resource) => {
    setselectedResource(resource);
    setEditResourceModalOpen(true);
  };

  return {
    handleCreateResource,
    handleUpdateResource,
    handleDeleteResource,
    handleEditResource,

    createPending,
    updatePending,
    deletePending,

    addResourceModalOpen,
    editResourceModalOpen,
    setAddResourceModalOpen,
    setEditResourceModalOpen,

    selectedResource,
  };
};
