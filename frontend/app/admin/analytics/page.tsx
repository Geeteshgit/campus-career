"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import PageHeader from "@/shared/ui/PageHeader";
import AsyncState from "@/shared/ui/AsyncState";

// Features
import { ProtectedRoute } from "@/features/auth";
import {
  UsersAnalytics,
  JobsAnalytics,
  useAnalytics,
} from "@/features/analytics";

const Analytics = () => {
  const { analytics, analyticsLoading, analyticsError, analyticsErrorObj } =
    useAnalytics();

  const userStats = analytics?.users?.stats;
  const studentStats = analytics?.students?.stats;
  const jobStats = analytics?.jobs?.stats;
  const applicationStats = analytics?.applications?.stats;

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-white flex flex-col gap-8">
          <PageHeader
            title="Platform Analytics"
            subtitle="Track platform-wide metrics"
          />
          <AsyncState
            isLoading={analyticsLoading}
            isError={analyticsError}
            error={analyticsErrorObj}
            isEmpty={false}
            errorText="Failed to load analytics"
            emptyText="No analytics found"
          >
            <>
              <UsersAnalytics
                totalUsers={userStats?.totalUsers ?? 0}
                totalStudents={userStats?.students ?? 0}
                totalAdmins={userStats?.admins ?? 0}
                studentsPerProgram={studentStats?.studentsPerProgram ?? {}}
                studentsPerYear={studentStats?.studentsPerYear ?? {}}
              />

              <JobsAnalytics
                totalJobs={jobStats?.totalJobs ?? 0}
                activeJobs={jobStats?.activeJobs ?? 0}
                inactiveJobs={jobStats?.inactiveJobs ?? 0}
                fulltime={jobStats?.fullTime ?? 0}
                internship={jobStats?.internship ?? 0}
                application={applicationStats?.totalApplications ?? 0}
              />
            </>
          </AsyncState>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default Analytics;
