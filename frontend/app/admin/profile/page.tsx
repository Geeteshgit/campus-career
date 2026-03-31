"use client";

// React
import { useRouter } from "next/navigation";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import Button from "@/shared/ui/Button";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ChangePassword, ProtectedRoute, useLogout } from "@/features/auth";
import { UserDetails } from "@/features/user";

const AdminProfile = () => {
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
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Admin Profile"
              subtitle="Manage your admin account details"
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
          <ChangePassword />
        </main>
      </>
    </ProtectedRoute>
  );
};

export default AdminProfile;
