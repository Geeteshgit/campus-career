import { Job } from "./JobModal";
import React from "react";
import CloseButton from "../ui/CloseButton";

interface JobModalHeaderProps {
  job: Job;
  isActive: boolean;
  onClose: () => void;
}

const JobModalHeader = ({
  job,
  isActive,
  onClose,
}: JobModalHeaderProps): React.JSX.Element => {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-300 pb-4 relative">
      <CloseButton onClick={onClose} />

      <h2 className="text-2xl font-bold text-neutral-900">{job.role}</h2>
      <p className="text-lg font-semibold text-blue-500">{job.company}</p>
      <p className="text-sm text-neutral-600">
        Posted on: {formattedDate}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-700">
          {job.type}
        </span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-neutral-200 text-neutral-600"
          }`}
        >
          {job.status}
        </span>
      </div>
    </div>
  );
};

export default JobModalHeader;
