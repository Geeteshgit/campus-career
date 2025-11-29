"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import { FieldConfig } from "@/components/ui/EditModal";
import EditModal from "@/components/ui/EditModal";
import { useAppSelector } from "@/redux/hooks";
import { env } from "@/config/env";
import JobApplicationsCard from "@/components/JobApplicationsCard";
import FilterSearchBar from "@/components/ui/FilterSearchBar";
import ProtectedRoute from "@/components/ProtectedRoute";

const exportCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(data[0]).join(",");
  const rows = data
    .map((row) =>
      Object.values(row)
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\n");

  const csv = `${headers}\n${rows}`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};

const ApplicationsAdminPage = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const isAdmin = user?.role !== "student";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [filter, setFilter] = useState<"All" | "Full-Time" | "Internship">(
    "All"
  );

  const [searchTerm, setSearchTerm] = useState("");

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
      const response = await axios.get(`${env.JOB_SERVICE}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data.jobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editingJob) return;

    try {
      const finalData = {
        ...updatedData,
        requirements: updatedData.requirements?.split("\n") || [],
      };

      const response = await axios.put(
        `${env.JOB_SERVICE}/api/jobs/${editingJob._id}`,
        finalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs((prev) =>
        prev.map((j) =>
          j._id === editingJob._id ? response.data.updatedJob : j
        )
      );

      setEditModalOpen(false);
      setJobModalOpen(false);
      setEditingJob(null);
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

  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const handleDownload = async (job: Job) => {
    try {
      const response = await axios.get(
        `${env.JOB_SERVICE}/api/applications/${job._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const applicants = response.data.applicants;

      if (!applicants || applicants.length === 0) {
        alert("No applicants found for this job.");
        return;
      }

      const formatted = applicants.map((a: any) => ({
        enrollmentNumber: a.enrollmentNumber,
        name: a.name,
        email: a.email,
        phone: a.phone,
        program: a.program,
        year: a.year,
        cgpa: a.cgpa,
        appliedOn: new Date(a.createdAt).toLocaleDateString("en-GB"),
      }));

      exportCSV(formatted, `${job.company}_${job.role}_Applicants.csv`);
    } catch (err) {
      console.error("Download CSV error:", err);
      alert("Failed to download CSV");
    }
  };

  const filteredByType =
    filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const filteredJobs = filteredByType.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.company.toLowerCase().includes(term) ||
      job.role.toLowerCase().includes(term)
    );
  });

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white flex flex-col gap-8">
          <PageHeader
            title="Applications Management"
            subtitle="Manage all job postings & view applicants"
          />

          <FilterSearchBar
            filters={["All", "Full-Time", "Internship"]}
            activeFilter={filter}
            onFilterChange={(f) => setFilter(f as any)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by company or role..."
          />

          <div className="flex flex-col bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            {filteredJobs.map((job) => (
              <JobApplicationsCard
                key={job._id}
                job={job}
                isAdmin={isAdmin}
                onDownload={handleDownload}
                onOpenModal={openJobModal}
              />
            ))}

            {filteredJobs.length === 0 && (
              <p className="py-5 text-center text-neutral-600">
                No job postings found.
              </p>
            )}
          </div>
        </main>

        {jobModalOpen && selectedJob && (
          <JobModal
            job={selectedJob}
            isAdmin={isAdmin}
            onOpenChange={setJobModalOpen}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}

        {editModalOpen && editingJob && (
          <EditModal
            title="Edit Job Posting"
            fields={editFields}
            initialValues={{
              ...editingJob,
              deadline: editingJob.deadline?.split("T")[0],
              requirements: editingJob.requirements.join("\n"),
            }}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        )}
      </>
    </ProtectedRoute>
  );
};

export default ApplicationsAdminPage;
