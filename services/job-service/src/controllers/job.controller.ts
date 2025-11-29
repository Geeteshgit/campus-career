import { Request, Response } from "express";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched all jobs",
      jobs,
    });
  } catch (err) {
    console.error("Error Fetching Jobs:", err);
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const getJobStats = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((job) => job.status === "Active").length;
    const inactiveJobs = jobs.filter((job) => job.status === "Inactive").length;
    const fullTime = jobs.filter((job) => job.type === "Full-Time").length;
    const internship = jobs.filter((job) => job.type === "Internship").length;

    return res.status(200).json({
      message: "Fetched job statistics",
      stats: { totalJobs, activeJobs, inactiveJobs, fullTime, internship },
    });
  } catch (err) {
    console.error("Error Fetching Job Stats:", err);
    return res.status(500).json({ message: "Failed to fetch job stats" });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    console.error("Error Creating Job:", err);
    return res.status(500).json({ message: "Failed to create job" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job updated",
      updatedJob,
    });
  } catch (err) {
    console.error("Error Updating Job:", err);
    return res.status(500).json({ message: "Failed to update job" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Job.findByIdAndDelete(id);
    await Application.deleteMany({ jobId: id });

    return res.status(200).json({
      message: "Job and related applications deleted successfully",
    });
  } catch (err) {
    console.error("Error Deleting Job:", err);
    return res.status(500).json({ message: "Failed to delete job" });
  }
};
