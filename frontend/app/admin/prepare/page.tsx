"use client";

// React
import { useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import FilterButtons from "@/shared/ui/FilterButtons";
import FormModal from "@/shared/ui/FormModal";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import Button from "@/shared/ui/Button";

// Shared Types
import { FieldConfig } from "@/shared/types/modal.types";

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import {
  Resource,
  usePrograms,
  useResourceManagement,
  useResources,
} from "@/features/academic";

const PrepareAdminPage = ()=> {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role !== "student";

  const [activeProgram, setActiveProgram] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { programs, programsLoading, programsError, programsErrorObj } =
    usePrograms();

  const { resources, resourcesLoading, resourcesError, resourcesErrorObj } =
    useResources();

  const {
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
  } = useResourceManagement();

  const programNames: string[] = programs.map((program) => program.name);
  const defaultProgram: string = activeProgram ?? programNames[0];

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

  const filteredResources: Resource[] = resources.filter((resource) => {
    return (
      resource.program === defaultProgram &&
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
              <Button
                variant="primary"
                onClick={() => setAddResourceModalOpen(true)}
                disabled={createPending}
              >
                Add Resource
              </Button>
            )}
          </div>

          <AsyncState
            isLoading={programsLoading}
            isError={programsError}
            error={programsErrorObj}
            isEmpty={programs.length === 0}
            loadingText="Loading programs..."
            errorText="Failed to load programs"
            emptyText="No programs found"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <FilterButtons
                filters={programNames}
                activeFilter={defaultProgram}
                onFilterChange={(f) => setActiveProgram(f as string)}
              />

              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search resources..."
              />
            </div>
          </AsyncState>

          <AsyncState
            isLoading={resourcesLoading}
            isError={resourcesError}
            error={resourcesErrorObj}
            isEmpty={resources.length === 0}
            loadingText="Loading resources..."
            errorText="Failed to load resources"
            emptyText="No resources found"
          >
            <div className="flex flex-col gap-4">
              {filteredResources.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-blue-50 transition"
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
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleEditResource(item);
                          setEditResourceModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDeleteResource(item._id)}
                        disabled={deletePending}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AsyncState>
        </main>

        {addResourceModalOpen && (
          <FormModal
            title="Add New Preparation Resource"
            fields={resourceFields}
            onClose={() => setAddResourceModalOpen(false)}
            onSave={handleCreateResource}
            isPending={createPending}
          />
        )}

        {editResourceModalOpen && selectedResource && (
          <FormModal
            title="Edit Preparation Resource"
            fields={resourceFields}
            initialValues={selectedResource}
            onClose={() => setEditResourceModalOpen(false)}
            onSave={handleUpdateResource}
            isPending={updatePending}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default PrepareAdminPage;
