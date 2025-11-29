import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsNumberCard from "./AnalyticsNumberCard";

interface JobAnalyticsProps {
  totalJobs: number;
  activeJobs: number;
  inactiveJobs: number;
  fulltime: number;
  internship: number;
  application: number;
}

const JobsAnalytics = ({
  totalJobs,
  activeJobs,
  inactiveJobs,
  fulltime,
  internship,
  application,
}: JobAnalyticsProps): React.JSX.Element => {
  const jobStats = [
    { label: "Total Jobs", value: totalJobs },
    { label: "Active Jobs", value: activeJobs },
    { label: "Inactive Jobs", value: inactiveJobs },
    { label: "Full-Time", value: fulltime },
    { label: "Internships", value: internship },
    { label: "Applications", value: application },
  ];

  return (
    <AnalyticsCard title="Job Stats">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {jobStats.map((stat) => (
          <AnalyticsNumberCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </AnalyticsCard>
  );
};

export default JobsAnalytics;
