import { CreateProgramPayload, Program } from "../types/program.types";
import toast from "react-hot-toast";
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
      toast.success("Program created successfully");
    } catch (err) {
      console.error("Failed to add program:", err);
      toast.error("Failed to create program");
    }
  };

  const handleDeleteProgram = async (program: Program) => {
    try {
      await deleteProgram(program._id);
      toast.success("Program deleted successfully");
    } catch (err) {
      console.error("Failed to delete program:", err);
      toast.error("Failed to delete program");
    }
  };

  return {
    handleCreateProgram,
    handleDeleteProgram,

    createPending,
    deletePending,
  };
};
