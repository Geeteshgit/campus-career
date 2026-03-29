import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  verifyResetOtp,
} from "../api/auth.api";

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
