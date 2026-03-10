import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  logoutUser,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  changePassword,
  getMe,
} from "../api/auth.api";

const STALE_TIME = 1000 * 60 * 1; // 1 minute

export const useMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: STALE_TIME, 
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
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
  });

  return {
    logout: mutation.mutateAsync,
    ...mutation,
  };
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  return {
    forgotPassword: mutation.mutateAsync,
    ...mutation,
  };
};

export const useVerifyResetOtp = () => {
  const mutation = useMutation({
    mutationFn: verifyResetOtp,
  });

  return {
    verifyOtp: mutation.mutateAsync,
    ...mutation,
  };
};

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
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
  });

  return {
    changePassword: mutation.mutateAsync,
    ...mutation,
  };
};
