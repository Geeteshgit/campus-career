import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import { Job } from "./JobModal";
import React from "react";

const JobModalDetails = ({ job }: { job: Job }): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-5">
      {/* Grid Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt className="text-blue-500 w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaRupeeSign className="text-blue-500 w-4 h-4" />
          <span>{job.package}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaCalendarAlt className="text-blue-500 w-4 h-4" />
          <span>Deadline: {job.deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaUsers className="text-blue-500 w-4 h-4" />
          <span>{job.positions} positions</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-neutral-900">Job Description</h3>
        <p className="text-sm text-neutral-800 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Requirements */}
      <div>
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
      <div>
        <h3 className="font-semibold text-neutral-900">Eligibility</h3>
        <p className="text-sm text-neutral-800">{job.eligibility}</p>
      </div>
    </div>
  );
};

export default JobModalDetails;