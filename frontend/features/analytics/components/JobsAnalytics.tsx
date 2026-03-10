import React from "react";
import "@/lib/chart";
import { Doughnut } from "react-chartjs-2";

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
  const blueShades = ["#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB"];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <p className="font-medium text-neutral-600">Total Jobs</p>
          <p className="text-5xl font-bold text-neutral-900">{totalJobs}</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <p className="font-medium text-neutral-600">Applications</p>
          <p className="text-5xl font-bold text-neutral-900">{application}</p>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-4">
        <p className="font-medium text-neutral-700">
          Job Type Distribution
        </p>

        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-5 rounded-sm"
                style={{ backgroundColor: blueShades[3] }}
              />
              <p className="text-neutral-900 font-semibold">
                {fulltime} Full-time
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-8 h-5 rounded-sm"
                style={{ backgroundColor: blueShades[1] }}
              />
              <p className="text-neutral-900 font-semibold">
                {internship} Internship
              </p>
            </div>
          </div>
          <div className="w-40 h-40">
            <Doughnut
              data={{
                labels: ["Full-time", "Internship"],
                datasets: [
                  {
                    data: [fulltime, internship],
                    backgroundColor: [blueShades[3], blueShades[1]],
                  },
                ],
              }}
              options={{
                responsive: true,
                cutout: "60%",
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-4">
        <p className="font-medium text-neutral-700">
          Job Status
        </p>

        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-5 rounded-sm"
                style={{ backgroundColor: blueShades[4] }}
              />
              <p className="text-neutral-900 font-semibold">
                {activeJobs} Active
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-8 h-5 rounded-sm"
                style={{ backgroundColor: blueShades[0] }}
              />
              <p className="text-neutral-900 font-semibold">
                {inactiveJobs} Inactive
              </p>
            </div>
          </div>

          <div className="w-40 h-40">
            <Doughnut
              data={{
                labels: ["Active", "Inactive"],
                datasets: [
                  {
                    data: [activeJobs, inactiveJobs],
                    backgroundColor: [blueShades[4], blueShades[0]],
                  },
                ],
              }}
              options={{
                responsive: true,
                cutout: "60%",
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsAnalytics;
