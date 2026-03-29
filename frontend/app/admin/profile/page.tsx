"use client";

// Layout Components
import Navbar from "@/components/Navbar";

// Shared UI Components
import Button from "@/shared/ui/Button";
import PageHeader from "@/shared/ui/PageHeader";

// Features
import { ChangePassword, ProtectedRoute, useLogout } from "@/features/auth";
import { UserDetails } from "@/features/user";

const AdminProfile = () => {
  const { handleLogout, logoutPending } = useLogout();

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <PageHeader
              title="Admin Profile"
              subtitle="Manage your admin account details"
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
            <ChangePassword />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default AdminProfile;
