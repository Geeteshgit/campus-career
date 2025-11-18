import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

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
  onOpenChange: (open: boolean) => void;
}

const JobModal = ({ job, onOpenChange }: JobModalProps)=> {
  if (!job) return null;

  const handleApply = () => {
    alert(`✅ Applied to ${job.company} - ${job.role}`);
  };

  const isActive = job.status === "Active";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto p-6 flex flex-col gap-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-5 right-5 text-neutral-600 hover:text-neutral-800 transition-colors cursor-pointer"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-neutral-300 pb-4">
          <h2 className="text-2xl font-bold text-neutral-900">{job.role}</h2>
          <p className="text-lg font-semibold text-blue-500">{job.company}</p>
          <p className="text-sm text-neutral-600">Posted on: {job.postedOn}</p>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-700">
              {job.type}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                job.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4">
          {/* Job Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              <FaMapMarkerAlt className="text-blue-500 w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              <FaRupeeSign className="text-blue-500 w-4 h-4" />
              <span>{job.package}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              <FaCalendarAlt className="text-blue-500 w-4 h-4" />
              <span>Deadline: {job.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-800">
              <FaUsers className="text-blue-500 w-4 h-4" />
              <span>{job.positions} positions</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-neutral-900">Job Description</h3>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-neutral-900">Requirements</h3>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-sm text-neutral-800">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-neutral-900">Eligibility</h3>
            <p className="text-sm text-neutral-800">{job.eligibility}</p>
          </div>

          {/* Apply Button */}
          {isActive ? (
            <button
              onClick={handleApply}
              className="w-full h-12 bg-blue-500 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
            >
              Apply Now
            </button>
          ) : (
            <button
              disabled
              className="w-full h-12 bg-neutral-200 text-neutral-500 text-base font-semibold rounded-lg cursor-not-allowed"
            >
              Applications Closed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobModal;
