import JobModalHeader from "./JobModalHeader";
import JobModalDetails from "./JobModalDetails";
import JobModalFooter from "./JobModalFooter";

export interface Job {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: string;
  status: "Active" | "Inactive";
  postedOn: string;
}

interface JobModalProps {
  job: Job | null;
  isAdmin?: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (job: Job) => void;
  onEdit?: (job: Job) => void;
}

const JobModal = ({
  job,
  isAdmin = false,
  onOpenChange,
  onDelete,
  onEdit,
}: JobModalProps) => {
  if (!job) return null;

  const isActive = job.status === "Active";

  const handleApply = () => {
    alert(`You applied to ${job.company} for ${job.role}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-6 relative"
      >
        <JobModalHeader
          job={job}
          isActive={isActive}
          onClose={() => onOpenChange(false)}
        />

        <JobModalDetails job={job} />

        <JobModalFooter
          job={job}
          isActive={isActive}
          isAdmin={isAdmin}
          onApply={handleApply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default JobModal;
