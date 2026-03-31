import { CreateProgramPayload, Program } from "../types/program.types";
import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
} from "./mutations";

export const useProgramManagement = () => {
  const { createProgram, isPending: createPending } =
    useCreateProgramMutation();
  const { deleteProgram, isPending: deletePending } =
    useDeleteProgramMutation();

  const handleCreateProgram = async (payload: CreateProgramPayload) => {
    try {
      await createProgram(payload);
    } catch (err) {
      console.error("Failed to add program:", err);
      alert("Could not add program");
    }
  };

  const handleDeleteProgram = async (program: Program) => {
    try {
      await deleteProgram(program._id);
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
  };
};
