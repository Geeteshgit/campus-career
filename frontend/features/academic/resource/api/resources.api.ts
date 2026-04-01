import { academicsApi } from "@/lib/axios";
import type { ResourceFormData } from "../schemas/resource.schema";

export const getResources = async () => {
  const { data } = await academicsApi.get("/resources/admin");
  return data;
};

export const getStudentResources = async (studentProgram: string) => {
  const { data } = await academicsApi.get(
    `/resources/student?program=${studentProgram}`,
  );
  return data;
};

export const createResource = async (payload: ResourceFormData) => {
  const { data } = await academicsApi.post("/resources", payload);
  return data;
};

export const updateResource = async (id: string, payload: ResourceFormData) => {
  const { data } = await academicsApi.put(`/resources/${id}`, payload);
  return data;
};

export const deleteResource = async (id: string) => {
  const { data } = await academicsApi.delete(`/resources/${id}`);
  return data;
};
