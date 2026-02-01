"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import JobApplicationsCard from "@/components/JobApplicationsCard";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";
import FilterButtons from "@/components/ui/FilterButtons";
import SearchBar from "@/components/ui/SearchBar";

const ApplicationsPage = (): React.JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `${env.JOB_SERVICE}/api/applications/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const applications = response.data.applications;

      const formattedJobs = applications.map((application: any) => ({
        ...application.jobId,
        createdAt: application.createdAt,
      }));

      setJobs(formattedJobs);
    } catch (err) {
      console.error("Failed to fetch applied jobs:", err);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

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
              onFilterChange={(f) => setFilter(f as any)}
            />
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by company or role..."
            />
          </div>

          <div className="flex flex-col bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {filteredJobs.map((job) => (
              <JobApplicationsCard
                key={job._id}
                job={job}
                isAdmin={false}
                onOpenModal={openJobModal}
              />
            ))}

            {filteredJobs.length === 0 && (
              <p className="py-5 text-center text-neutral-600">
                No applications found.
              </p>
            )}
          </div>
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
