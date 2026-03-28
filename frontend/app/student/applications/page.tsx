"use client";

// React
import { useState } from "react";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import FilterButtons from "@/shared/ui/FilterButtons";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";
import AsyncState from "@/shared/ui/AsyncState";

// Features
import { ProtectedRoute } from "@/features/auth";
import {
  JobApplicationsCard,
  PopulatedApplication,
  useMyApplications,
} from "@/features/application";
import { Job, JobModal } from "@/features/job";

const ApplicationsPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState("");

  type AppliedJob = Job & { appliedAt: string };

  const {
    data: applicationsData,
    isPending: applicationsLoading,
    isError: applicationsError,
    error: applicationsErrorObj,
  } = useMyApplications();

  const applications: PopulatedApplication[] =
    applicationsData?.applications ?? [];
  const jobs: AppliedJob[] = applications.map((application) => ({
    ...application.jobId,
    appliedAt: application.createdAt,
  }));

  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const filteredByType =
    filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const filteredJobs = filteredByType.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.company?.toLowerCase().includes(term) ||
      job.role?.toLowerCase().includes(term)
    );
  });

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <PageHeader
            title="My Applications"
            subtitle="View all jobs you applied for"
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
            isLoading={applicationsLoading}
            isError={applicationsError}
            error={applicationsErrorObj}
            isEmpty={applications.length === 0}
            loadingText="Loading job postings"
            errorText="Failed to load job postings"
            emptyText="No job postings found"
          >
            <div className="flex flex-col bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              {filteredJobs.map((job) => (
                <JobApplicationsCard
                  key={job._id}
                  job={job}
                  isAdmin={false}
                  onOpenModal={openJobModal}
                />
              ))}
            </div>
          </AsyncState>
        </main>

        {jobModalOpen && selectedJob && (
          <JobModal
            job={selectedJob}
            onOpenChange={setJobModalOpen}
            isAdmin={false}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default ApplicationsPage;
