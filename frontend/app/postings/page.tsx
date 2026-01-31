"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/Navbar";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import PageHeader from "@/components/PageHeader";
import FilterSearchBar from "@/components/ui/FilterSearchBar";
import PostingsContainer from "@/components/PostingsContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AddModal, { FieldConfig } from "@/components/ui/AddModal";
import EditModal from "@/components/ui/EditModal";
import { useAppSelector } from "@/redux/hooks";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";

const Postings = (): React.JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [addJobModalOpen, setAddJobModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const student = useAppSelector((state) => state.user.studentProfile);
  const isAdmin = user?.role !== "student";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const jobFields: FieldConfig[] = [
    { name: "company", placeholder: "Company" },
    { name: "role", placeholder: "Job Role" },
    { name: "location", placeholder: "Location" },
    { name: "package", placeholder: "Package / Salary" },
    { name: "deadline", placeholder: "Deadline", type: "date" },
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

  const editFields: FieldConfig[] = [
    ...jobFields,
    {
      name: "status",
      placeholder: "Select Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Applied successfully!");

      setJobModalOpen(false);
    } catch (err: any) {
      console.error("Apply error:", err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleJobSave = async (formData: any) => {
    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements
          ? formData.requirements.split("\n")
          : [],
      };

      const response = await axios.post(
        `${env.JOB_SERVICE}/api/jobs`,
        jobData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobs((prev) => [...prev, response.data.job]);
      setAddJobModalOpen(false);
    } catch (err) {
      console.error("Job create error:", err);
    }
  };

  const handleEditButton = (job: Job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!selectedJob) return;

    try {
      const finalData = {
        ...updatedData,
        requirements: updatedData.requirements?.split("\n") || [],
      };

      const response = await axios.put(
        `${env.JOB_SERVICE}/api/jobs/${selectedJob._id}`,
        finalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs((prev) =>
        prev.map((job) =>
          job._id === selectedJob._id ? response.data.updatedJob : job
        )
      );

      setEditModalOpen(false);
      setJobModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Job update error:", err);
    }
  };

  const handleDelete = async (job: Job) => {
    try {
      await axios.delete(`${env.JOB_SERVICE}/api/jobs/${job._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs((prev) => prev.filter((j) => j._id !== job._id));
      setJobModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Job delete error:", err);
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
    <ProtectedRoute allowedRoles={["student", "admin", "super_admin"]}>
      <>
        <Navbar />

        <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Job Postings"
              subtitle="Manage and view job opportunities"
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

          <FilterSearchBar
            filters={["All", "Full-Time", "Internship"]}
            activeFilter={filter}
            onFilterChange={(f) => setFilter(f as any)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by company, role, or location..."
          />

          {loading ? (
            <p className="text-center text-neutral-600 py-10">
              Loading jobs...
            </p>
          ) : (
            <>
              <PostingsContainer
                title="Active Postings"
                jobs={activeJobs}
                onJobClick={handleJobClick}
              />

              <PostingsContainer
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
            onEdit={handleEditButton}
            onDelete={handleDelete}
            onApply={handleApply}
          />
        )}

        {addJobModalOpen && (
          <AddModal
            title="Create Job Posting"
            fields={jobFields}
            onClose={() => setAddJobModalOpen(false)}
            onSave={handleJobSave}
          />
        )}

        {editModalOpen && selectedJob && (
          <EditModal
            title="Edit Job Posting"
            fields={editFields}
            initialValues={{
              ...selectedJob,
              deadline: selectedJob.deadline?.split("T")[0],
              requirements: selectedJob.requirements.join("\n"),
            }}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default Postings;
