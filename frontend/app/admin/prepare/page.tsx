"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DangerButton from "@/components/ui/DangerButton";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";
import EditModal from "@/components/ui/EditModal";
import FilterSearchBar from "@/components/ui/FilterSearchBar";
import { env } from "@/config/env";
import { useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/ProtectedRoute";

type ResourceLink = {
  _id: string;
  title: string;
  url: string;
  program: string;
};

const PrepareAdminPage = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const programs = useAppSelector((state) => state.academic.programs);
  const programNames = programs.map(program => program.name);
  const isAdmin = user?.role !== "student";

  const [resources, setResources] = useState<ResourceLink[]>([]);
  const [activeProgram, setActiveProgram] = useState(programNames[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editResource, setEditResource] = useState<ResourceLink | null>(null);


  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const resourceFields: FieldConfig[] = [
    { name: "title", placeholder: "Resource Title", type: "text" },
    { name: "url", placeholder: "Resource URL", type: "text" },
    {
      name: "program",
      placeholder: "Select Program",
      type: "select",
      options: programNames,
    },
  ];

  const fetchResources = async () => {
    try {
      const response = await axios.get(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/resources/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResources(response.data.resources);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async (data: any) => {
    try {
      const response = await axios.post(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/resources`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResources((prev) => [...prev, response.data.resource]);
      setAddModalOpen(false);
    } catch (err) {
      console.error("Create resource error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      await axios.delete(`${env.ACADEMIC_CONFIG_SERVICE}/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete resource error:", err);
    }
  };

  const handleEditSave = async (data: any) => {
    if (!editResource) return;

    try {
      const response = await axios.put(
        `${env.ACADEMIC_CONFIG_SERVICE}/api/resources/${editResource._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResources((prev) =>
        prev.map((r) =>
          r._id === editResource._id ? response.data.updatedResource : r
        )
      );

      setEditModalOpen(false);
      setEditResource(null);
    } catch (err) {
      console.error("Update resource error:", err);
    }
  };

  const filteredResources = resources
    .filter((r) => r.program === activeProgram)
    .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Preparation Resources"
              subtitle="Manage interview and placement preparation materials by program"
            />

            {isAdmin && (
              <PrimaryButton onClick={() => setAddModalOpen(true)}>
                Add Resource
              </PrimaryButton>
            )}
          </div>

          <FilterSearchBar
            filters={programNames}
            activeFilter={activeProgram}
            onFilterChange={setActiveProgram}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search resources..."
          />

          <div className="flex flex-col gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
                >
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {item.title}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-blue-600 underline break-all"
                    >
                      {item.url}
                    </a>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 justify-end">
                      <PrimaryButton
                        onClick={() => {
                          setEditResource(item);
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </PrimaryButton>
                      <DangerButton onClick={() => handleDelete(item._id)}>
                        Delete
                      </DangerButton>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No resources found.
              </p>
            )}
          </div>
        </main>

        {addModalOpen && (
          <AddModal
            title="Add New Preparation Resource"
            fields={resourceFields}
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddResource}
          />
        )}

        {editModalOpen && editResource && (
          <EditModal
            title="Edit Preparation Resource"
            fields={resourceFields}
            initialValues={editResource}
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditSave}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default PrepareAdminPage;
