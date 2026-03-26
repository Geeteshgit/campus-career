import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyAccount } from "./users.api";
import { User } from "../types/user.types";

export const useUpdateMyAccountMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyAccount,
    onSuccess: (data: { updatedUser: User }) => {
      queryClient.setQueryData(["auth", "me"], { user: data.updatedUser });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });

  return {
    updateMyAccount: mutation.mutateAsync,
    ...mutation,
  };
};
