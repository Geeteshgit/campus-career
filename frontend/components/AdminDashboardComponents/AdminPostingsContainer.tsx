"use client";

import React from "react";
import { Job } from "@/components/JobModalComponents/JobModal";
import AdminJobCard from "./AdminJobCard";

interface AdminPostingsContainerProps {
  title: string;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  inactive?: boolean;
}

const AdminPostingsContainer = ({
  title,
  jobs,
  onJobClick,
  inactive = false,
}: AdminPostingsContainerProps): React.JSX.Element => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-5 gap-3 rounded-xl bg-blue-50 p-4">
        <p className="text-sm font-semibold text-neutral-600">Company</p>
        <p className="text-sm font-semibold text-neutral-600">Role</p>
        <p className="text-sm font-semibold text-neutral-600 text-center">
          Type
        </p>
        <p className="text-sm font-semibold text-neutral-600 text-center">
          Package
        </p>
        <p className="text-sm font-semibold text-neutral-600 text-center">
          Deadline
        </p>
      </div>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-1">
          {jobs.map((job) => (
            <AdminJobCard
              key={job._id}
              job={job}
              onClick={() => onJobClick(job)}
            />
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-10">
          No {title.toLowerCase()} found
        </p>
      )}
      </div>
    </section>
  );
};

export default AdminPostingsContainer;
