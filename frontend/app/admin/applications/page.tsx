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

// Features
import { ProtectedRoute, useAuthStore } from "@/features/auth";
import { JobApplicationsCard } from "@/features/application";
import { downloadApplicantsCSV } from "@/features/application/utils/downloadApplicantsCSV";
import {
  Job,
  JobFormModal,
  JobModal,
  useAllJobs,
  useJobManagement,
} from "@/features/job";

const ApplicationsAdminPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role !== "student";

  const { jobs, jobsLoading, jobsError, jobsErrorObj } = useAllJobs();
  const {
    handleUpdateJob,
    handleDeleteJob,
    deletePending,
    handleEditJob,
    handleJobClick,
    selectedJob,
    jobModalOpen,
    editJobModalOpen,
    setJobModalOpen,
    setEditJobModalOpen,
  } = useJobManagement();

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

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
            isEmpty={filteredJobs.length === 0}
            errorText="Failed to load job postings"
            emptyText="No job postings found"
          >
            <div className="flex flex-col gap-1">
                {filteredJobs.map((job) => (
                  <JobApplicationsCard
                    key={job._id}
                    job={job}
                    isAdmin={isAdmin}
                    onDownload={downloadApplicantsCSV}
                    onOpenModal={handleJobClick}
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
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            isPending={deletePending}
          />
        )}

        {editJobModalOpen && selectedJob && (
          <JobFormModal
            mode="edit"
            defaultValues={{
              company: selectedJob.company,
              role: selectedJob.role,
              location: selectedJob.location,
              package: selectedJob.package,
              deadline: selectedJob.deadline?.split("T")[0],
              positions: selectedJob.positions,
              type: selectedJob.type,
              description: selectedJob.description,
              requirements: selectedJob.requirements.join("\n"),
              eligibility: selectedJob.eligibility,
              status: "Active",
            }}
            open={editJobModalOpen}
            onOpenChange={setEditJobModalOpen}
            onSubmit={handleUpdateJob}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default ApplicationsAdminPage;
