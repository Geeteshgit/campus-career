import { Application } from "../models/application.model.js";

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, phone, enrollmentNumber, program, year, cgpa } = req.body;

    const email = req.user.email;

    const existing = await Application.findOne({
      jobId,
      studentId: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      studentId: req.user.id,
      name,
      email,
      phone,
      enrollmentNumber,
      program,
      year,
      cgpa
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("Error applying to job:", err);
    return res.status(500).json({ message: "Failed to apply" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id })
      .populate("jobId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched applications",
      applications,
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    return res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Application.find({ jobId });

    return res.status(200).json({
      message: "Fetched applicants",
      applicants,
    });
  } catch (err) {
    console.error("Error fetching applicants:", err);
    return res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();

    return res.status(200).json({
      message: "Fetched application stats",
      stats: { totalApplications },
    });
  } catch (err) {
    console.error("Error Fetching Application Stats:", err);
    return res.status(500).json({ message: "Failed to fetch application stats" });
  }
};