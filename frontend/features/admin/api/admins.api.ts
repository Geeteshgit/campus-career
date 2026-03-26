import { usersApi } from "@/lib/axios";
import { CreateAdminPayload, UpdateAdminPayload } from "../types/admin.types";

export const getAllAdmins = async () => {
  const { data } = await usersApi.get("/admins");
  return data;
};

export const getAdminById = async (id: string) => {
  const { data } = await usersApi.get(`/admins/${id}`);
  return data;
};

export const createAdmin = async (payload: CreateAdminPayload) => {
  const { data } = await usersApi.post("/admins", payload);
  return data;
};

export const updateAdminById = async (id: string, payload: UpdateAdminPayload) => {
  const { data } = await usersApi.put(`/admins/${id}`, payload);
  return data;
};

export const deleteAdminById = async (id: string) => {
  const { data } = await usersApi.delete(`/admins/${id}`);
  return data;
};
