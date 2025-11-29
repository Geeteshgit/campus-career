import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsNumberCard from "./AnalyticsNumberCard";

interface UserAnalyticsProps {
  totalUsers: number;
  totalStudents: number;
  totalAdmins: number;
  studentsPerProgram: Record<string, number>;
  studentsPerYear: Record<string, number>;
}

const UsersAnalytics = ({
  totalUsers,
  totalStudents,
  totalAdmins,
  studentsPerProgram,
  studentsPerYear,
}: UserAnalyticsProps): React.JSX.Element => {
  const topStats = [
    { label: "Users", value: totalUsers },
    { label: "Students", value: totalStudents },
    { label: "Admins", value: totalAdmins },
  ];

  return (
    <AnalyticsCard title="User Stats">
      <div className="flex flex-col gap-8">

        {/* TOP CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          {topStats.map((stat) => (
            <AnalyticsNumberCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>

        {/* PROGRAM + YEAR CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* STUDENTS BY PROGRAM */}
          <div className="p-4 bg-white border border-blue-200 rounded-lg">
            <h4 className="font-medium text-neutral-700 mb-4">
              Students by Program
            </h4>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(studentsPerProgram).map(([program, count]) => (
                <AnalyticsNumberCard
                  key={program}
                  label={program}
                  value={count}
                />
              ))}
            </div>
          </div>

          {/* STUDENTS BY YEAR */}
          <div className="p-4 bg-white border border-blue-200 rounded-lg">
            <h4 className="font-medium text-neutral-700 mb-4">
              Students by Year
            </h4>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(studentsPerYear).map(([year, count]) => (
                <AnalyticsNumberCard
                  key={year}
                  label={year}
                  value={count}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </AnalyticsCard>
  );
};

export default UsersAnalytics;
