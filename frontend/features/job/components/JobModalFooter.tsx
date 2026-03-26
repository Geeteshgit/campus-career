"use client";

// Shared UI Components
import Button from "@/shared/ui/Button";

// Features
import { Job } from "@/features/job";

type JobModalFooterProps = {
  job: Job;
  isActive: boolean;
  isAdmin?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onApply?: (job: Job) => void;
  isPending?: boolean;
};

const JobModalFooter = ({
  job,
  isActive,
  isAdmin,
  onEdit,
  onDelete,
  onApply,
  isPending,
}: JobModalFooterProps) => {
  if (!isActive) return null;

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-2">
      {isAdmin ? (
        <>
          <Button
            variant="primary"
            onClick={() => onEdit && onEdit(job)}
            className="w-full"
          >
            Edit Posting
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete && onDelete(job)}
            className="w-full"
            disabled={isPending}
          >
            Delete Posting
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          onClick={() => onApply && onApply(job)}
          className="w-full"
        >
          Apply Now
        </Button>
      )}
    </div>
  );
};

export default JobModalFooter;
