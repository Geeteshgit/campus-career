"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import FormLabel from "@/components/FormComponents/FormLabel";
import ReadOnlyField from "@/components/FormComponents/ReadonlyField";
import InputField from "@/components/FormComponents/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DangerButton from "@/components/ui/DangerButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  login,
  logout,
  updateUserField,
} from "@/redux/features/user/userSlice";

import { env } from "@/config/env";
import { disconnectSocket } from "@/lib/socket";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminProfile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!user) return <div className="p-6">Loading...</div>;

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${env.USER_SERVICE}/api/user`,
        { phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        login({
          user: response.data.updatedUser,
          studentProfile: null,
        })
      );

      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Failed to update profile", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    disconnectSocket();
    dispatch(logout());
    localStorage.removeItem("token");
    router.replace("/login");
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
                    updateUserField({ field: "phone", value: e.target.value })
                  )
                }
              />
            </div>

            <PrimaryButton onClick={handleSave}>Save</PrimaryButton>

            <ProfileChangePassword />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
};

export default AdminProfile;
