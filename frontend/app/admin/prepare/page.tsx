"use client";

// React
import { useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import FilterButtons from "@/shared/ui/FilterButtons";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import Button from "@/shared/ui/Button";

// Types
import type { Resource } from "@/features/academic/resource";

// Features
import { ProtectedRoute } from "@/features/auth";
import { usePrograms } from "@/features/academic/program";
import {
  useResourceManagement,
  useResources,
  ResourceFormModal,
  ResourceCard,
} from "@/features/academic/resource";

const PrepareAdminPage = () => {
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
    deletePending,
    addResourceModalOpen,
    editResourceModalOpen,
    setAddResourceModalOpen,
    setEditResourceModalOpen,
    selectedResource,
  } = useResourceManagement();

  const programNames: string[] = programs.map((program) => program.name);
  const defaultProgram: string = activeProgram ?? programNames[0];

  const filteredResources: Resource[] = resources.filter((resource) => {
    return (
      resource.program === defaultProgram &&
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <Navbar />
      <main className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Preparation Resources"
            subtitle="Manage interview and placement preparation materials by program"
          />

          <Button
            variant="primary"
            onClick={() => setAddResourceModalOpen(true)}
          >
            Create Resource
          </Button>
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

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-3 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-neutral-600">Title</p>
            <p className="col-span-2 text-sm font-semibold text-neutral-600">URL</p>
            <p className="text-sm font-semibold text-neutral-600 text-center">
              Actions
            </p>
          </div>
          <AsyncState
            isLoading={resourcesLoading}
            isError={resourcesError}
            error={resourcesErrorObj}
            isEmpty={filteredResources.length === 0}
            loadingText="Loading resources..."
            errorText="Failed to load resources"
            emptyText="No resources found"
          >
            <div className="flex flex-col gap-1">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  onEdit={handleEditResource}
                  onDelete={handleDeleteResource}
                  deletePending={deletePending}
                />
              ))}
            </div>
          </AsyncState>
        </div>
      </main>

      {addResourceModalOpen && (
        <ResourceFormModal
          mode="create"
          defaultValues={{
            title: "",
            url: "",
            program: "",
          }}
          onSubmit={handleCreateResource}
          open={addResourceModalOpen}
          onOpenChange={setAddResourceModalOpen}
        />
      )}

      {editResourceModalOpen && selectedResource && (
        <ResourceFormModal
          mode="edit"
          defaultValues={{
            title: selectedResource.title,
            url: selectedResource.url,
            program: selectedResource.program,
          }}
          onSubmit={handleUpdateResource}
          open={editResourceModalOpen}
          onOpenChange={setEditResourceModalOpen}
        />
      )}
    </ProtectedRoute>
  );
};

export default PrepareAdminPage;
