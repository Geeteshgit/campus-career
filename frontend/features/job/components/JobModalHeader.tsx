// External Libraries
import clsx from "clsx";

// Features
import { Job } from "@/features/job";

type JobModalHeaderProps = {
  job: Job;
  isActive: boolean;
}

const JobModalHeader = ({
  job,
  isActive,
}: JobModalHeaderProps) => {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-300 pb-4 relative">
      <h2 className="text-2xl font-bold text-neutral-900">{job.role}</h2>
      <p className="text-lg font-semibold text-blue-500">{job.company}</p>
      <p className="text-sm text-neutral-600">
        Posted on: {formattedDate}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
          {job.type}
        </span>
        <span
          className={clsx("px-3 py-1 text-xs font-semibold rounded-full", {
            "bg-green-100 text-green-700": isActive,
            "bg-neutral-200 text-neutral-600": !isActive,
          })}
        >
          {job.status}
        </span>
      </div>
    </div>
  );
};

export default JobModalHeader;
