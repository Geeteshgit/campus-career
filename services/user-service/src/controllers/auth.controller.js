import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateOTP } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = generateToken(user);

    return res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.error("Error Logging In User: ", err);
    return res.status(500).json({ message: "Failed to login" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email doesn't exist" });

    const otp = generateOTP();
    const hashedOTP = await hashPassword(otp);

    user.resetPasswordOtp = hashedOTP;
    user.resetPasswordOtpExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordOtpVerified = false;

    await user.save();
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error Forgetting Password: ", err);
    return res.status(500).json({ message: "Failed to forget password" });
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      !user.resetPasswordOtp ||
      !user.resetPasswordOtpExpires ||
      user.resetPasswordOtpExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const isValid = await comparePassword(otp, user.resetPasswordOtp);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    user.resetPasswordOtpVerified = true;
    await user.save();

    return res.json({
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.resetPasswordOtpVerified) {
      return res.status(400).json({
        message: "OTP verification required",
      });
    }

    if(newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = newPassword;

    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    user.resetPasswordOtpVerified = false;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfull",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      message: "Failed to reset password",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error Updating User Profile: ", err);
    res.status(400).json({ message: "Failed to change password" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error Fetching Current User: ", err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
