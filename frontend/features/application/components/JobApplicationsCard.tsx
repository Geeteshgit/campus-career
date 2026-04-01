// External Libraries
import clsx from "clsx";
import { FiDownload } from "react-icons/fi";

// Types
import type { Job } from "@/features/job";

// Shared UI Components
import Button from "@/shared/ui/Button";

type JobApplicationsCardProps = {
  job: Job;
  isAdmin: boolean;
  onDownload?: (job: Job) => void;
  onOpenModal: (job: Job) => void;
};

const JobApplicationsCard = ({
  job,
  isAdmin,
  onDownload,
  onOpenModal,
}: JobApplicationsCardProps) => {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";
  return (
    <div onClick={() => onOpenModal(job)} className="bg-white hover:bg-blue-50 border border-neutral-200 rounded-xl shadow-sm transition cursor-pointer">
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 px-4 py-2 ">
        <div className="flex flex-col">
          <p className="text-base sm:text-lg font-semibold text-neutral-900">
            {job.role}
          </p>
          <p className="text-neutral-600 text-sm ">{job.company}</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-center">
          <span
            className={clsx("px-2 py-1 text-xs font-semibold rounded-full", {
              "bg-green-100 text-green-700": job.status === "Active",
              "bg-neutral-200 text-neutral-600": job.status === "Inactive",
            })}
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
          {isAdmin && onDownload && (
            <Button
              variant="primary"
              onClick={() => onDownload(job)}
              className="flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Download CSV
            </Button>
          )}

          {!isAdmin && (
            <p className="text-sm font-medium text-neutral-700">
              Applied on:{" "}
              <span className="font-semibold text-neutral-900">
                {formattedDate}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsCard;
