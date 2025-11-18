"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";

// Import job data
import { jobPostings } from "@/data/jobPostings";

const StudentHomepage = (): React.JSX.Element => {
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

  // ✅ Filter only ACTIVE jobs
  const activeJobs = jobPostings.filter((job) => job.status === "Active");

  // ✅ Apply filter and search
  const filteredJobs = activeJobs
    .filter((job) =>
      filter === "All" ? true : job.type.toLowerCase() === filter.toLowerCase()
    )
    .filter((job) => {
      const term = searchTerm.toLowerCase();
      return (
        job.company.toLowerCase().includes(term) ||
        job.role.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.package.toLowerCase().includes(term) ||
        job.salary.toLowerCase().includes(term)
      );
    });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="Recommended for You"
          subtitle="Job opportunities matching your profile"
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

        <PostingsContainer
          title="Recommended Postings"
          jobs={filteredJobs}
          onJobClick={handleJobClick}
        />
      </main>

      {modalOpen && <JobModal job={selectedJob} onOpenChange={setModalOpen} />}
    </>
  );
};

export default StudentHomepage;