"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";

// Job Data
import { jobPostings } from "@/data/jobPostings";

const Postings = (): React.JSX.Element => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<"All" | "Full-time" | "Internship">(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Filter by type
  const filteredByType =
    filter === "All"
      ? jobPostings
      : jobPostings.filter(
          (job) => job.type.toLowerCase() === filter.toLowerCase()
        );

  // Apply search
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

  // Split into active/inactive
  const activeJobs = filteredJobs.filter((job) => job.status === "Active");
  const inactiveJobs = filteredJobs.filter((job) => job.status === "Inactive");

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="Job Postings"
          subtitle="Manage and view the active and inactive opportunities"
        />

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

        {/* Active Postings */}
        <PostingsContainer
          title="Active Postings"
          jobs={activeJobs}
          onJobClick={handleJobClick}
        />
        {/* Inactive Postings */}
        <PostingsContainer
          title="Inactive Postings"
          jobs={inactiveJobs}
          onJobClick={handleJobClick}
          inactive
        />
      </main>

      {modalOpen && <JobModal job={selectedJob} onOpenChange={setModalOpen} />}
    </>
  );
};

export default Postings;