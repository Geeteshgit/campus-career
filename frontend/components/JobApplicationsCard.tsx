import React from "react";
import { Job } from "@/components/JobModalComponents/JobModal";
import { FiDownload } from "react-icons/fi";
import PrimaryButton from "./ui/PrimaryButton";

interface JobApplicationsCardProps {
  job: Job;
  isAdmin: boolean;
  onDownload?: (job: Job) => void;
  onOpenModal: (job: Job) => void;
}

const JobApplicationsCard = ({
  job,
  isAdmin,
  onDownload,
  onOpenModal,
}: JobApplicationsCardProps): React.JSX.Element => {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";
  return (
    <div
      onClick={() => onOpenModal(job)}
      className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 p-4 border border-neutral-200 hover:bg-blue-50 transition cursor-pointer"
    >
      <div className="flex flex-col">
        <p className="text-base sm:text-lg font-semibold text-neutral-900">
          {job.role}
        </p>
        <p className="text-neutral-600 text-sm ">{job.company}</p>
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

      <div className="flex sm:justify-end" onClick={(e) => e.stopPropagation()}>
        {isAdmin && onDownload && (
          <PrimaryButton
            onClick={() => onDownload(job)}
            className="flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            Download CSV
          </PrimaryButton>
        )}

        {!isAdmin && (
          <p className="text-sm font-medium text-neutral-700">
            Applied on:{" "}
            <span className="font-semibold text-neutral-900">{formattedDate}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsCard;
