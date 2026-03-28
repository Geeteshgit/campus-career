"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import Button from "@/shared/ui/Button";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ProtectedRoute, useLogout } from "@/features/auth";
import { ProfileChangePassword, UserDetails } from "@/features/user";
import { StudentDetails } from "@/features/student";

const StudentProfile = () => {

  const { handleLogout, logoutPending } = useLogout();

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <PageHeader
              title="My Profile"
              subtitle="Manage your personal and academic details"
            />
            <Button
              variant="danger"
              onClick={handleLogout}
              disabled={logoutPending}
            >
              Logout
            </Button>
          </div>
          <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6 flex flex-col gap-6">
            <UserDetails />
            <StudentDetails />
            <ProfileChangePassword />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default StudentProfile;
