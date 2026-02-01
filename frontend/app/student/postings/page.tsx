"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import PageHeader from "@/components/PageHeader";
import StudentPostingsContainer from "@/components/StudentPostingsContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppSelector } from "@/redux/hooks";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";
import FilterButtons from "@/components/ui/FilterButtons";
import SearchBar from "@/components/ui/SearchBar";

const Postings = (): React.JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const student = useAppSelector((state) => state.user.studentProfile);
  const isAdmin = user?.role !== "student";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${env.JOB_SERVICE}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data.jobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (job: Job) => {
    try {
      const response = await axios.post(
        `${env.JOB_SERVICE}/api/applications/${job._id}`,
        {
          name: user?.name,
          phone: user?.phone,
          enrollmentNumber: student?.enrollmentNumber,
          year: student?.year,
          program: student?.program,
          cgpa: student?.cgpa,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert("Applied successfully!");

      setJobModalOpen(false);
    } catch (err: any) {
      console.error("Apply error:", err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const filteredByType =
    filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const filteredJobs = filteredByType.filter((job) => {
    const term = searchTerm.toLowerCase();
    const company = job.company?.toLowerCase() ?? "";
    const role = job.role?.toLowerCase() ?? "";
    const location = job.location?.toLowerCase() ?? "";
    const pkg = job.package?.toLowerCase() ?? "";

    return (
      company.includes(term) ||
      role.includes(term) ||
      location.includes(term) ||
      pkg.includes(term)
    );
  });

  const activeJobs = filteredJobs.filter((job) => job.status === "Active");
  const inactiveJobs = filteredJobs.filter((job) => job.status === "Inactive");

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />

        <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Job Postings"
              subtitle="Manage and view job opportunities"
            />

            <Link href="/student/applications">
              <PrimaryButton>My Applications</PrimaryButton>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <FilterButtons
              filters={["All", "Full-Time", "Internship"]}
              activeFilter={filter}
              onFilterChange={(f) => setFilter(f as any)}
            />
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by company, role, or location..."
            />
          </div>

          {loading ? (
            <p className="text-center text-neutral-600 py-10">
              Loading jobs...
            </p>
          ) : (
            <>
              <StudentPostingsContainer
                title="Active Postings"
                jobs={activeJobs}
                onJobClick={handleJobClick}
              />

              <StudentPostingsContainer
                title="Inactive Postings"
                jobs={inactiveJobs}
                onJobClick={handleJobClick}
                inactive
              />
            </>
          )}
        </main>

        {jobModalOpen && selectedJob && (
          <JobModal
            job={selectedJob}
            isAdmin={isAdmin}
            onOpenChange={setJobModalOpen}
            onApply={handleApply}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default Postings;
