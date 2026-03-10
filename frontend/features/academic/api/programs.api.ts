import { academicsApi } from "@/lib/axios";

export const getPrograms = async () => {
  const { data } = await academicsApi.get("/programs");
  return data;
};

export const createProgram = async (payload: { name: string }) => {
  const { data } = await academicsApi.post("/programs", payload);
  return data;
};

export const deleteProgram = async (id: string) => {
  const { data } = await academicsApi.delete(`/programs/${id}`);
  return data;
};
