"use client";

// React
import React from "react";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Features
import { useMeQuery } from "@/features/auth";

// Local Imports
import { useUpdateMyAccount } from "../hooks/useUserManagement";
import UserDetailsView from "./UserDetailsView";
import UserDetailsForm from "./UserDetailsForm";

const UserDetails = (): React.JSX.Element => {
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
          <UserDetailsView key={user._id} data={user} onEdit={handleStartEdit} />
        ))}
    </AsyncState>
  );
};

export default UserDetails;
