import { useState } from "react";
import type { Job } from "../types/job.types";
import type { JobFormData, JobPayload } from "../schemas/job.schema";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "./mutations";

export const useJobManagement = () => {
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [addJobModalOpen, setAddJobModalOpen] = useState<boolean>(false);
  const [editJobModalOpen, setEditJobModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { createJob, isPending: createPending } = useCreateJobMutation();
  const { updateJob, isPending: updatePending } = useUpdateJobMutation();
  const { deleteJob, isPending: deletePending } = useDeleteJobMutation();

  const parseRequirements = (requirements: string): string[] =>
    requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

  const handleCreateJob = async (formData: JobFormData) => {
    try {
      const jobData: JobPayload = {
        ...formData,
        requirements: parseRequirements(formData.requirements),
      };

      await createJob(jobData);
      setAddJobModalOpen(false);
    } catch (err) {
      console.error("Job create error:", err);
    }
  };

  const handleUpdateJob = async (updatedData: JobFormData) => {
    if (!selectedJob) return;

    try {
      const finalData: JobPayload = {
        ...updatedData,
        requirements: parseRequirements(updatedData.requirements),
      };

      await updateJob({ id: selectedJob._id, payload: finalData });

      setEditJobModalOpen(false);
      setJobModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Job update error:", err);
    }
  };

  const handleDeleteJob = async (job: Job) => {
    try {
      await deleteJob(job._id);
      setJobModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Job delete error:", err);
    }
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setEditJobModalOpen(true);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  return {
    handleCreateJob,
    handleUpdateJob,
    handleDeleteJob,
    handleEditJob,
    handleJobClick,

    createPending,
    updatePending,
    deletePending,

    jobModalOpen,
    addJobModalOpen,
    editJobModalOpen,
    setJobModalOpen,
    setAddJobModalOpen,
    setEditJobModalOpen,

    selectedJob,
  };
};
