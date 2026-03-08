import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyAccount, getUserStats } from "@/services/user.service";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const CACHE_TIME = 1000 * 60 * 10; // 10 minutes

export const useUserStats = () => {
  return useQuery({
    queryKey: ["users", "stats"],
    queryFn: getUserStats,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useUpdateMyAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    retry: 1,
  });

  return {
    updateMyAccount: mutation.mutateAsync,
    ...mutation,
  };
};
