import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Job } from "./JobModalComponents/JobModal";
import React from "react";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps): React.JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-xl border border-neutral-200 cursor-pointer bg-white hover:shadow-lg hover:scale-[1.01] transition-all duration-300 hover:border-blue-500"
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-neutral-900 mb-1">{job.role}</h3>
          <div className="flex items-center gap-2 text-blue-500 font-semibold">
            <FaBuilding className="w-4 h-4" />
            <span>{job.company}</span>
          </div>
        </div>

        {/* Job Type Badge */}
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-700">
          {job.type}
        </span>
      </div>

      {/* Job Info Section */}
      <div className="space-y-2 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="w-4 h-4 text-neutral-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="w-4 h-4 text-neutral-500" />
          <span>Apply by: {job.deadline}</span>
        </div>
      </div>

      {/* Salary Section */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-sm font-semibold text-neutral-900">
          Package: <span className="text-blue-500">{job.salary}</span>
        </p>
      </div>
    </div>
  );
};

export default JobCard;
