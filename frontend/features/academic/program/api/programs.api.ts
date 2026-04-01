import { academicsApi } from "@/lib/axios";
import type { CreateProgramPayload } from "../types/program.types";

export const getPrograms = async () => {
  const { data } = await academicsApi.get("/academics/programs");
  return data;
};

export const createProgram = async (payload: CreateProgramPayload) => {
  const { data } = await academicsApi.post("/academics/programs", payload);
  return data;
};

export const deleteProgram = async (id: string) => {
  const { data } = await academicsApi.delete(`/academics/programs/${id}`);
  return data;
};
