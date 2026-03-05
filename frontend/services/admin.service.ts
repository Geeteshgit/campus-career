import { usersApi } from "@/lib/axios";

export const getAllAdmins = async () => {
  const { data } = await usersApi.get("/api/admins");
  return data;
};

export const getAdminById = async (id: string) => {
  const { data } = await usersApi.get(`/api/admins/${id}`);
  return data;
};

export const createAdmin = async (payload: {
  name: string;
  email: string;
  phone: string;
}) => {
  const { data } = await usersApi.post("/api/admins", payload);
  return data;
};

export const updateAdminById = async (id: string, payload: any) => {
  const { data } = await usersApi.put(`/api/admins/${id}`, payload);
  return data;
};

export const deleteAdminById = async (id: string) => {
  const { data } = await usersApi.delete(`/api/admins/${id}`);
  return data;
};
