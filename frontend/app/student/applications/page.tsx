"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import { jobPostings } from "@/data/jobPostings";
import JobApplicationsCard from "@/components/JobApplicationsCard";

const ApplicationsPage = (): React.JSX.Element => {
  const appliedJobs = jobPostings;

  const appliedOn = "2025-01-25";

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader
          title="My Applications"
          subtitle="View all jobs you applied for"
        />

        <div className="flex flex-col bg-white rounded-xl shadow-sm border border-neutral-200">
          {appliedJobs.map((job) => (
            <JobApplicationsCard
              key={job.id}
              job={job}
              role="student"
              appliedOn={appliedOn}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </main>

      {jobModalOpen && (
        <JobModal
          job={selectedJob}
          onOpenChange={setJobModalOpen}
          isAdmin={false}
        />
      )}
    </>
  );
};

export default ApplicationsPage;
