"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  resetPassword,
  verifyResetOtp,
} from "./auth.api";

const STALE_TIME = 1000 * 60 * 1; // 1 minute

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: STALE_TIME,
  });
};

export const useLoginMutation = () => {
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

export const useLogoutMutation = () => {
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

export const useForgotPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  return {
    forgotPassword: mutation.mutateAsync,
    ...mutation,
  };
};

export const useVerifyResetOtpMutation = () => {
  const mutation = useMutation({
    mutationFn: verifyResetOtp,
  });

  return {
    verifyOtp: mutation.mutateAsync,
    ...mutation,
  };
};

export const useResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
  });

  return {
    resetPassword: mutation.mutateAsync,
    ...mutation,
  };
};

export const useChangePasswordMutation = () => {
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
