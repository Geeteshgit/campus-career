import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetOtpMutation,
} from "./mutations";

export const usePasswordReset = () => {
  const { forgotPassword, isPending: sendOtpPending } =
    useForgotPasswordMutation();
  const { verifyOtp, isPending: verifyOtpPending } =
    useVerifyResetOtpMutation();
  const { resetPassword, isPending: resetPasswordPending } =
    useResetPasswordMutation();

  const handleSendOtp = async (email: string) => {
    return forgotPassword({ email });
  };

  const handleVerifyOtp = async (email: string, otp: string) => {
    return verifyOtp({ email, otp });
  };

  const handleResetPassword = async (
    email: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => {
    return resetPassword({
      email,
      newPassword,
      confirmNewPassword,
    });
  };

  return {
    handleSendOtp,
    handleVerifyOtp,
    handleResetPassword,
    sendOtpPending,
    verifyOtpPending,
    resetPasswordPending,
  };
};
