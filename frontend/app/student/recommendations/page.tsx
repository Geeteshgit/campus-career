"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/ui/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { env } from "@/config/env";
import { setRecommendations } from "@/redux/features/user/userSlice";

const StudentHomepage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const studentProfile = useAppSelector((state) => state.user.studentProfile);
  const recommendations = useAppSelector((state) =>
    Array.isArray(state.user.recommendations) ? state.user.recommendations : [],
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleApply = async (job: Job) => {
    try {
      await axios.post(
        `${env.JOB_SERVICE}/api/applications/${job._id}`,
        {
          name: user?.name,
          phone: user?.phone,
          enrollmentNumber: studentProfile?.enrollmentNumber,
          year: studentProfile?.year,
          program: studentProfile?.program,
          cgpa: studentProfile?.cgpa,
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

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${env.JOB_SERVICE}/api/jobs/recommendations`,
        { student: studentProfile },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log(response.data.recommendations);
      dispatch(setRecommendations(response.data.recommendations || []));
    } catch (err) {
      console.error("Failed to fetch recommended jobs:", err);
      dispatch(setRecommendations([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!studentProfile) return;
    fetchRecommendations();
  }, [studentProfile]);

  const filteredJobs = recommendations
  .filter((job) =>
    filter === "All"
      ? true
      : (job.type ?? "").toLowerCase() === filter.toLowerCase()
  )
  .filter((job) => {
    const term = searchTerm.toLowerCase();

    return (
      (job.company ?? "").toLowerCase().includes(term) ||
      (job.role ?? "").toLowerCase().includes(term) ||
      (job.location ?? "").toLowerCase().includes(term) ||
      (job.package ?? "").toLowerCase().includes(term)
    );
  });


  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />

        <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <PageHeader
            title="Recommended for You"
            subtitle="AI-based internship & placement recommendations"
          />

          <FilterSearchBar
            filters={["All", "Full-Time", "Internship"]}
            activeFilter={filter}
            onFilterChange={(f) =>
              setFilter(f as "All" | "Full-Time" | "Internship")
            }
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by company, role, or location..."
          />

          {loading ? (
            <p className="text-center text-neutral-600 py-10">
              Loading recommended jobs...
            </p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center text-neutral-500 py-10">
              No job recommendations available right now.
            </p>
          ) : (
            <PostingsContainer
              title="Recommended Postings"
              jobs={filteredJobs}
              onJobClick={handleJobClick}
            />
          )}
        </main>

        {jobModalOpen && (
          <JobModal
            job={selectedJob}
            onOpenChange={setJobModalOpen}
            onApply={handleApply}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default StudentHomepage;
