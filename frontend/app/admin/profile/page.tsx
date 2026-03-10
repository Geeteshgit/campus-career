"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/shared/ui/PageHeader";
import FormLabel from "@/shared/ui/FormLabel";
import ReadOnlyField from "@/shared/ui/ReadonlyField";
import InputField from "@/shared/ui/InputField";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import DangerButton from "@/shared/ui/DangerButton";
import { ProfileChangePassword } from "@/features/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  login,
  logout,
  updateUserField,
} from "@/redux/features/user/userSlice";
import { env } from "@/config/env";
import { disconnectSocket } from "@/lib/socket";
import { ProtectedRoute } from "@/features/auth";

const AdminProfile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${env.USER_SERVICE}/api/user`,
        { phone: user?.phone },
        { withCredentials: true },
      );

      dispatch(
        login({
          user: response.data.updatedUser,
          studentProfile: null,
        }),
      );

      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Failed to update profile", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${env.USER_SERVICE}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      
      dispatch(logout());
      disconnectSocket();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
            <DangerButton onClick={handleLogout}>Logout</DangerButton>
          </div>

          {!user ? (
            <div className="p-6">Loading...</div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <FormLabel>Name</FormLabel>
                  <ReadOnlyField value={user.name} />
                </div>

                <div className="w-full">
                  <FormLabel>Email</FormLabel>
                  <ReadOnlyField value={user.email} />
                </div>
              </div>

              <div>
                <FormLabel>Phone Number</FormLabel>
                <InputField
                  name="phone"
                  placeholder="Phone Number"
                  value={user.phone}
                  onChange={(e) =>
                    dispatch(
                      updateUserField({
                        field: "phone",
                        value: e.target.value,
                      }),
                    )
                  }
                />
              </div>

              <PrimaryButton onClick={handleSave}>Save</PrimaryButton>

              <ProfileChangePassword />
            </div>
          )}
        </main>
      </>
    </ProtectedRoute>
  );
};

export default AdminProfile;
