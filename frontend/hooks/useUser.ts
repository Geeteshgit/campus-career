import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyAccount, getUserStats } from "@/services/user.service";

export const useUserStats = () => {
  return useQuery({
    queryKey: ["users", "stats"],
    queryFn: getUserStats,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateMyAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    updateMyAccount: mutation.mutateAsync,
    ...mutation,
  };
};
