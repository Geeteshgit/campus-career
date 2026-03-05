import { academicsApi } from "@/lib/axios";

export const getPrograms = async () => {
  const { data } = await academicsApi.get("/api/programs");
  return data;
};

export const createProgram = async (payload: { name: string }) => {
  const { data } = await academicsApi.post("/api/programs", payload);
  return data;
};

export const deleteProgram = async (id: string) => {
  const { data } = await academicsApi.delete(`/api/programs/${id}`);
  return data;
};
