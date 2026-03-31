"use client";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Features
import { useMeQuery } from "@/features/auth";

// Local Imports
import { useUpdateMyAccount } from "../hooks/useUserManagement";
import UserDetailsView from "./UserDetailsView";
import UserDetailsForm from "./UserDetailsForm";

const UserDetails = () => {
  const {
    data: userData,
    isPending: userDataLoading,
    isError: userDataError,
    error: userDataErrorObj,
  } = useMeQuery();

  const user = userData?.user;

  const {
    handleUpdateMyAccount,
    updatePending,
    isEditing,
    handleStartEdit,
    handleCancelEdit,
  } = useUpdateMyAccount();

  return (
    <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-6">
      <AsyncState
        isLoading={userDataLoading}
        isError={userDataError}
        error={userDataErrorObj}
        isEmpty={!user}
        loadingText="Loading user details"
        errorText="Failed to load user details"
        emptyText="No user details found"
      >
        {user &&
          (isEditing ? (
            <UserDetailsForm
              data={user}
              onSave={handleUpdateMyAccount}
              onCancel={handleCancelEdit}
              isSaving={updatePending}
            />
          ) : (
            <UserDetailsView data={user} onEdit={handleStartEdit} />
          ))}
      </AsyncState>
    </div>
  );
};

export default UserDetails;
