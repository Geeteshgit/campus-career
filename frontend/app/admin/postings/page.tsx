"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import FilterButtons from "@/shared/ui/FilterButtons";
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
  JobFormModal,
} from "@/features/job";

const Postings = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role !== "student";

  const { jobs, jobsLoading, jobsError, jobsErrorObj } = useAllJobs();

  const {
    handleCreateJob,
    handleUpdateJob,
    handleDeleteJob,
    handleEditJob,
    handleJobClick,
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
        <AdminPostingsContainer
          title="Active Postings"
          jobs={activeJobs}
          jobsLoading={jobsLoading}
          jobsError={jobsError}
          jobsErrorObj={jobsErrorObj}
          onJobClick={handleJobClick}
        />
        <AdminPostingsContainer
          title="Inactive Postings"
          jobs={inactiveJobs}
          jobsLoading={jobsLoading}
          jobsError={jobsError}
          jobsErrorObj={jobsErrorObj}
          onJobClick={handleJobClick}
        />
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
        <JobFormModal
          mode="create"
          defaultValues={{
            company: "",
            role: "",
            location: "",
            package: "",
            deadline: new Date().toISOString().split("T")[0],
            positions: 1,
            type: "Full-Time",
            description: "",
            requirements: "",
            eligibility: "",
            status: "Active",
          }}
          open={addJobModalOpen}
          onOpenChange={setAddJobModalOpen}
          onSubmit={handleCreateJob}
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
    </ProtectedRoute>
  );
};

export default Postings;
