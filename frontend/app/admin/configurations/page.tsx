"use client";

// React
import React from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ProtectedRoute } from "@/features/auth";
import { useProgramManagement, usePrograms } from "@/features/academic";

const ConfigurationsPage = (): React.JSX.Element => {
  const { programs, programsLoading, programsError, programsErrorObj } =
    usePrograms();

  const {
    handleCreateProgram,
    handleDeleteProgram,
    createPending,
    deletePending,
    newProgram,
    setNewProgram,
  } = useProgramManagement();

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
          <PageHeader
            title="System Configurations"
            subtitle="Manage Programs"
          />

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-neutral-800">Programs</h2>

            <div className="flex gap-2">
              <Input
                name="program"
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
                placeholder="Add Program"
              />
              <Button
                variant="primary"
                onClick={() => handleCreateProgram({ name: newProgram })}
                disabled={!newProgram.trim() || createPending}
              >
                Add
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
              <div className="flex flex-col gap-2">
                {programs.map((program) => (
                  <div
                    key={program._id}
                    className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-2"
                  >
                    <p className="font-medium text-neutral-800">
                      {program.name}
                    </p>

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProgram(program._id)}
                      disabled={deletePending}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </AsyncState>
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default ConfigurationsPage;
