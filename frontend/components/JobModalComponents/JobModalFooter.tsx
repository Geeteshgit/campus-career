import { Job } from "./JobModal";

interface JobModalFooterProps {
  job: Job;
  isActive: boolean;
  isAdmin?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onApply?: () => void;
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
          <button
            onClick={() => onEdit && onEdit(job)}
            className="w-full h-12 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 hover:scale-[1.01] duration-300 transition cursor-pointer"
          >
            Edit Posting
          </button>

          <button
            onClick={() => onDelete && onDelete(job)}
            className="w-full h-12 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 hover:scale-[1.01] duration-300 transition cursor-pointer"
          >
            Delete Posting
          </button>
        </>
      ) : (
        <button
          onClick={onApply}
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 hover:scale-[1.01] duration-300 transition cursor-pointer"
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default JobModalFooter;
