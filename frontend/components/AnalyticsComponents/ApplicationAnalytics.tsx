import React from "react";
import AnalyticsCard from "./AnalyticsCard";

const ApplicationAnalytics = ({ totalApplications }: { totalApplications: number }): React.JSX.Element => {
  return (
    <AnalyticsCard title="Applications">
      <div className="p-4 bg-white border rounded-lg">
        <p className="text-neutral-600 text-sm">Total Applications</p>
        <h3 className="text-3xl font-bold">{totalApplications}</h3>
      </div>
    </AnalyticsCard>
  );
};

export default ApplicationAnalytics;
