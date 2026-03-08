import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  logoutUser,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  changePassword,
  getMe,
} from "@/services/auth.service";

const STALE_TIME = 1000 * 60 * 1; // 1 minute
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

export const useMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    retry: false,
  });

  return {
    login: mutation.mutateAsync,
    ...mutation,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
    },
    retry: false,
  });

  return {
    logout: mutation.mutateAsync,
    ...mutation,
  };
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    retry: 1,
  });

  return {
    forgotPassword: mutation.mutateAsync,
    ...mutation,
  };
};

export const useVerifyResetOtp = () => {
  const mutation = useMutation({
    mutationFn: verifyResetOtp,
    retry: 1,
  });

  return {
    verifyOtp: mutation.mutateAsync,
    ...mutation,
  };
};

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    retry: 1,
  });

  return {
    resetPassword: mutation.mutateAsync,
    ...mutation,
  };
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.clear();
    },
    retry: 1,
  });

  return {
    changePassword: mutation.mutateAsync,
    ...mutation,
  };
};
