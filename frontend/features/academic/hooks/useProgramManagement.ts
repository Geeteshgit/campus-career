"use client";

import { useState } from "react";
import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
} from "../api/programs.queries";
import { CreateProgramPayload } from "../types/program.types";

export const useProgramManagement = () => {
  const [newProgram, setNewProgram] = useState<string>("");

  const { createProgram, isPending: createPending } =
    useCreateProgramMutation();
  const { deleteProgram, isPending: deletePending } =
    useDeleteProgramMutation();

  const handleCreateProgram = async (payload: CreateProgramPayload) => {
    if (!newProgram.trim()) return;

    try {
      await createProgram(payload);
      setNewProgram("");
    } catch (err) {
      console.error("Failed to add program:", err);
      alert("Could not add program");
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    try {
      await deleteProgram(programId);
    } catch (err) {
      console.error("Failed to delete program:", err);
      alert("Could not delete program");
    }
  };

  return {
    handleCreateProgram,
    handleDeleteProgram,

    createPending,
    deletePending,
    
    newProgram,
    setNewProgram,
  };
};
