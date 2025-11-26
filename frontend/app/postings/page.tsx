"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppSelector } from "@/redux/hooks";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";

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

  const jobFields: FieldConfig[] = [
    { name: "company", placeholder: "Company" },
    { name: "role", placeholder: "Job Role" },
    { name: "location", placeholder: "Location" },
    { name: "salary", placeholder: "Salary" },
    { name: "deadline", placeholder: "Deadline" },
    { name: "positions", placeholder: "Positions", type: "number" },
    {
      name: "type",
      placeholder: "Select Type",
      type: "select",
      options: ["Full-Time", "Internship"],
    },
    { name: "description", placeholder: "Job Description", type: "textarea" },
    {
      name: "requirements",
      placeholder: "Requirements (one per line)",
      type: "textarea",
    },
    { name: "eligibility", placeholder: "Eligibility", type: "textarea" },
  ];

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const handleJobSave = async (formData: any) => {
    // const jobData = {
    //   ...formData,
    //   postedOn: new Date().toLocaleDateString(),
    //   requirements: formData.requirements
    //     ? formData.requirements.split("\n")
    //     : [],
    //   positions: Number(formData.positions) || 0,
    // };
    // await axios.post("http://localhost:5003/api/jobs", jobData);

    setAddJobModalOpen(false);
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
          {isAdmin ? (
            <PrimaryButton onClick={() => setAddJobModalOpen(true)}>
              Create Posting
            </PrimaryButton>
          ) : (
            <Link href="/student/applications">
              <PrimaryButton>My Applications</PrimaryButton>
            </Link>
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
        <JobModal
          job={selectedJob}
          onOpenChange={setJobModalOpen}
          isAdmin={isAdmin}
        />
      )}

      {/* CREATE JOB POSTING MODAL */}
      {addJobModalOpen && (
        <AddModal
          title="Create Job Posting"
          fields={jobFields}
          onClose={() => setAddJobModalOpen(false)}
          onSave={handleJobSave}
        />
      )}
    </>
  );
};

export default Postings;
