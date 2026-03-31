"use client";

// External Libraries
import { useForm } from "react-hook-form";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ProtectedRoute } from "@/features/auth";
import {
  CreateProgramPayload,
  ProgramCard,
  useProgramManagement,
  usePrograms,
} from "@/features/academic/program";

const ConfigurationsPage = () => {
  const { programs, programsLoading, programsError, programsErrorObj } =
    usePrograms();

  const { handleCreateProgram, handleDeleteProgram, deletePending } =
    useProgramManagement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProgramPayload>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateProgramPayload) => {
    try {
      await handleCreateProgram(data);
      reset();
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
        <PageHeader title="System Configurations" subtitle="Manage Programs" />

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-neutral-800">Programs</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <Input
              {...register("name", { required: true })}
              placeholder="Add Program"
            />
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Add
            </Button>
          </form>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-4 gap-3 rounded-xl bg-blue-50 p-4">
              <p className="col-span-3 text-sm font-semibold text-neutral-600">
                Program
              </p>
              <p className="text-sm font-semibold text-neutral-600 text-center">
                Actions
              </p>
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
              <div className="flex flex-col gap-1">
                {programs.map((program) => (
                  <ProgramCard
                    key={program._id}
                    program={program}
                    onDelete={handleDeleteProgram}
                    deletePending={deletePending}
                  />
                ))}
              </div>
            </AsyncState>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default ConfigurationsPage;
