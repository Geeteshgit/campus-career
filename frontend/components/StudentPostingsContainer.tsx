"use client";

import StudentJobCard from "@/components/StudentJobCard";
import { Job } from "@/components/JobModalComponents/JobModal";
import React from "react";

interface StudentPostingsContainerProps {
  title: string;
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const StudentPostingsContainer = ({
  title,
  jobs,
  onJobClick,
}: StudentPostingsContainerProps): React.JSX.Element => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map((job) => (
            <StudentJobCard key={job._id} job={job} onClick={() => onJobClick(job)} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-8">
          No {title.toLowerCase()} found
        </p>
      )}
    </section>
  );
};

export default StudentPostingsContainer;
