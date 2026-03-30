// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Local Imports
import AdminJobCard from "./AdminJobCard";

// Features
import { Job } from "@/features/job";

type AdminPostingsContainerProps = {
  title: string;
  jobs: Job[];
  jobsLoading: boolean;
  jobsError: boolean;
  jobsErrorObj: Error | null;
  onJobClick: (job: Job) => void;
};

const AdminPostingsContainer = ({
  title,
  jobs,
  jobsLoading,
  jobsError,
  jobsErrorObj,
  onJobClick,
}: AdminPostingsContainerProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-5 gap-3 rounded-xl bg-blue-50 p-4">
          <p className="text-sm font-semibold text-neutral-600">Company</p>
          <p className="text-sm font-semibold text-neutral-600">Role</p>
          <p className="text-sm font-semibold text-neutral-600 text-center">
            Type
          </p>
          <p className="text-sm font-semibold text-neutral-600 text-center">
            Package
          </p>
          <p className="text-sm font-semibold text-neutral-600 text-center">
            Deadline
          </p>
        </div>
        <AsyncState
          isLoading={jobsLoading}
          isError={jobsError}
          error={jobsErrorObj}
          isEmpty={jobs.length === 0}
          loadingText="Loading job postings"
          errorText="Failed to load job postings"
          emptyText="No job postings found"
        >
          <div className="flex flex-col gap-1">
            {jobs.map((job) => (
              <AdminJobCard
                key={job._id}
                job={job}
                onClick={() => onJobClick(job)}
              />
            ))}
          </div>
        </AsyncState>
      </div>
    </section>
  );
};

export default AdminPostingsContainer;
