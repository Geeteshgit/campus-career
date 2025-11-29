import { Response } from "express";
import { callService } from "../utils/serviceCaller.js";

export const getPlatformAnalytics = async (req: any, res: Response) => {
  try {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

    const [
      userStats,
      studentStats,
      jobStats,
      applicationStats,
      programStats,
    ] = await Promise.all([
      callService(`${process.env.USER_SERVICE_URL}/api/user/stats`, token),
      callService(`${process.env.USER_SERVICE_URL}/api/student/stats`, token),
      callService(`${process.env.JOB_SERVICE_URL}/api/jobs/stats`, token),
      callService(`${process.env.JOB_SERVICE_URL}/api/applications/stats`, token),
      callService(`${process.env.ACADEMIC_CONFIG_URL}/api/academics/programs/stats`, token),
    ]);

    return res.status(200).json({
      message: "Platform analytics fetched",
      analytics: {
        users: userStats,
        students: studentStats,
        jobs: jobStats,
        applications: applicationStats,
        programs: programStats,
      }
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    return res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
