import { callService } from "../utils/serviceCaller.js";
import { env } from "../config/env.js";

export const getPlatformAnalytics = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token)
      return res.status(401).json({ message: "Unauthorized: Token missing" });

    const [userStats, studentStats, jobStats, applicationStats] =
      await Promise.all([
        callService(`${env.USER_SERVICE}/api/users/stats`, token),
        callService(`${env.USER_SERVICE}/api/students/stats`, token),
        callService(`${env.JOB_SERVICE}/api/jobs/stats`, token),
        callService(`${env.JOB_SERVICE}/api/applications/stats`, token),
      ]);

    return res.status(200).json({
      message: "Platform analytics fetched",
      analytics: {
        users: userStats,
        students: studentStats,
        jobs: jobStats,
        applications: applicationStats,
      },
    });
  } catch (err) {
    console.error("Analytics fetch error:", err?.message || err);
    return res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
