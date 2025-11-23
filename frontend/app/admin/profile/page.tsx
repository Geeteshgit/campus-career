"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserField } from "@/redux/features/user/userSlice";

import FormLabel from "@/components/FormComponents/FormLabel";
import ReadOnlyField from "@/components/FormComponents/ReadonlyField";
import InputField from "@/components/FormComponents/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProfileChangePassword from "@/components/ProfileComponents/ProfileChangePassword";

const AdminProfile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleSave = () => {
    alert("Profile Saved!");
  };

  const handlePasswordChange = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return alert("Passwords do not match!");
    }
    alert("Password updated");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white flex flex-col gap-8">
        <PageHeader
          title="Admin Profile"
          subtitle="Manage your admin account details"
        />

        <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6 flex flex-col gap-6">

          {/* NAME + EMAIL */}
          <div className="flex flex-col md:flex-row gap-6">

            <div className="w-full">
              <FormLabel>Name</FormLabel>
              <ReadOnlyField value={user?.name ?? ""} />
            </div>

            <div className="w-full">
              <FormLabel>Email</FormLabel>
              <ReadOnlyField value={user?.email ?? ""} />
            </div>
          </div>

          {/* PHONE NUMBER */}
          <div>
            <FormLabel>Phone Number</FormLabel>
            <InputField
              name="phone"
              placeholder="Phone Number"
              value={user?.phone ?? ""}
              onChange={(e) =>
                dispatch(updateUserField({ field: "phone", value: e.target.value }))
              }
            />
          </div>

          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
          <ProfileChangePassword onSubmit={handlePasswordChange} />
        </div>
      </main>
    </>
  );
};

export default AdminProfile;
