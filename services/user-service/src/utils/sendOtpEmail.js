import axios from "axios";
import dotenv from "dotenv";
import { env } from "../config/env.js";

dotenv.config();

export const sendOtpEmail = async (toEmail, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "geetesh472@gmail.com",
          name: "CampusCareer",
        },
        subject: "Password Reset OTP for CampusCareer",
        to: [
          {
            email: toEmail,
          },
        ],
        htmlContent: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CampusCareer Password Reset</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f9fafb; padding: 24px 0"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              max-width: 480px;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            "
          >
            <tr>
              <td
                style="
                  background-color: #3b82f6;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
                "
              >
                <h1 style="margin: 0; font-size: 22px;">
                  CampusCareer
                </h1>
                <p style="margin: 4px 0 0; font-size: 14px;">
                  AI-Powered Placement & Career Assistance
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 24px; color: #111827;">
                <p style="font-size: 14px; margin: 0 0 12px;">
                  Hello,
                </p>

                <p style="font-size: 14px; margin: 0 0 16px;">
                  We received a request to reset your password for your
                  <strong>CampusCareer</strong> account.
                </p>

                <p style="font-size: 14px; margin: 0 0 16px;">
                  Use the following One-Time Password (OTP) to proceed:
                </p>

                <!-- OTP Box -->
                <div
                  style="
                    background-color: #eff6ff;
                    border: 1px dashed #3b82f6;
                    padding: 16px;
                    text-align: center;
                    margin: 16px 0;
                    border-radius: 6px;
                  "
                >
                  <span
                    style="
                      font-size: 28px;
                      font-weight: bold;
                      letter-spacing: 6px;
                      color: #1d4ed8;
                    "
                  >
                    ${otp}
                  </span>
                </div>

                <p style="font-size: 13px; margin: 0 0 12px; color: #374151;">
                  This OTP is valid for <strong>10 minutes</strong>. Please do
                  not share it with anyone.
                </p>

                <p style="font-size: 13px; margin: 0 0 16px; color: #374151;">
                  If you did not request a password reset, you can safely ignore
                  this email.
                </p>

                <p style="font-size: 13px; margin: 24px 0 0;">
                  Regards,<br />
                  <strong>CampusCareer Team</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

        `,
      },
      {
        headers: {
          "api-key": env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("MessageId: ", response.data);
  } catch (err) {
    console.error("Failed to send email", err);
  }
};
