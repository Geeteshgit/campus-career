import React from "react";
import "@/lib/chart";
import { Bar, Doughnut } from "react-chartjs-2";

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
  const blueShades = ["#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB"];

  const totalYears = Object.keys(studentsPerYear).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-2">
          <div>
            <p className="font-medium text-neutral-600">Users</p>
            <p className="text-5xl font-bold text-neutral-900">{totalUsers}</p>
          </div>
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-5 rounded-sm"
                  style={{ backgroundColor: blueShades[3] }}
                />
                <div className="flex items-center gap-1">
                  <p className="text-neutral-900 text-lg font-semibold">
                    {totalStudents}
                  </p>
                  <p className="text-neutral-700">Students</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-5 rounded-sm"
                  style={{ backgroundColor: blueShades[1] }}
                />
                <div className="flex items-center gap-1">
                  <p className="text-neutral-900 text-lg font-semibold">
                    {totalAdmins}
                  </p>
                  <p className="text-neutral-700">Admins</p>
                </div>
              </div>
            </div>
            <div className="w-40 h-40">
              <Doughnut
                data={{
                  labels: ["Students", "Admins"],
                  datasets: [
                    {
                      data: [totalStudents, totalAdmins],
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
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-2">
          <div>
            <p className="font-medium text-neutral-600">Years</p>
            <p className="text-5xl font-bold text-neutral-900">{totalYears}</p>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-sm">
              {Object.entries(studentsPerYear).map(([year, count], index) => {
                const color = blueShades[index % blueShades.length];

                return (
                  <div key={year} className="flex items-center gap-3">
                    <span
                      className="w-8 h-5 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex items-center gap-1">
                      <p className="text-neutral-900 text-lg font-semibold">
                        {count}
                      </p>
                      <p className="text-neutral-700">in {year}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-40 h-40">
              <Doughnut
                data={{
                  labels: Object.keys(studentsPerYear),
                  datasets: [
                    {
                      data: Object.values(studentsPerYear),
                      backgroundColor: Object.keys(studentsPerYear).map(
                        (_, index) => blueShades[index % blueShades.length],
                      ),
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
      <div className="bg-blue-50 rounded-xl p-8 flex flex-col gap-6">
        <div>
          <p className="font-medium text-neutral-700">Students by Program</p>
        </div>
        <div className="w-full h-72">
          <Bar
            data={{
              labels: Object.keys(studentsPerProgram),
              datasets: [
                {
                  label: "Students",
                  data: Object.values(studentsPerProgram),
                  backgroundColor: blueShades[3], 
                  borderRadius: 8,
                  barThickness: 35,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "#111827",
                  titleColor: "#ffffff",
                  bodyColor: "#ffffff",
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#374151",
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "#E5E7EB",
                  },
                  ticks: {
                    color: "#374151",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersAnalytics;
