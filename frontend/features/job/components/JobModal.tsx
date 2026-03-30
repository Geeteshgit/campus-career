"use client";

// Features
import type { Job } from "@/features/job";

// Shared UI Components
import Modal from "@/shared/ui/Modal";

// Local Imports
import JobModalDetails from "./JobModalDetails";
import JobModalFooter from "./JobModalFooter";
import JobModalHeader from "./JobModalHeader";

type JobModalProps = {
  job: Job | null;
  isAdmin?: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onApply?: (job: Job) => void;
  isPending?: boolean;
};

const JobModal = ({
  job,
  isAdmin = false,
  onOpenChange,
  onDelete,
  onEdit,
  onApply,
  isPending = false,
}: JobModalProps) => {
  if (!job) return null;
  const handleEditClick = () => {
    if (onEdit) onEdit(job);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(job);
  };

  return (
    <Modal open={!!job} onOpenChange={onOpenChange} className="max-w-2xl!">
      <div className="flex flex-col gap-6">
        <JobModalHeader
          job={job}
          isActive={job.status === "Active"}
        />

        <JobModalDetails job={job} />

        <JobModalFooter
          job={job}
          isActive={job.status === "Active"}
          isAdmin={isAdmin}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onApply={onApply}
          isPending={isPending}
        />
      </div>
    </Modal>
  );
};

export default JobModal;
