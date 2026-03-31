import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateMyAccountMutation } from "./mutations";
import { UpdateUserPayload } from "../types/user.types";

export const useUpdateMyAccount = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { updateMyAccount, isPending: updatePending } =
    useUpdateMyAccountMutation();

  const handleStartEdit = () => setIsEditing(true);

  const handleCancelEdit = () => setIsEditing(false);

  const handleUpdateMyAccount = async (payload: UpdateUserPayload) => {
    try {
      await updateMyAccount(payload);
      setIsEditing(false);
      toast.success("Account updated successfully");
    } catch (err) {
      console.error("Failed to update account details", err);
      toast.error("Failed to update account");
    }
  };
  return {
    handleUpdateMyAccount,
    updatePending,
    isEditing,
    handleStartEdit,
    handleCancelEdit,
  };
};
