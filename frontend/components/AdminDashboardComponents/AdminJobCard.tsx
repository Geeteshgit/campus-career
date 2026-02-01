"use client";

import React from "react";
import { Job } from "@/components/JobModalComponents/JobModal";

interface AdminJobCardProps {
  job: Job;
  onClick: () => void;
}

const AdminJobCard = ({
  job,
  onClick,
}: AdminJobCardProps): React.JSX.Element => {
  return (
    <div
      className={`bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition cursor-pointer ${job.status === "Inactive" ? "opacity-70" : ""}`}
      onClick={onClick}
    >
      <div className="grid grid-cols-5 items-center gap-3">
        <p className="font-semibold text-neutral-900 truncate">{job.company}</p>
        <p className="font-semibold text-neutral-900 truncate">{job.role}</p>
        <p className="font-semibold text-neutral-900 truncate text-center">{job.type}</p>
        <p className="font-semibold text-neutral-900 truncate text-center">{job.package}</p>
        <p className="font-semibold text-neutral-900 truncate text-center">
          {new Date(job.deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default AdminJobCard;
