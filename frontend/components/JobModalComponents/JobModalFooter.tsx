import DangerButton from "../ui/DangerButton";
import PrimaryButton from "../ui/PrimaryButton";
import { Job } from "./JobModal";

interface JobModalFooterProps {
  job: Job;
  isActive: boolean;
  isAdmin?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

const JobModalFooter = ({
  job,
  isActive,
  isAdmin,
  onEdit,
  onDelete,
  onApply,
}: JobModalFooterProps) => {
  if (!isActive) return null;

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-2">
      {isAdmin ? (
        <>
          <PrimaryButton onClick={() => onEdit && onEdit(job)} className="w-full">Edit Posting</PrimaryButton>
          <DangerButton onClick={() => onDelete && onDelete(job)} className="w-full">Delete Posting</DangerButton>
        </>
      ) : (
        <PrimaryButton onClick={() => onApply && onApply(job)} className="w-full">Apply Now</PrimaryButton>
      )}
    </div>
  );
};

export default JobModalFooter;
