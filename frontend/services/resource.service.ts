import { academicsApi } from "@/lib/axios";

export const getResources = async () => {
  const { data } = await academicsApi.get("/api/resources/admin");
  return data;
};

export const getStudentResources = async (studentProgram: string) => {
  const { data } = await academicsApi.get(`/api/resources/student?program=${studentProgram}`);
  return data;
};

export const createResource = async (payload: {
  title: string;
  url: string;
  program: string;
}) => {
  const { data } = await academicsApi.post("/api/resources", payload);
  return data;
};

export const updateResource = async (id: string, payload: any) => {
  const { data } = await academicsApi.put(`/api/resources/${id}`, payload);
  return data;
};

export const deleteResource = async (id: string) => {
  const { data } = await academicsApi.delete(`/api/resources/${id}`);
  return data;
};
