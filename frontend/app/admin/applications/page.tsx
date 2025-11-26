"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { jobPostings } from "@/data/jobPostings";
import JobModal, { Job } from "@/components/JobModalComponents/JobModal";
import JobApplicationsCard from "@/components/JobApplicationsCard";
import { useAppSelector } from "@/redux/hooks"; 

// Dummy applicants data
const dummyApplicants = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    branch: "CSE",
    cgpa: "8.7",
    resume: "https://example.com/resume/john.pdf",
  },
  {
    name: "Aditi Sharma",
    email: "aditi@example.com",
    phone: "9123456789",
    branch: "IT",
    cgpa: "9.1",
    resume: "https://example.com/resume/aditi.pdf",
  },
  {
    name: "Rohan Mehta",
    email: "rohan@example.com",
    phone: "9988776655",
    branch: "ECE",
    cgpa: "8.9",
    resume: "https://example.com/resume/rohan.pdf",
  },
];

// Convert JSON → CSV
const convertToCSV = (data: any[]) => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((v) => `"${v}"`)
      .join(",")
  );

  return [headers, ...rows].join("\n");
};

// Trigger CSV download
const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};

const ApplicationsAdminPage = (): React.JSX.Element => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const role = user?.role; 
  const isAdmin: boolean = role !== "student";

  const handleDownload = (job: Job) => {
    const csv = convertToCSV(dummyApplicants);
    downloadCSV(csv, `${job.company}_${job.role}_Applicants.csv`);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white flex flex-col gap-8">
        <PageHeader
          title="Applications Management"
          subtitle={
            role === "admin"
              ? "Click download to get the applicants list for each job"
              : "View all jobs you applied for"
          }
        />
        <div className="flex flex-col bg-white rounded-xl shadow-sm border border-neutral-200">
          {jobPostings.map((job) => (
            <JobApplicationsCard
              key={job.id}
              job={job}
              role={isAdmin ? "admin" : "student"} 
              appliedOn="2025-01-25" 
              onDownload={handleDownload}
              onOpenModal={(job) => {
                setSelectedJob(job);
                setJobModalOpen(true);
              }}
            />
          ))}
        </div>
      </main>

      {jobModalOpen && (
        <JobModal
          job={selectedJob}
          onOpenChange={setJobModalOpen}
          isAdmin={isAdmin} 
        />
      )}
    </>
  );
};

export default ApplicationsAdminPage;
