"use client";

import { useState } from "react";
import {
  Job,
  CreateJobPayload,
  JobFormData,
  UpdateJobPayload,
} from "../types/job.types";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "../api/jobs.queries";

export const useJobManagement = () => {
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [addJobModalOpen, setAddJobModalOpen] = useState<boolean>(false);
  const [editJobModalOpen, setEditJobModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { createJob, isPending: createPending } = useCreateJobMutation();
  const { updateJob, isPending: updatePending } = useUpdateJobMutation();
  const { deleteJob, isPending: deletePending } = useDeleteJobMutation();

  const handleCreateJob = async (formData: JobFormData) => {
    try {
      const jobData: CreateJobPayload = {
        ...formData,
        requirements: formData.requirements
          ? formData.requirements.split("\n")
          : [],
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
      const finalData: UpdateJobPayload = {
        ...updatedData,
        requirements: updatedData.requirements?.split("\n") || [],
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
