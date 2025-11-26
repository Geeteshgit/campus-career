import JobModalHeader from "./JobModalHeader";
import JobModalDetails from "./JobModalDetails";
import JobModalFooter from "./JobModalFooter";
import { useState } from "react";
import EditModal, { FieldConfig } from "../ui/EditModal";

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

  const jobFields: FieldConfig[] = [
  { name: "company", placeholder: "Company Name", type: "text" },
  { name: "role", placeholder: "Job Role / Position", type: "text" },
  { name: "location", placeholder: "Job Location", type: "text" },
  { name: "salary", placeholder: "Salary / Package", type: "text" },
  { name: "deadline", placeholder: "Application Deadline", type: "text" },
  { name: "positions", placeholder: "Number of Open Positions", type: "number" },

  {
    name: "type",
    placeholder: "Select Job Type",
    type: "select",
    options: ["Full-Time", "Internship"],
  },

  {
    name: "status",
    placeholder: "Select Job Status",
    type: "select",
    options: ["Active", "Inactive"],
  },

  {
    name: "description",
    placeholder: "Job Description",
    type: "textarea",
  },

  {
    name: "requirements",
    placeholder: "Requirements (one per line)",
    type: "textarea",
  },

  {
    name: "eligibility",
    placeholder: "Eligibility Criteria",
    type: "textarea",
  },
];


  const isActive = job.status === "Active";
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedData: any) => {
    const updatedJob = { ...editingJob, ...updatedData };
    console.log("Updated Job:", updatedJob);

    setEditingJob(null);
    setEditModalOpen(false);
  };

  const handleDelete = () => {};

  const handleApply = () => {
    alert(`You applied to ${job.company} for ${job.role}`);
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
          <JobModalHeader
            job={job}
            isActive={isActive}
            onClose={() => onOpenChange(false)}
          />

          <JobModalDetails job={job} />

          <JobModalFooter
            job={job}
            isActive={job.status === "Active"}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {editModalOpen && editingJob && (
        <EditModal
          title="Edit Job Posting"
          fields={jobFields}
          initialValues={editingJob} 
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default JobModal;
