"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AddJobModal from "@/components/AddJobModal";
import { useAppSelector } from "@/redux/hooks";

// Job Data
import { jobPostings } from "@/data/jobPostings";

const Postings = (): React.JSX.Element => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);

  const [addJobModalOpen, setAddJobModalOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<"All" | "Full-time" | "Internship">(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const user = useAppSelector((state) => state.user.user);
  const role = user?.role;
  const isAdmin: boolean = role !== "student";

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const filteredByType =
    filter === "All"
      ? jobPostings
      : jobPostings.filter(
          (job) => job.type.toLowerCase() === filter.toLowerCase()
        );

  const filteredJobs = filteredByType.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.company.toLowerCase().includes(term) ||
      job.role.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.package.toLowerCase().includes(term) ||
      job.salary.toLowerCase().includes(term)
    );
  });

  const activeJobs = filteredJobs.filter((job) => job.status === "Active");
  const inactiveJobs = filteredJobs.filter((job) => job.status === "Inactive");

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Job Postings"
            subtitle="Manage and view the active and inactive opportunities"
          />
          {isAdmin && (
            <PrimaryButton onClick={() => setAddJobModalOpen(true)}>Create Posting</PrimaryButton>
            
          )}
        </div>

        {/* FILTER BAR */}
        <FilterSearchBar
          filters={["All", "Full-time", "Internship"]}
          activeFilter={filter}
          onFilterChange={(f) =>
            setFilter(f as "All" | "Full-time" | "Internship")
          }
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by company, role, or location..."
        />

        {/* ACTIVE JOBS */}
        <PostingsContainer
          title="Active Postings"
          jobs={activeJobs}
          onJobClick={handleJobClick}
        />

        {/* INACTIVE JOBS */}
        <PostingsContainer
          title="Inactive Postings"
          jobs={inactiveJobs}
          onJobClick={handleJobClick}
          inactive
        />
      </main>

      {/* JOB DETAILS MODAL */}
      {jobModalOpen && (
        <JobModal job={selectedJob} onOpenChange={setJobModalOpen} isAdmin={isAdmin} />
      )}

      {/* CREATE JOB POSTING MODAL */}
      {addJobModalOpen && (
        <AddJobModal onClose={() => setAddJobModalOpen(false)} onJobAdded={() => setAddJobModalOpen(false)} />
      )}
    </>
  );
};

export default Postings;
