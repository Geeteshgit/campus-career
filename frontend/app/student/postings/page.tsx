"use client";

// React
import Link from "next/link";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";
import Button from "@/shared/ui/Button";
import FilterButtons from "@/shared/ui/FilterButtons";
import PageHeader from "@/shared/ui/PageHeader";
import SearchBar from "@/shared/ui/SearchBar";

// Features
import { ProtectedRoute, useAuthStore, useMeQuery } from "@/features/auth";
import { useApplyToJob } from "@/features/application";
import { useMyStudentProfile } from "@/features/student";
import {
  Job,
  JobModal,
  StudentPostingsContainer,
  useInactiveJobs,
  useJobFilters,
  useJobManagement,
  useRecommendedJobs,
} from "@/features/job";

const Postings = () => {
  const userState = useAuthStore((state) => state.user);
  const isAdmin = userState?.role !== "student";

  const { data: userData } = useMeQuery();
  const user = userData?.user;
  const { jobModalOpen, setJobModalOpen, selectedJob, handleJobClick } =
    useJobManagement();
  const { student } = useMyStudentProfile();
  const { handleApplyToJob } = useApplyToJob();
  const {
    inactiveJobs,
    inactiveJobsLoading,
    inactiveJobsError,
    inactiveJobsErrorObj,
  } = useInactiveJobs();

  const recommendJobsPayload = {
    program: student?.program,
    year: student?.year,
    specialization: student?.specialization,
    cgpa: student?.cgpa,
    skills: student?.skills,
  };

  const {
    recommendedJobs,
    recommendedJobsLoading,
    recommendedJobsError,
    recommendedJobsErrorObj,
  } = useRecommendedJobs(recommendJobsPayload);

  const { applyFilters, filter, setFilter, searchTerm, setSearchTerm } =
    useJobFilters();

  const filteredActiveJobs: Job[] = applyFilters(recommendedJobs);
  const filteredInactiveJobs: Job[] = applyFilters(inactiveJobs);

  const handleApply = async (job: Job) => {
    try {
      await handleApplyToJob(job._id, {
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        enrollmentNumber: student?.enrollmentNumber ?? "",
        year: student?.year ?? "",
        program: student?.program ?? "",
        batch: student?.batch ?? "",
        specialization: student?.specialization ?? "",
        cgpa: student?.cgpa ?? 0,
      });

      alert("Applied successfully!");

      setJobModalOpen(false);
    } catch (err) {
      console.error("Apply error:", err);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <Navbar />

      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Job Postings"
            subtitle="Manage and view job opportunities"
          />

          <Link href="/student/applications">
            <Button variant="primary">My Applications</Button>
          </Link>
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
          isLoading={recommendedJobsLoading}
          isError={recommendedJobsError}
          error={recommendedJobsErrorObj}
          isEmpty={recommendedJobs.length === 0}
          loadingText="Loading recommended job postings"
          errorText="Failed to load recommended job postings"
          emptyText="No recommended job postings found"
        >
          <StudentPostingsContainer
            title="Active Postings"
            jobs={filteredActiveJobs}
            onJobClick={handleJobClick}
          />
        </AsyncState>
        <AsyncState
          isLoading={inactiveJobsLoading}
          isError={inactiveJobsError}
          error={inactiveJobsErrorObj}
          isEmpty={inactiveJobs.length === 0}
          loadingText="Loading job postings"
          errorText="Failed to load job postings"
          emptyText="No job postings found"
        >
          <StudentPostingsContainer
            title="Inactive Postings"
            jobs={filteredInactiveJobs}
            onJobClick={handleJobClick}
          />
        </AsyncState>
      </main>

      {jobModalOpen && selectedJob && (
        <JobModal
          job={selectedJob}
          isAdmin={isAdmin}
          onOpenChange={setJobModalOpen}
          onApply={handleApply}
        />
      )}
    </ProtectedRoute>
  );
};

export default Postings;
