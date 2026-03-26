"use client";

// React
import React, { useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import FilterButtons from "@/shared/ui/FilterButtons";
import FormModal from "@/shared/ui/FormModal";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import { JobApplicationsCard } from "@/features/application";
import { downloadApplicantsCSV } from "@/features/application/utils/downloadApplicantsCSV";
import {
  editJobFieldsConfig,
  Job,
  JobFormData,
  JobModal,
  UpdateJobPayload,
  useAllJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "@/features/job";

const ApplicationsAdminPage = (): React.JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role !== "student";

  const {
    data: jobsData,
    isPending: jobsLoading,
    isError: jobsError,
    error: jobsErrorObj,
  } = useAllJobsQuery();
  const { updateJob, isPending: updatePending } = useUpdateJobMutation();
  const { deleteJob, isPending: deletePending } = useDeleteJobMutation();

  const jobs: Job[] = jobsData?.jobs ?? [];

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: JobFormData) => {
    if (!editingJob) return;

    try {
      const finalData: UpdateJobPayload = {
        ...updatedData,
        requirements: updatedData.requirements?.split("\n") || [],
      };

      await updateJob({ id: editingJob._id, payload: finalData });

      setEditModalOpen(false);
      setJobModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      console.error("Job update error:", err);
    }
  };

  const handleDelete = async (job: Job) => {
    try {
      await deleteJob(job._id);

      setJobModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Job delete error:", err);
    }
  };

  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const filteredByType: Job[] =
    filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const filteredJobs: Job[] = filteredByType.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.company.toLowerCase().includes(term) ||
      job.role.toLowerCase().includes(term)
    );
  });

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white flex flex-col gap-8">
          <PageHeader
            title="Applications Management"
            subtitle="Manage all job postings & view applicants"
          />
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
              placeholder="Search by company or role..."
            />
          </div>

          <AsyncState
            isLoading={jobsLoading}
            isError={jobsError}
            error={jobsErrorObj}
            isEmpty={jobs.length === 0}
            loadingText="Loading job postings"
            errorText="Failed to load job postings"
            emptyText="No job postings found"
          >
            <div className="flex flex-col bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
              {filteredJobs.map((job) => (
                <JobApplicationsCard
                  key={job._id}
                  job={job}
                  isAdmin={isAdmin}
                  onDownload={downloadApplicantsCSV}
                  onOpenModal={openJobModal}
                />
              ))}
            </div>
          </AsyncState>
        </main>

        {jobModalOpen && selectedJob && (
          <JobModal
            job={selectedJob}
            isAdmin={isAdmin}
            onOpenChange={setJobModalOpen}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            isPending={deletePending}
          />
        )}

        {editModalOpen && editingJob && (
          <FormModal
            title="Edit Job Posting"
            fields={editJobFieldsConfig}
            initialValues={{
              ...editingJob,
              deadline: editingJob.deadline?.split("T")[0],
              requirements: editingJob.requirements.join("\n"),
            }}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveEdit}
            isPending={updatePending}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default ApplicationsAdminPage;
