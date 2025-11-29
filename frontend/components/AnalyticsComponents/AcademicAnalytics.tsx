import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsNumberCard from "./AnalyticsNumberCard";

interface AcademicAnalyticsProps {
  totalPrograms: number;
}

const AcademicAnalytics = ({
  totalPrograms,
}: AcademicAnalyticsProps): React.JSX.Element => {
  const academicStats = [
    { label: "Total Programs", value: totalPrograms },
  ];

  return (
    <AnalyticsCard title="Academic Stats">
      <div className="text-center">
        {academicStats.map((stat) => (
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

export default AcademicAnalytics;
