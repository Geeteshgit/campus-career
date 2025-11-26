"use client";

import React from "react";
import { Job } from "@/components/JobModalComponents/JobModal";
import { FiDownload } from "react-icons/fi";
import PrimaryButton from "./ui/PrimaryButton";

interface JobApplicationsCardProps {
  job: Job;
  role: "super_admin" | "admin" | "student";
  appliedOn?: string;               
  onDownload?: (job: Job) => void;  
  onOpenModal: (job: Job) => void;
}

const JobApplicationsCard = ({
  job,
  role,
  appliedOn,
  onDownload,
  onOpenModal,
}: JobApplicationsCardProps): React.JSX.Element => {
  return (
    <div
      onClick={() => onOpenModal(job)}
      className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-5 border-b 
                 border-neutral-200 hover:bg-neutral-50 transition cursor-pointer"
    >
      <div className="flex flex-col text-left">
        <p className="text-lg font-semibold text-neutral-900">{job.company}</p>
        <p className="text-neutral-600 text-sm">{job.role}</p>
      </div>

      <div className="flex flex-wrap gap-2 sm:justify-center">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full 
          ${
            job.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-neutral-200 text-neutral-600"
          }`}
        >
          {job.status}
        </span>

        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
          {job.type}
        </span>
      </div>

      <div
        className="flex sm:justify-end"
        onClick={(e) => e.stopPropagation()} 
      >
        {role === "admin" && onDownload && (
          <PrimaryButton
            onClick={() => onDownload(job)}
            className="flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            Download CSV
          </PrimaryButton>
        )}

        {role === "student" && (
          <p className="text-sm font-medium text-neutral-700">
            Applied on:{" "}
            <span className="font-semibold text-neutral-900">{appliedOn}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsCard;
