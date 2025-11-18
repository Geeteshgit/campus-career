"use client";

import JobCard from "@/components/JobCard";
import { Job } from "@/components/JobModal";
import React from "react";

interface PostingsContainerProps {
  title: string;
  jobs: Job[];
  onJobClick: (job: Job) => void;
  inactive?: boolean;
}

const PostingsContainer = ({
  title,
  jobs,
  onJobClick,
  inactive = false,
}: PostingsContainerProps): React.JSX.Element => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map((job) => (
            <div key={job.id} className={inactive ? "opacity-70" : ""}>
              <JobCard job={job} onClick={() => onJobClick(job)} />
            </div>
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

export default PostingsContainer;
