"use client";

// React
import React from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import FilterButtons from "@/shared/ui/FilterButtons";
import FormModal from "@/shared/ui/FormModal";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import Button from "@/shared/ui/Button";

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import {
  Job,
  JobModal,
  AdminPostingsContainer,
  useAllJobs,
  useJobManagement,
  useJobFilters,
  createJobFieldsConfig,
  editJobFieldsConfig,
} from "@/features/job";

const Postings = (): React.JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role !== "student";

  const { jobs, jobsLoading, jobsError, jobsErrorObject } = useAllJobs();

  const {
    handleCreateJob,
    handleUpdateJob,
    handleDeleteJob,
    handleEditJob,
    handleJobClick,
    createPending,
    updatePending,
    deletePending,
    jobModalOpen,
    addJobModalOpen,
    editJobModalOpen,
    setJobModalOpen,
    setAddJobModalOpen,
    setEditJobModalOpen,
    selectedJob,
  } = useJobManagement();

  const { applyFilters, filter, setFilter, searchTerm, setSearchTerm } =
    useJobFilters();

  const filteredJobs = applyFilters(jobs);

  const activeJobs: Job[] = filteredJobs.filter(
    (job) => job.status === "Active",
  );
  const inactiveJobs: Job[] = filteredJobs.filter(
    (job) => job.status === "Inactive",
  );

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />

        <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Job Postings"
              subtitle="Manage and view job opportunities"
            />
            <Button variant="primary" onClick={() => setAddJobModalOpen(true)}>
              Create Posting
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <FilterButtons
              filters={["All", "Full-Time", "Internship"]}
              activeFilter={filter}
              onFilterChange={(f) =>
                setFilter(f as "All" | "Full-Time" | "Internship")
              }
            />
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by company, role, or location..."
            />
          </div>

          <AsyncState
            isLoading={jobsLoading}
            isError={jobsError}
            error={jobsErrorObject}
            isEmpty={jobs.length === 0}
            loadingText="Loading job postings"
            errorText="Failed to load job postings"
            emptyText="No job postings found"
          >
            <>
              <AdminPostingsContainer
                title="Active Postings"
                jobs={activeJobs}
                onJobClick={handleJobClick}
              />

              <AdminPostingsContainer
                title="Inactive Postings"
                jobs={inactiveJobs}
                onJobClick={handleJobClick}
              />
            </>
          </AsyncState>
        </main>

        {jobModalOpen && selectedJob && (
          <JobModal
            job={selectedJob}
            isAdmin={isAdmin}
            onOpenChange={setJobModalOpen}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            isPending={deletePending}
          />
        )}

        {addJobModalOpen && (
          <FormModal
            title="Create Job Posting"
            fields={createJobFieldsConfig}
            onClose={() => setAddJobModalOpen(false)}
            onSave={handleCreateJob}
            isPending={createPending}
          />
        )}

        {editJobModalOpen && selectedJob && (
          <FormModal
            title="Edit Job Posting"
            fields={editJobFieldsConfig}
            initialValues={{
              ...selectedJob,
              deadline: selectedJob.deadline?.split("T")[0],
              requirements: selectedJob.requirements.join("\n"),
            }}
            onClose={() => setEditJobModalOpen(false)}
            onSave={handleUpdateJob}
            isPending={updatePending}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default Postings;
