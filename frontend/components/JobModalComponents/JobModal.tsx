import JobModalHeader from "./JobModalHeader";
import JobModalDetails from "./JobModalDetails";
import JobModalFooter from "./JobModalFooter";

export interface Job {
  _id: string;
  company: string;
  role: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

interface JobModalProps {
  job: Job | null;
  isAdmin?: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

const JobModal = ({
  job,
  isAdmin = false,
  onOpenChange,
  onDelete,
  onEdit,
  onApply
}: JobModalProps) => {

  if (!job) return null;
  
  const handleEditClick = () => {
    if (onEdit) onEdit(job);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(job);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={() => onOpenChange(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-6 relative"
        >
          <JobModalHeader job={job} isActive={job.status === "Active"} onClose={() => onOpenChange(false)} />

          <JobModalDetails job={job} />

          <JobModalFooter
            job={job}
            isActive={job.status === "Active"}
            isAdmin={isAdmin}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onApply={onApply}
          />
        </div>
      </div>
    </>
  );
};

export default JobModal;
