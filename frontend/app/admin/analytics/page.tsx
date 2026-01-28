"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import UsersAnalytics from "@/components/AnalyticsComponents/UserAnalytics";
import JobsAnalytics from "@/components/AnalyticsComponents/JobAnalytics";
import AcademicAnalytics from "@/components/AnalyticsComponents/AcademicAnalytics";
import axios from "axios";
import { env } from "@/config/env";
import ProtectedRoute from "@/components/ProtectedRoute";

const Analytics = (): React.JSX.Element => {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${env.ANALYTICS_SERVICE}/api/analytics`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setStatsData(response.data.analytics);
    } catch (err) {
      console.error("Analytics fetch failed:", err);
      setStatsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-white flex flex-col gap-8">
          <PageHeader
            title="Platform Analytics"
            subtitle="Track platform-wide metrics"
          />

          {loading ? (
            <p className="text-center text-neutral-600 py-10">
              Loading analytics...
            </p>
          ) : !statsData ? (
            <p className="text-center text-neutral-500 py-10">
              Analytics data is currently unavailable.
            </p>
          ) : (
            <>
              <UsersAnalytics
                totalUsers={statsData.users.stats.totalUsers}
                totalStudents={statsData.users.stats.students}
                totalAdmins={statsData.users.stats.admins}
                studentsPerProgram={statsData.students.stats.studentsPerProgram}
                studentsPerYear={statsData.students.stats.studentsPerYear}
              />

              <JobsAnalytics
                totalJobs={statsData.jobs.stats.totalJobs}
                activeJobs={statsData.jobs.stats.activeJobs}
                inactiveJobs={statsData.jobs.stats.inactiveJobs}
                fulltime={statsData.jobs.stats.fullTime}
                internship={statsData.jobs.stats.internship}
                application={statsData.applications.stats.totalApplications}
              />

              <AcademicAnalytics
                totalPrograms={statsData.programs.stats.totalPrograms}
              />
            </>
          )}
        </main>
      </>
    </ProtectedRoute>
  );
};

export default Analytics;
