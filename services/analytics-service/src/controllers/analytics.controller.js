import { callService } from "../utils/serviceCaller.js";

export const getPlatformAnalytics = async (req, res) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
      return res.status(401).json({ message: "Unauthorized: Token missing" });

    const [userStats, studentStats, jobStats, applicationStats] =
      await Promise.all([
        callService(`${process.env.USER_SERVICE}/api/user/stats`, token),
        callService(`${process.env.USER_SERVICE}/api/student/stats`, token),
        callService(`${process.env.JOB_SERVICE}/api/jobs/stats`, token),
        callService(`${process.env.JOB_SERVICE}/api/applications/stats`, token),
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
    console.error("Analytics fetch error:", err);
    return res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
