"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import Button from "@/shared/ui/Button";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ChangePassword, ProtectedRoute, useLogout } from "@/features/auth";
import { UserDetails } from "@/features/user";
import { StudentDetails } from "@/features/student";
import { useRouter } from "next/navigation";

const StudentProfile = () => {
  const router = useRouter();
  const { handleLogout, logoutPending } = useLogout();

  const onLogout = async () => {
    try {
      await handleLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <PageHeader
              title="My Profile"
              subtitle="Manage your personal and academic details"
            />
            <Button
              variant="danger"
              onClick={onLogout}
              disabled={logoutPending}
            >
              Logout
            </Button>
          </div>
          <UserDetails />
          <StudentDetails />
          <ChangePassword />
        </main>
      </>
    </ProtectedRoute>
  );
};

export default StudentProfile;
